"""
Build a clean, Editorial SVG map of Parkstraße 1 from OSM vector data.

Pulls main roads + parks + forest polygons via Overpass API and renders
them as flat SVG paths in our warm-papier palette. No buildings — those
are exactly the noise we want to remove from raster tiles.

Run: python3 scripts/build-map-svg.py
Output: public/lage/karlsruhe-light.svg (+ .json metadata)
"""

from __future__ import annotations

import json
import math
import urllib.parse
import urllib.request
from pathlib import Path

# Center: Parkstraße 1 area (offset west so house lands right of center)
CENTER_LAT = 49.0130
CENTER_LON = 8.4172

# Frame size matching the previous raster output
ZOOM = 16
TILE_SIZE = 256
GRID_RADIUS = 2  # 5x5 tiles → ~1.25 km wide
IMG_W = (2 * GRID_RADIUS + 1) * TILE_SIZE  # 1280
IMG_H = IMG_W

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "lage"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Color palette — matches Editorial Light theme
BG_FILL = "#F2EAD6"  # warm papier
PARK_FILL = "#E0D8BD"  # subtle warm green-beige
WOOD_FILL = "#D6CCAE"  # slightly deeper forest tint
WATER_FILL = "#DCD6BD"
ROAD_MAJOR = "#5C4C38"  # warm anthrazit
ROAD_MINOR = "#9E8D6A"  # quieter taupe
ROAD_RES = "#C2B695"  # very subtle residential
TRAM_LINE = "#8C6A3D"  # bronze for tram


def deg2num(lat_deg: float, lon_deg: float, zoom: int) -> tuple[float, float]:
    lat_rad = math.radians(lat_deg)
    n = 2 ** zoom
    x = (lon_deg + 180.0) / 360.0 * n
    y = (1.0 - math.asinh(math.tan(lat_rad)) / math.pi) / 2.0 * n
    return x, y


def num2deg(x: float, y: float, zoom: int) -> tuple[float, float]:
    n = 2 ** zoom
    lon = x / n * 360.0 - 180.0
    lat = math.degrees(math.atan(math.sinh(math.pi * (1 - 2 * y / n))))
    return lat, lon


# Compute bbox from the tile-grid center
cx, cy = deg2num(CENTER_LAT, CENTER_LON, ZOOM)
cx_int = int(cx)
cy_int = int(cy)
nw_lat, nw_lon = num2deg(cx_int - GRID_RADIUS, cy_int - GRID_RADIUS, ZOOM)
se_lat, se_lon = num2deg(
    cx_int + GRID_RADIUS + 1, cy_int + GRID_RADIUS + 1, ZOOM
)

BBOX = (se_lat, nw_lon, nw_lat, se_lon)  # south, west, north, east


def project(lat: float, lon: float) -> tuple[float, float]:
    """Project WGS84 to pixel space inside our IMG_W × IMG_H frame.

    Same Web-Mercator projection used for tile coordinates, but scaled to
    the image, so SVG matches raster perfectly.
    """
    x_tile, y_tile = deg2num(lat, lon, ZOOM)
    px = (x_tile - (cx_int - GRID_RADIUS)) * TILE_SIZE
    py = (y_tile - (cy_int - GRID_RADIUS)) * TILE_SIZE
    return px, py


OVERPASS_URL = "https://overpass-api.de/api/interpreter"

QUERY = f"""
[out:json][timeout:60];
(
  way["highway"~"^(motorway|trunk|primary|secondary|tertiary|unclassified|residential|living_street)$"]
    ({BBOX[0]},{BBOX[1]},{BBOX[2]},{BBOX[3]});
  way["railway"="tram"]
    ({BBOX[0]},{BBOX[1]},{BBOX[2]},{BBOX[3]});
  way["leisure"~"^(park|garden)$"]
    ({BBOX[0]},{BBOX[1]},{BBOX[2]},{BBOX[3]});
  way["natural"~"^(wood|water)$"]
    ({BBOX[0]},{BBOX[1]},{BBOX[2]},{BBOX[3]});
  way["landuse"~"^(forest|recreation_ground|cemetery)$"]
    ({BBOX[0]},{BBOX[1]},{BBOX[2]},{BBOX[3]});
  relation["leisure"~"^(park|garden)$"]
    ({BBOX[0]},{BBOX[1]},{BBOX[2]},{BBOX[3]});
  relation["natural"~"^(wood|water)$"]
    ({BBOX[0]},{BBOX[1]},{BBOX[2]},{BBOX[3]});
);
out geom;
"""


def fetch_overpass() -> dict:
    body = urllib.parse.urlencode({"data": QUERY}).encode()
    req = urllib.request.Request(
        OVERPASS_URL,
        data=body,
        headers={"User-Agent": "KBTeutonia-MapBuilder/1.0"},
    )
    print("Fetching Overpass…")
    with urllib.request.urlopen(req, timeout=90) as r:
        return json.loads(r.read())


HIGHWAY_WIDTH = {
    "motorway": 5.5,
    "trunk": 5.0,
    "primary": 4.0,
    "secondary": 3.0,
    "tertiary": 2.2,
    "unclassified": 1.5,
    "residential": 1.5,
    "living_street": 1.2,
    "service": 0.9,
    "pedestrian": 1.4,
}

HIGHWAY_COLOR = {
    "motorway": ROAD_MAJOR,
    "trunk": ROAD_MAJOR,
    "primary": ROAD_MAJOR,
    "secondary": ROAD_MAJOR,
    "tertiary": ROAD_MINOR,
    "unclassified": ROAD_MINOR,
    "residential": ROAD_RES,
    "living_street": ROAD_RES,
    "service": ROAD_RES,
    "pedestrian": ROAD_MINOR,
}


def way_path(way: dict) -> str:
    pts = [project(g["lat"], g["lon"]) for g in way.get("geometry", [])]
    if len(pts) < 2:
        return ""
    d = f"M{int(round(pts[0][0]))} {int(round(pts[0][1]))}"
    for x, y in pts[1:]:
        d += f" L{int(round(x))} {int(round(y))}"
    return d


def is_closed(way: dict) -> bool:
    geom = way.get("geometry", [])
    if len(geom) < 3:
        return False
    return (
        abs(geom[0]["lat"] - geom[-1]["lat"]) < 1e-9
        and abs(geom[0]["lon"] - geom[-1]["lon"]) < 1e-9
    )


def relation_paths(rel: dict) -> list[str]:
    """Each `member` with role 'outer' becomes a separate path."""
    out: list[str] = []
    for m in rel.get("members", []):
        if m.get("type") != "way" or m.get("role") not in ("outer", ""):
            continue
        geom = m.get("geometry") or []
        if len(geom) < 2:
            continue
        pts = [project(g["lat"], g["lon"]) for g in geom]
        d = f"M{int(round(pts[0][0]))} {int(round(pts[0][1]))}"
        for x, y in pts[1:]:
            d += f" L{int(round(x))} {int(round(y))}"
        d += "Z"
        out.append(d)
    return out


def build_svg(data: dict) -> str:
    parks: list[str] = []
    woods: list[str] = []
    grass: list[str] = []
    water: list[str] = []
    roads_by_layer: dict[str, list[tuple[str, float, str]]] = {
        "casing": [],
        "fill": [],
    }
    tram_paths: list[str] = []

    for el in data.get("elements", []):
        if el["type"] == "way":
            tags = el.get("tags", {})
            d = way_path(el)
            if not d:
                continue
            if "highway" in tags:
                hw = tags["highway"]
                if hw not in HIGHWAY_WIDTH:
                    continue
                w = HIGHWAY_WIDTH[hw]
                color = HIGHWAY_COLOR.get(hw, ROAD_MINOR)
                roads_by_layer["casing"].append((d, w + 1.4, BG_FILL))
                roads_by_layer["fill"].append((d, w, color))
            elif tags.get("railway") == "tram":
                tram_paths.append(d)
            elif tags.get("leisure") in ("park", "garden") and is_closed(el):
                parks.append(d + " Z")
            elif tags.get("natural") == "wood" and is_closed(el):
                woods.append(d + " Z")
            elif tags.get("natural") == "water" and is_closed(el):
                water.append(d + " Z")
            elif tags.get("landuse") == "forest" and is_closed(el):
                woods.append(d + " Z")
            elif tags.get("landuse") in (
                "grass",
                "recreation_ground",
                "cemetery",
            ) and is_closed(el):
                grass.append(d + " Z")
        elif el["type"] == "relation":
            tags = el.get("tags", {})
            for d in relation_paths(el):
                if tags.get("leisure") in ("park", "garden"):
                    parks.append(d)
                elif tags.get("natural") == "wood":
                    woods.append(d)
                elif tags.get("natural") == "water":
                    water.append(d)

    parts: list[str] = []
    parts.append(
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="0 0 {IMG_W} {IMG_H}" '
        f'preserveAspectRatio="xMidYMid slice">'
    )
    parts.append(f'<rect width="{IMG_W}" height="{IMG_H}" fill="{BG_FILL}"/>')

    # Areas — order matters (wood under grass under park)
    parts.append('<g id="woods">')
    for d in woods:
        parts.append(
            f'<path d="{d}" fill="{WOOD_FILL}" '
            'fill-rule="evenodd" stroke="none"/>'
        )
    parts.append("</g>")

    parts.append('<g id="grass">')
    for d in grass:
        parts.append(
            f'<path d="{d}" fill="{PARK_FILL}" '
            'fill-rule="evenodd" stroke="none"/>'
        )
    parts.append("</g>")

    parts.append('<g id="parks">')
    for d in parks:
        parts.append(
            f'<path d="{d}" fill="{PARK_FILL}" '
            'fill-rule="evenodd" stroke="none"/>'
        )
    parts.append("</g>")

    parts.append('<g id="water">')
    for d in water:
        parts.append(
            f'<path d="{d}" fill="{WATER_FILL}" '
            'fill-rule="evenodd" stroke="none"/>'
        )
    parts.append("</g>")

    # Roads — casing under fill so we get clean intersections
    parts.append(
        '<g id="roads-casing" fill="none" '
        'stroke-linecap="round" stroke-linejoin="round">'
    )
    for d, w, color in roads_by_layer["casing"]:
        parts.append(f'<path d="{d}" stroke="{color}" stroke-width="{w:.1f}"/>')
    parts.append("</g>")

    parts.append(
        '<g id="roads-fill" fill="none" '
        'stroke-linecap="round" stroke-linejoin="round">'
    )
    for d, w, color in roads_by_layer["fill"]:
        parts.append(f'<path d="{d}" stroke="{color}" stroke-width="{w:.1f}"/>')
    parts.append("</g>")

    # Tram lines on top, dashed
    if tram_paths:
        parts.append(
            f'<g id="tram" fill="none" stroke="{TRAM_LINE}" '
            'stroke-width="1.4" stroke-dasharray="4 3" '
            'stroke-linecap="round" opacity="0.85">'
        )
        for d in tram_paths:
            parts.append(f'<path d="{d}"/>')
        parts.append("</g>")

    parts.append("</svg>")
    return "\n".join(parts)


def main() -> None:
    data = fetch_overpass()
    print(f"Got {len(data.get('elements', []))} elements")
    svg = build_svg(data)

    out_svg = OUT_DIR / "karlsruhe-light.svg"
    out_svg.write_text(svg)
    print(f"Saved: {out_svg} ({out_svg.stat().st_size // 1024} KB)")

    meta = {
        "center_lat": CENTER_LAT,
        "center_lon": CENTER_LON,
        "zoom": ZOOM,
        "width": IMG_W,
        "height": IMG_H,
        "bounds": {
            "nw_lat": nw_lat,
            "nw_lon": nw_lon,
            "se_lat": se_lat,
            "se_lon": se_lon,
        },
        "attribution": "© OpenStreetMap contributors",
    }
    (OUT_DIR / "karlsruhe-light.json").write_text(json.dumps(meta, indent=2))


if __name__ == "__main__":
    main()
