"""
Build a static Editorial-style map of Parkstraße 1, Karlsruhe from OSM tiles.
Run once: `python3 scripts/build-map.py` — output lands in public/lage/.
"""

import math
import os
import time
import urllib.request
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps

CENTER_LAT = 49.0145  # Parkstraße 1 (geocoded via Nominatim)
CENTER_LON = 8.4227
ZOOM = 16
TILE_SIZE = 256
GRID_RADIUS = 3  # 7x7 grid → 1792x1792 px (~1.7 km radius at this latitude)

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "lage"
TMP_DIR = Path("/tmp/teutonia-tiles")
TMP_DIR.mkdir(exist_ok=True)
OUT_DIR.mkdir(parents=True, exist_ok=True)

UA = "KBTeutonia-StaticMap/1.0 (kontakt: admin@kbteutonia.de)"


def deg2num(lat_deg: float, lon_deg: float, zoom: int) -> tuple[float, float]:
    lat_rad = math.radians(lat_deg)
    n = 2 ** zoom
    xtile = (lon_deg + 180.0) / 360.0 * n
    ytile = (1.0 - math.asinh(math.tan(lat_rad)) / math.pi) / 2.0 * n
    return xtile, ytile


def num2deg(xtile: float, ytile: float, zoom: int) -> tuple[float, float]:
    n = 2 ** zoom
    lon_deg = xtile / n * 360.0 - 180.0
    lat_rad = math.atan(math.sinh(math.pi * (1 - 2 * ytile / n)))
    lat_deg = math.degrees(lat_rad)
    return lat_deg, lon_deg


def fetch_tile(zoom: int, x: int, y: int) -> Path:
    tmp = TMP_DIR / f"tile_{zoom}_{x}_{y}.png"
    if tmp.exists() and tmp.stat().st_size > 1000:
        return tmp
    subdomains = ["a", "b", "c"]
    last_err: Exception | None = None
    for sd in subdomains:
        url = f"https://{sd}.tile.openstreetmap.org/{zoom}/{x}/{y}.png"
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = resp.read()
            tmp.write_bytes(data)
            return tmp
        except Exception as e:  # noqa: BLE001
            last_err = e
            time.sleep(0.5)
    raise RuntimeError(f"Failed to fetch tile {zoom}/{x}/{y}: {last_err}")


def duotone(img: Image.Image, light: tuple[int, int, int], dark: tuple[int, int, int]) -> Image.Image:
    """Map grayscale of img onto a duotone gradient from dark→light."""
    gray = ImageOps.grayscale(img)
    palette: list[int] = []
    for i in range(256):
        t = i / 255.0
        r = round(dark[0] + (light[0] - dark[0]) * t)
        g = round(dark[1] + (light[1] - dark[1]) * t)
        b = round(dark[2] + (light[2] - dark[2]) * t)
        palette.extend([r, g, b])
    palette_img = Image.new("P", (1, 1))
    palette_img.putpalette(palette)
    result = gray.convert("L").quantize(palette=palette_img)
    return result.convert("RGB")


def main() -> None:
    cx, cy = deg2num(CENTER_LAT, CENTER_LON, ZOOM)
    cx_int = int(cx)
    cy_int = int(cy)
    print(f"Center tile @ z{ZOOM}: ({cx_int}, {cy_int})")
    print(f"Center subpixel offset: ({cx - cx_int:.3f}, {cy - cy_int:.3f})")

    span = 2 * GRID_RADIUS + 1
    width = span * TILE_SIZE
    height = span * TILE_SIZE
    stitched = Image.new("RGB", (width, height), "#ffffff")

    for dx in range(-GRID_RADIUS, GRID_RADIUS + 1):
        for dy in range(-GRID_RADIUS, GRID_RADIUS + 1):
            x = cx_int + dx
            y = cy_int + dy
            tile_path = fetch_tile(ZOOM, x, y)
            tile = Image.open(tile_path).convert("RGB")
            px = (dx + GRID_RADIUS) * TILE_SIZE
            py = (dy + GRID_RADIUS) * TILE_SIZE
            stitched.paste(tile, (px, py))
            time.sleep(0.05)
    print(f"Stitched {width}x{height} composite.")

    # Calculate center pixel in stitched image for later reference
    center_px = (cx - cx_int + GRID_RADIUS) * TILE_SIZE
    center_py = (cy - cy_int + GRID_RADIUS) * TILE_SIZE
    print(f"Center (Parkstraße 1) pixel: ({center_px:.0f}, {center_py:.0f})")
    print(
        f"Center % of image: "
        f"({center_px / width * 100:.2f}%, {center_py / height * 100:.2f}%)"
    )

    # Compute corner lat/lon for reference
    nw_lat, nw_lon = num2deg(cx_int - GRID_RADIUS, cy_int - GRID_RADIUS, ZOOM)
    se_lat, se_lon = num2deg(cx_int + GRID_RADIUS + 1, cy_int + GRID_RADIUS + 1, ZOOM)
    print(f"Bounds: NW=({nw_lat:.5f}, {nw_lon:.5f}) SE=({se_lat:.5f}, {se_lon:.5f})")

    # --- Editorial filter pipeline ---
    # 1. Slight blur to soften jaggy tile labels (keep features readable)
    # 2. Desaturate strongly
    # 3. Duotone: lights → warm-papier #F1ECE3, darks → warm-anthrazit #4A4338
    # 4. Slight contrast bump
    desat = ImageEnhance.Color(stitched).enhance(0.0)  # full desaturation
    # Use duotone with our editorial palette
    LIGHT = (244, 239, 228)  # warm papier (foreground bg)
    DARK = (74, 67, 56)  # warm anthrazit (foreground text-ish)
    duo = duotone(desat, LIGHT, DARK)

    # Subtle contrast and warmth lift
    duo = ImageEnhance.Contrast(duo).enhance(0.90)
    duo = ImageEnhance.Brightness(duo).enhance(1.03)

    # Save outputs
    out_webp = OUT_DIR / "karlsruhe-light.webp"
    duo.save(out_webp, quality=85, method=6)
    print(f"Saved: {out_webp} ({out_webp.stat().st_size // 1024} KB)")

    # Attribution metadata for the consuming component
    meta = {
        "center_lat": CENTER_LAT,
        "center_lon": CENTER_LON,
        "zoom": ZOOM,
        "width": width,
        "height": height,
        "center_pixel": [round(center_px, 1), round(center_py, 1)],
        "center_percent": [
            round(center_px / width * 100, 2),
            round(center_py / height * 100, 2),
        ],
        "bounds": {
            "nw_lat": nw_lat,
            "nw_lon": nw_lon,
            "se_lat": se_lat,
            "se_lon": se_lon,
        },
        "attribution": "© OpenStreetMap contributors",
    }
    import json

    (OUT_DIR / "karlsruhe-light.json").write_text(json.dumps(meta, indent=2))
    print(f"Saved metadata: {OUT_DIR / 'karlsruhe-light.json'}")


if __name__ == "__main__":
    main()
