'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Eyebrow, Section } from '@/components/primitives/section';

/**
 * Das Haus — interaktiver Etagen-Explorer.
 *
 * Linke Spalte (sticky): minimales Gebäude-Diagramm + Etagenliste.
 * Rechte Spalte: Foto + Inhalt der aktiven Etage, crossfaded.
 * Navigation: Klick · ↑/↓ Tasten (wenn die Sektion im Viewport ist).
 *
 * Port von design_reference/{haus-index.jsx, haus-floors.jsx, haus-index.css}.
 */

type Floor = {
  id: string;
  numeral: string;
  highlights?: string[];
  name: string;
  sub: string;
  eyebrow: string;
  title: string;
  desc: string;
  facts: string[];
  photo: string;
  photoCaption: string;
};

const HAUS_FLOORS: Floor[] = [
  {
    id: '04',
    numeral: '04',
    name: 'Dachgeschoss',
    sub: '4. Etage',
    eyebrow: 'Unter dem Mansarddach',
    title: 'Zwei Lernräume.',
    desc: 'Die Räume ganz oben — schräge Decken, Mansardenfenster, Hardtwald-Blick durch die Kiefern. 24/7 offen, eigene Schlüssel, leiser als der Rest des Hauses.',
    facts: ['2 Lernräume', '24 / 7 offen', 'Hardtwald-Blick'],
    photo: '/haus/haus-lernen.jpg',
    photoCaption: 'Lernraum im Dachgeschoss',
  },
  {
    id: 'wohn',
    numeral: '02·03',
    highlights: ['02', '03'],
    name: 'Wohngeschosse',
    sub: '2. & 3. Etage · Küche',
    eyebrow: 'Wohnen & Küche',
    title: 'Acht Wohnstuben, eine gemeinsame Küche.',
    desc: 'Zwei Etagen Wohnen — acht möblierte Stuben über zwei Stockwerke, jede mit eigenem Schreibtisch, Bücherregal und Bad. Auf einer der beiden Etagen liegt die Gemeinschaftsküche.',
    facts: ['8 Wohnstuben', 'gemeinsame Küche', 'eigenes Bad pro Stube'],
    photo: '/haus/haus-lernen.jpg',
    photoCaption: 'Wohnstube · 2./3. Etage',
  },
  {
    id: '01',
    numeral: '01',
    name: '1. Etage',
    sub: 'Kneipsaal · Tresen',
    eyebrow: 'Wo der Saal voll wird',
    title: 'Kneipsaal mit eigenem Tresen.',
    desc: 'Bühne, Esstisch, Tagungsraum, Tanzfläche. Stuckdecke von 1907, langer Tresen entlang der Wand, eigene Bar. Donnerstags Stammtisch, Stiftungsfeste seit 1843.',
    facts: ['Stuck 1907', 'eigener Tresen', 'Stammtisch Do.'],
    photo: '/haus/haus-leben.jpeg',
    photoCaption: 'Kneipsaal · 1. Etage',
  },
  {
    id: '00',
    numeral: '00',
    name: 'Erdgeschoss',
    sub: 'Essen · Kaffee · Chill',
    eyebrow: 'Gemeinsamer Ort',
    title: 'Essen, Kaffee, chillen.',
    desc: 'Vorne das Essenszimmer — 19 Uhr, sieben Tage. Eine Tür weiter die Kaffeeecke für zwischendurch. Hinten der Chillbereich, tagsüber unser Lernzimmer.',
    facts: ['Essen · 19 Uhr', 'Kaffee · ganztags', 'Chill + Lernen'],
    photo: '/haus/haus-leben.jpeg',
    photoCaption: 'Essenszimmer · Erdgeschoss',
  },
];

const STYLES = `
.hi-head { max-width: 760px; margin-bottom: clamp(48px, 6vw, 80px); }
.hi-h1 {
  margin: 24px 0 0; font-size: clamp(1.85rem, 4.2vw, 3rem); font-weight: 300;
  line-height: 1.05; letter-spacing: -0.025em; color: var(--foreground);
  text-wrap: balance; font-variation-settings: 'opsz' 96, 'SOFT' 50;
}
.hi-lead {
  margin: 20px 0 0; font-size: 15px; line-height: 1.62;
  color: var(--foreground-muted); max-width: 540px; text-wrap: pretty;
}
.hi-grid {
  display: grid; grid-template-columns: minmax(0, 320px) minmax(0, 1fr);
  gap: clamp(48px, 6vw, 96px); align-items: start;
}
.hi-side { position: sticky; top: 100px; }
.hi-side-inner { display: grid; grid-template-columns: 110px 1fr; gap: 28px; align-items: start; }
.hi-svg { width: 110px; height: 190px; display: block; }
.hi-shape {
  fill: var(--background-elev); stroke: var(--border-strong); stroke-width: 1.2;
  transition: fill 360ms cubic-bezier(0.4,0,0.2,1), stroke 360ms cubic-bezier(0.4,0,0.2,1);
}
.hi-floor, .hi-roof { cursor: pointer; }
.hi-floor.is-active .hi-shape, .hi-roof.is-active .hi-shape { fill: var(--couleur-burgund); stroke: var(--couleur-burgund); }
.hi-window {
  fill: var(--background); stroke: var(--border); stroke-width: 0.5;
  transition: fill 360ms cubic-bezier(0.4,0,0.2,1), stroke 360ms cubic-bezier(0.4,0,0.2,1);
}
.hi-floor.is-active .hi-window, .hi-roof.is-active .hi-window { fill: oklch(0.92 0.07 70 / 80%); stroke: var(--couleur-gold); }
.hi-door {
  fill: var(--background); stroke: var(--border); stroke-width: 0.6;
  transition: fill 360ms cubic-bezier(0.4,0,0.2,1), stroke 360ms cubic-bezier(0.4,0,0.2,1);
}
.hi-floor.is-active .hi-door { fill: oklch(0.42 0.16 22 / 70%); stroke: var(--couleur-gold); }
.hi-plinth { fill: var(--background-elev); stroke: var(--border-strong); stroke-width: 1; }
.hi-ground { stroke: var(--border-strong); stroke-width: 1; }
.hi-marker-line { stroke: var(--couleur-burgund); stroke-width: 1.5; transition: all 360ms cubic-bezier(0.4,0,0.2,1); }
.hi-marker-dot { fill: var(--couleur-burgund); transition: all 360ms cubic-bezier(0.4,0,0.2,1); }
.hi-floor-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
.hi-floor-btn {
  position: relative; display: flex; align-items: baseline; gap: 14px; width: 100%;
  padding: 13px 0; background: transparent; border: none; border-bottom: 1px solid var(--border);
  cursor: pointer; text-align: left; font-family: inherit;
  transition: padding-left 280ms cubic-bezier(0.4,0,0.2,1);
}
.hi-floor-btn:last-child { border-bottom: none; }
.hi-floor-btn:hover { padding-left: 6px; }
.hi-floor-btn.is-active { padding-left: 12px; }
.hi-floor-num {
  font-family: var(--font-display); font-size: 17px; font-weight: 300; color: var(--foreground-dim);
  font-variation-settings: 'opsz' 36, 'SOFT' 30; letter-spacing: -0.02em; min-width: 28px;
  transition: color 280ms cubic-bezier(0.4,0,0.2,1); font-variant-numeric: tabular-nums;
}
.hi-floor-num--wide { font-size: 13px; min-width: 48px; letter-spacing: -0.01em; }
.hi-floor-name {
  font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--foreground-muted); font-weight: 500; transition: color 280ms cubic-bezier(0.4,0,0.2,1);
}
.hi-floor-btn:hover .hi-floor-num, .hi-floor-btn:hover .hi-floor-name { color: var(--foreground); }
.hi-floor-btn.is-active .hi-floor-num { color: var(--couleur-burgund); }
.hi-floor-btn.is-active .hi-floor-name { color: var(--foreground); }
.hi-floor-tick {
  position: absolute; left: 0; top: 50%; width: 2px; height: 24px; background: var(--couleur-burgund);
  transform: translateY(-50%) scaleY(0); transform-origin: center;
  transition: transform 280ms cubic-bezier(0.4,0,0.2,1);
}
.hi-floor-btn.is-active .hi-floor-tick { transform: translateY(-50%) scaleY(1); }
.hi-detail { position: relative; min-height: 480px; }
.hi-fade { display: grid; grid-template-columns: 1fr; gap: clamp(28px, 3.5vw, 48px); animation: hiFade 500ms cubic-bezier(0.4,0,0.2,1); }
@keyframes hiFade { from { opacity: 0.4; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.hi-figure { margin: 0; position: relative; }
.hi-figure-frame {
  position: relative; width: 100%; aspect-ratio: 16 / 10; background: var(--background-elev);
  border-radius: 8px; overflow: hidden; border: 1px solid var(--border);
}
.hi-figure-frame img { width: 100%; height: 100%; object-fit: cover; }
.hi-figure figcaption {
  margin-top: 14px; font-family: var(--font-display); font-style: italic; font-weight: 300;
  font-size: 13px; color: var(--foreground-dim); font-variation-settings: 'opsz' 24, 'SOFT' 80; letter-spacing: 0.02em;
}
.hi-text { display: flex; flex-direction: column; gap: 24px; }
.hi-numeral-row { display: flex; align-items: baseline; gap: 20px; }
.hi-numeral {
  font-family: var(--font-display); font-size: clamp(56px, 7vw, 72px); font-weight: 200; color: var(--couleur-burgund);
  letter-spacing: -0.035em; line-height: 0.88; font-variation-settings: 'opsz' 144, 'SOFT' 30; font-variant-numeric: tabular-nums;
}
.hi-numeral--wide { font-size: clamp(38px, 4.6vw, 50px); letter-spacing: -0.025em; }
.hi-numeral-meta { display: flex; flex-direction: column; gap: 5px; padding-bottom: 6px; }
.hi-sub-eyebrow { font-size: 9.5px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--couleur-burgund); font-weight: 500; }
.hi-sub-name {
  font-size: clamp(17px, 1.8vw, 21px); font-weight: 300; letter-spacing: -0.01em; color: var(--foreground);
  font-variation-settings: 'opsz' 48, 'SOFT' 50;
}
.hi-title {
  font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 300; line-height: 1.12; letter-spacing: -0.018em;
  margin: 0; color: var(--foreground); font-variation-settings: 'opsz' 72, 'SOFT' 50; text-wrap: balance;
}
.hi-desc { font-size: 14.5px; line-height: 1.65; color: var(--foreground-muted); margin: 0; max-width: 580px; text-wrap: pretty; }
.hi-facts { margin: 8px 0 0; padding: 24px 0 0; border-top: 1px solid var(--border); display: flex; flex-direction: column; }
.hi-fact-row { display: grid; grid-template-columns: 44px 1fr; gap: 18px; padding: 13px 0; border-bottom: 1px dashed var(--border); align-items: baseline; }
.hi-fact-row:last-child { border-bottom: none; }
.hi-fact-row dt { font-size: 9.5px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--foreground-dim); font-weight: 500; font-variant-numeric: tabular-nums; margin: 0; }
.hi-fact-row dd { font-size: 12.5px; color: var(--foreground); margin: 0; letter-spacing: 0.01em; }
@media (max-width: 880px) {
  .hi-grid { grid-template-columns: 1fr; gap: 40px; }
  .hi-side { position: static; }
  .hi-side-inner { grid-template-columns: 90px 1fr; }
  .hi-svg { width: 90px; height: 156px; }
}
@media (prefers-reduced-motion: reduce) { .hi-fade { animation: none; } }
`;

// ── Building-Diagramm SVG ──────────────────────────────────────────
const W = 220;
const FH = 58;
const ROOF_BREAK_X = 50;
const ROOF_BREAK_Y = 28;
const ROOF_BASE_Y = 80;
const PLINTH_Y = 312;
const GROUND_Y = 330;

function ActiveMarker({ highlightIds }: { highlightIds: string[] }) {
  const yMap: Record<string, number> = {
    '04': (ROOF_BREAK_Y + ROOF_BASE_Y) / 2,
    '03': ROOF_BASE_Y + FH / 2,
    '02': ROOF_BASE_Y + FH * 1.5,
    '01': ROOF_BASE_Y + FH * 2.5,
    '00': ROOF_BASE_Y + FH * 3.5,
  };
  const ys = highlightIds.map((id) => yMap[id]).filter((y): y is number => typeof y === 'number');
  if (!ys.length) return null;

  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);
  const yMid = (yMin + yMax) / 2;
  const spread = yMax - yMin;
  const lineHalf = spread > 0 ? spread / 2 + 16 : 14;

  return (
    <g className="hi-marker">
      <line x1="6" y1={yMid - lineHalf} x2="6" y2={yMid + lineHalf} className="hi-marker-line" />
      {ys.map((y) => (
        <circle key={y} cx="6" cy={y} r="2.5" className="hi-marker-dot" />
      ))}
    </g>
  );
}

function HausDiagramm({
  activeFloor,
  onSelect,
}: {
  activeFloor: Floor;
  onSelect: (id: string) => void;
}) {
  const highlightIds = activeFloor.highlights || [activeFloor.id];
  const isOn = (id: string) => highlightIds.includes(id);

  return (
    <svg viewBox={`0 0 ${W} 380`} className="hi-svg" aria-label="Schnitt durchs Haus" role="img">
      <title>Gebäudeschnitt — aktive Etage hervorgehoben</title>
      {/* Mansarddach (4. Etage) */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: the floor-list buttons are the accessible control; clicking the diagram is a pointer-only convenience */}
      <g className={`hi-roof ${isOn('04') ? 'is-active' : ''}`} onClick={() => onSelect('04')}>
        <polygon
          points={`20,${ROOF_BASE_Y} ${ROOF_BREAK_X},${ROOF_BREAK_Y} ${W - ROOF_BREAK_X},${ROOF_BREAK_Y} ${W - 20},${ROOF_BASE_Y}`}
          className="hi-shape"
        />
        {[-1, 0, 1].map((i) => (
          <rect
            key={i}
            x={W / 2 + i * 36 - 6}
            y={(ROOF_BREAK_Y + ROOF_BASE_Y) / 2 - 5}
            width="12"
            height="14"
            className="hi-window"
          />
        ))}
      </g>

      {/* Etagen 03, 02, 01, 00 */}
      {[
        { id: '03', y: ROOF_BASE_Y },
        { id: '02', y: ROOF_BASE_Y + FH },
        { id: '01', y: ROOF_BASE_Y + 2 * FH },
        { id: '00', y: ROOF_BASE_Y + 3 * FH },
      ].map((r) => (
        // biome-ignore lint/a11y/noStaticElementInteractions: floor-list buttons are the accessible control; clicking the diagram is a pointer-only convenience
        <g
          key={r.id}
          className={`hi-floor ${isOn(r.id) ? 'is-active' : ''}`}
          onClick={() => onSelect(r.id)}
        >
          <rect x="20" y={r.y} width={W - 40} height={FH} className="hi-shape" />
          {[0, 1, 2, 3].map((i) => {
            const winW = 22;
            const cx = 20 + ((W - 40) * (i + 0.5)) / 4;
            if (r.id === '00' && (i === 1 || i === 2)) return null;
            return (
              <rect
                key={i}
                x={cx - winW / 2}
                y={r.y + FH * 0.25}
                width={winW}
                height={FH * 0.5}
                className="hi-window"
              />
            );
          })}
          {r.id === '00' && (
            <rect
              x={W / 2 - 10}
              y={r.y + FH * 0.25}
              width="20"
              height={FH * 0.75}
              className="hi-door"
            />
          )}
        </g>
      ))}

      <rect x="14" y={PLINTH_Y} width={W - 28} height={GROUND_Y - PLINTH_Y - 4} className="hi-plinth" />
      <line x1="0" y1={GROUND_Y} x2={W} y2={GROUND_Y} className="hi-ground" />
      <ActiveMarker highlightIds={highlightIds} />
    </svg>
  );
}

export function Haus() {
  const [active, setActive] = useState('01');
  const f = (HAUS_FLOORS.find((x) => x.id === active) ?? HAUS_FLOORS[0]) as Floor;
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Klick auf Diagramm-Rechteck → finde die Listen-Etage, die es repräsentiert.
  const selectByRect = useCallback((rectId: string) => {
    const target = HAUS_FLOORS.find((fl) => (fl.highlights || [fl.id]).includes(rectId));
    if (target) setActive(target.id);
  }, []);

  // ↑ / ↓ Keyboard-Navigation — nur wenn die Sektion im Viewport ist.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      const sec = document.getElementById('haus');
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.4;
      if (!inView) return;
      const el = document.activeElement;
      if (el && /^(input|textarea|select)$/i.test(el.tagName)) return;
      e.preventDefault();
      const currentIdx = HAUS_FLOORS.findIndex((x) => x.id === activeRef.current);
      const dir = e.key === 'ArrowDown' ? 1 : -1;
      const ni = Math.max(0, Math.min(HAUS_FLOORS.length - 1, currentIdx + dir));
      const next = HAUS_FLOORS[ni];
      if (next) setActive(next.id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const wide = f.numeral.length > 2;

  return (
    <Section id="haus" theme="light">
      <style>{STYLES}</style>

      <header className="hi-head reveal">
        <Eyebrow>01 — Das Haus</Eyebrow>
        <h2 className="hi-h1 font-display">
          Parkstraße 1.
          <br />
          <span className="italic-gold">Fünf Etagen. Vier Orte.</span>
        </h2>
        <p className="hi-lead">
          Eine Gründerzeitvilla aus 1907. Wähle einen Bereich links — was es dort gibt, steht
          rechts. ↑ und ↓ wechseln auch.
        </p>
      </header>

      <div className="hi-grid reveal">
        {/* LINKS — Diagramm + Etagenliste */}
        <aside className="hi-side">
          <div className="hi-side-inner">
            <HausDiagramm activeFloor={f} onSelect={selectByRect} />
            <ol className="hi-floor-list">
              {HAUS_FLOORS.map((floor) => (
                <li key={floor.id}>
                  <button
                    type="button"
                    className={`hi-floor-btn ${active === floor.id ? 'is-active' : ''}`}
                    onClick={() => setActive(floor.id)}
                  >
                    <span
                      className={`hi-floor-num ${floor.numeral.length > 2 ? 'hi-floor-num--wide' : ''}`}
                    >
                      {floor.numeral}
                    </span>
                    <span className="hi-floor-name">{floor.name}</span>
                    <span className="hi-floor-tick" aria-hidden />
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        {/* RECHTS — Detail (crossfade per key) */}
        <main className="hi-detail">
          <div className="hi-fade" key={active}>
            <figure className="hi-figure">
              <div className="hi-figure-frame">
                <Image
                  src={f.photo}
                  alt={f.photoCaption}
                  fill
                  sizes="(min-width: 880px) 55vw, 100vw"
                />
              </div>
              <figcaption>{f.photoCaption}</figcaption>
            </figure>

            <div className="hi-text">
              <div className="hi-numeral-row">
                <span className={`hi-numeral font-display ${wide ? 'hi-numeral--wide' : ''}`}>
                  {f.numeral}
                </span>
                <div className="hi-numeral-meta">
                  <span className="hi-sub-eyebrow">{f.eyebrow}</span>
                  <span className="hi-sub-name font-display">{f.sub}</span>
                </div>
              </div>

              <h3 className="hi-title font-display">{f.title}</h3>
              <p className="hi-desc">{f.desc}</p>

              <dl className="hi-facts">
                {f.facts.map((fact, i) => (
                  <div key={fact} className="hi-fact-row">
                    <dt>{String(i + 1).padStart(2, '0')}</dt>
                    <dd>{fact}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </main>
      </div>
    </Section>
  );
}
