# House 3D Pipeline

## Ziel
- Das Frontend ist bereits auf ein spaeteres `glb`-Modell vorbereitet.
- V1 nutzt ein reales Hausfoto als Stage und echte Innenraumfotos fuer die Hotspots.
- Der naechste Schritt ist ein sauberes Asset-Paket fuer ein stilisiertes oder rekonstruiertes 3D-Modell.

## Was gesammelt werden sollte
- Gerade Aussenansichten von vorne, schraeg links und schraeg rechts.
- Wenn moeglich eine hoehere Perspektive, damit Dachform und Rueckspruenge besser lesbar sind.
- Detailfotos von Eingang, Loggia, Fenstern und markanten Fassadenelementen.
- Innenraumfotos pro Bereich aus mindestens zwei Blickwinkeln.
- Grobe Grundriss-Skizzen oder Stockwerksplaene, falls vorhanden.

## Bildqualitaet
- Mindestens 3000 px Kantenlaenge pro Referenzbild.
- Moeglichst gleichmaessiges Tageslicht und wenig Weitwinkelverzerrung.
- Keine starken Filter oder HDR-Nachbearbeitung.
- Einzelne Detailfotos sind wertvoller als viele unscharfe Uebersichten.

## Empfohlener Workflow
1. Referenzbilder sammeln und nach Bereich benennen.
2. In einem externen KI- oder Photogrammetrie-Workflow eine erste Rekonstruktion erzeugen.
3. Das Ergebnis in Blender bereinigen.
4. Mesh vereinfachen, Materialien ordnen und Texturen sauber exportieren.
5. Finale Ausgabe als `glb` plus Posterbild und optionale Raum-Stills bereitstellen.
6. Das `sceneAsset` im Frontend von `image` auf `glb` umstellen.

## Benennung und Ablage
- Modell: `public/models/teutonia-house.glb`
- Posterbild: `public/images/house/poster.jpg`
- Raumbilder: `public/images/house/<raumname>.jpg`

## Frontend-Anschluss
- Das Stage-Asset ist in `src/content/public-site.ts` hinterlegt.
- Der Explorer erwartet getrennte Daten fuer `sceneAsset`, `houseRooms` und `houseHotspots`.
- Ein neues 3D-Modell ersetzt nur das Szenen-Asset; Texte und Hotspots bleiben davon unabhaengig.
