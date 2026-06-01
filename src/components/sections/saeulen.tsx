'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { Eyebrow, Section } from '@/components/primitives/section';

/* ── Säulen — Greek temple ─────────────────────────────────────────────
 *
 * Faithful port of design_reference/home-top.jsx (Saeulen + GreekColumn).
 * The prototype leans on a set of `.temple` / `.t-col` / `.t-pillar*` CSS
 * classes that live only in its standalone styles.css. This file owns just
 * src/components/sections/saeulen.tsx and may not touch globals.css, so the
 * temple build-in animation and the hover interaction are reproduced inline:
 *   - entrance is gated by an IntersectionObserver (→ `active`), staggering
 *     entablature, columns (I→II→III), stylobate and halo exactly as the
 *     prototype's `.temple-active` rules do;
 *   - column + pillar hover share one `hovered` index (mouse + keyboard),
 *     driving the glow, the column lift, and the expand/collapse of the
 *     caption body — same values as the .t-* CSS.
 * Only the breathing-halo keyframe and the prefers-reduced-motion reset
 * cannot be expressed as inline styles, so a tiny component-scoped <style>
 * (unique `tt-` prefix, no global class) carries those two pieces.
 *
 * Design var → repo token mapping used below:
 *   --fg → foreground · --fg-muted → foreground-muted · --fg-dim → foreground-dim
 *   --border-strong → border-strong · --gold → couleur-gold
 *   --gold-dim → couleur-gold-dim · --burgund → couleur-burgund
 * Raw oklch()/rgba() literals (porphyry stone, flutes) are theme-independent
 * and copied verbatim from the prototype.
 */

type Pillar = {
  numeral: string;
  label: string;
  title: string;
  body: string;
  routine: string;
  detail: string;
};

const pillars: Pillar[] = [
  {
    numeral: 'I',
    label: 'Gemeinschaft',
    title: 'Du wohnst nicht allein.',
    body: 'Bei der Klausur ist um halb zwei jemand wach. Wanderwochenenden im Schwarzwald, Skiausflüge in die Alpen, Segeltörns im Sommer. Stammtische unter der Woche. Wir teilen das Haus — und ziemlich viele Erinnerungen.',
    routine: 'Was passiert montags?',
    detail: 'Gemeinsames Abendessen ab 19 Uhr. Niemand muss kommen. Fast alle kommen.',
  },
  {
    numeral: 'II',
    label: 'Bildung',
    title: 'Lernen quer durch die Fächer.',
    body: 'Maschinenbau erklärt Informatik die Mechanik. BWL übersetzt die Klausurfrage zurück. Ältere Semester wissen, welche Übungsleiterin gnädig korrigiert. Das ist kein Zufall — das ist die Idee.',
    routine: 'Wo lernst du?',
    detail:
      'Im Lernzimmer, in der Hausbibliothek, in der KIT-Bib (7 min) — oder am Küchentisch mit jemandem aus deinem Studiengang.',
  },
  {
    numeral: 'III',
    label: 'Netzwerk',
    title: 'Alumni, die noch da sind.',
    body: 'Alte Herren bleiben der Aktivitas verbunden — als Ratgeber, als Gesprächspartner, manchmal als Türöffner. Kein zwanghaftes Networking. Eher: jemand, der schon dort war, wo du hingehst.',
    routine: 'Wann triffst du sie?',
    detail: 'Beim Stiftungsfest, bei Vorträgen, an der Bar. Mehrmals pro Semester, planbar.',
  },
];

/* Shared cubic-bezier — design `--ease-out` / `--t-ease-bld`. */
const EASE = 'cubic-bezier(0.2, 0.7, 0.2, 1)';

/* Porphyry stone bands — deep burgund imperial marble (verbatim). */
const stoneCornice = 'linear-gradient(180deg, oklch(0.34 0.12 26) 0%, oklch(0.18 0.07 22) 100%)';
const stoneArchitrave =
  'linear-gradient(180deg, oklch(0.22 0.08 23) 0%, oklch(0.40 0.135 27) 45%, oklch(0.22 0.08 23) 100%)';
const stoneFrieze =
  'linear-gradient(180deg, oklch(0.28 0.10 25) 0%, oklch(0.46 0.15 28) 50%, oklch(0.28 0.10 25) 100%)';
const stoneShadow = 'linear-gradient(180deg, oklch(0.14 0.05 20) 0%, oklch(0.24 0.085 24) 100%)';
const stoneStep = 'linear-gradient(180deg, oklch(0.32 0.115 25) 0%, oklch(0.16 0.06 22) 100%)';
const stoneStepDim = 'linear-gradient(180deg, oklch(0.26 0.095 24) 0%, oklch(0.12 0.045 20) 100%)';

const TEMPLE_W = 920; // architrave + stylobate width
const STEREO_1 = 1000; // first stereobate step
const STEREO_2 = 1100; // second
const STEREO_3 = 1220; // third (widest, fades into bg)

/* ── Greek column SVG (verbatim geometry from the prototype) ──────────── */
function GreekColumn() {
  const W = 200;
  const H = 580;
  const ab = 14; // abacus slab
  const cap = 26; // capital echinus
  const neck = 7; // necking ring + groove
  const apof = 10; // base flare
  const torus = 18; // base torus
  const plinth = 12; // plinth
  const topH = ab + cap + neck;
  const botH = apof + torus + plinth;
  const shaftH = H - topH - botH;

  // entasis
  const shaftTopW = W * 0.76;
  const shaftBotW = W * 0.86;
  const baseW = W * 0.96;
  const cx = W / 2;

  const shaftTopY = topH;
  const shaftBotY = topH + shaftH;
  const shaftLT = cx - shaftTopW / 2;
  const shaftRT = cx + shaftTopW / 2;
  const shaftLB = cx - shaftBotW / 2;
  const shaftRB = cx + shaftBotW / 2;

  // flutes — vertical grooves with shadow + highlight pairs
  const flutes = 14;
  const fluteEls: React.ReactNode[] = [];
  for (let i = 0; i <= flutes; i++) {
    const t = i / flutes;
    const xTop = shaftLT + t * shaftTopW;
    const xBot = shaftLB + t * shaftBotW;
    fluteEls.push(
      <line
        key={`s${i}`}
        x1={xTop}
        y1={shaftTopY}
        x2={xBot}
        y2={shaftBotY}
        stroke="rgba(6,2,1,0.62)"
        strokeWidth="0.7"
      />,
    );
    if (i < flutes) {
      const offT = (shaftTopW / flutes) * 0.5;
      const offB = (shaftBotW / flutes) * 0.5;
      fluteEls.push(
        <line
          key={`h${i}`}
          x1={xTop + offT}
          y1={shaftTopY}
          x2={xBot + offB}
          y2={shaftBotY}
          stroke="oklch(0.7 0.085 72 / 28%)"
          strokeWidth="0.5"
        />,
      );
    }
  }

  return (
    <svg
      aria-hidden
      role="presentation"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYEnd meet"
      style={{
        display: 'block',
        width: '100%',
        maxWidth: 120,
        filter:
          'drop-shadow(0 12px 18px oklch(0.08 0.02 22 / 60%)) drop-shadow(0 0 22px oklch(0.46 0.16 24 / 22%))',
      }}
    >
      <defs>
        {/* Porphyry — deep burgund imperial stone with gold veining */}
        <linearGradient id="t-stone-shaft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.12 0.045 20)" />
          <stop offset="14%" stopColor="oklch(0.24 0.085 24)" />
          <stop offset="42%" stopColor="oklch(0.40 0.135 27)" />
          <stop offset="58%" stopColor="oklch(0.38 0.13 26)" />
          <stop offset="86%" stopColor="oklch(0.22 0.08 22)" />
          <stop offset="100%" stopColor="oklch(0.10 0.035 18)" />
        </linearGradient>
        <linearGradient id="t-stone-block" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.12 0.045 20)" />
          <stop offset="20%" stopColor="oklch(0.30 0.11 25)" />
          <stop offset="50%" stopColor="oklch(0.44 0.145 28)" />
          <stop offset="80%" stopColor="oklch(0.28 0.10 24)" />
          <stop offset="100%" stopColor="oklch(0.10 0.035 18)" />
        </linearGradient>
        <linearGradient id="t-stone-torus" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.26 0.095 24)" />
          <stop offset="45%" stopColor="oklch(0.46 0.15 28)" />
          <stop offset="100%" stopColor="oklch(0.12 0.045 20)" />
        </linearGradient>
      </defs>

      {/* Abacus */}
      <rect x={0} y={0} width={W} height={ab} fill="url(#t-stone-block)" />
      <line x1={0} y1={ab - 0.5} x2={W} y2={ab - 0.5} stroke="rgba(6,2,1,0.6)" strokeWidth="0.8" />

      {/* Capital echinus — widens up to abacus */}
      <polygon
        points={`
        ${cx - shaftTopW / 2 - 6},${ab + cap}
        ${cx + shaftTopW / 2 + 6},${ab + cap}
        ${W - 2},${ab}
        ${2},${ab}
      `}
        fill="url(#t-stone-block)"
      />

      {/* Annulets (rings at top of necking) */}
      <rect
        x={cx - shaftTopW / 2 - 6}
        y={ab + cap}
        width={shaftTopW + 12}
        height={1.8}
        fill="rgba(6,2,1,0.7)"
      />
      <rect
        x={cx - shaftTopW / 2 - 4}
        y={ab + cap + 2}
        width={shaftTopW + 8}
        height={1.4}
        fill="rgba(6,2,1,0.55)"
      />

      {/* Necking */}
      <rect
        x={cx - shaftTopW / 2}
        y={ab + cap + 4}
        width={shaftTopW}
        height={neck - 4}
        fill="url(#t-stone-shaft)"
      />
      <line
        x1={cx - shaftTopW / 2}
        y1={topH - 0.5}
        x2={cx + shaftTopW / 2}
        y2={topH - 0.5}
        stroke="rgba(6,2,1,0.65)"
        strokeWidth="0.7"
      />

      {/* Shaft */}
      <polygon
        points={`
        ${shaftLT},${shaftTopY}
        ${shaftRT},${shaftTopY}
        ${shaftRB},${shaftBotY}
        ${shaftLB},${shaftBotY}
      `}
        fill="url(#t-stone-shaft)"
      />
      {fluteEls}

      {/* Apophyge (shaft flares out to base) */}
      <polygon
        points={`
        ${shaftLB},${shaftBotY}
        ${shaftRB},${shaftBotY}
        ${cx + baseW / 2},${shaftBotY + apof}
        ${cx - baseW / 2},${shaftBotY + apof}
      `}
        fill="url(#t-stone-block)"
      />

      {/* Torus (rounded base ring) */}
      <rect
        x={cx - baseW / 2}
        y={H - plinth - torus}
        width={baseW}
        height={torus}
        fill="url(#t-stone-torus)"
      />
      <line
        x1={cx - baseW / 2 + 1}
        y1={H - plinth - torus + 3}
        x2={cx + baseW / 2 - 1}
        y2={H - plinth - torus + 3}
        stroke="oklch(0.7 0.085 72 / 38%)"
        strokeWidth="0.5"
      />
      <line
        x1={cx - baseW / 2 + 1}
        y1={H - plinth - 1}
        x2={cx + baseW / 2 - 1}
        y2={H - plinth - 1}
        stroke="rgba(6,2,1,0.65)"
        strokeWidth="0.6"
      />

      {/* Plinth */}
      <rect x={0} y={H - plinth} width={W} height={plinth} fill="url(#t-stone-block)" />
      <line
        x1={0}
        y1={H - plinth}
        x2={W}
        y2={H - plinth}
        stroke="rgba(6,2,1,0.75)"
        strokeWidth="0.9"
      />
    </svg>
  );
}

export function Saeulen() {
  const templeRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  // `hovered` = pointer/focus hover (transient); `pinned` = click/Enter toggle
  // (sticky, for touch + keyboard). A pillar is open when either points at it.
  const [hovered, setHovered] = useState(-1);
  const [pinned, setPinned] = useState(-1);
  const openIndex = hovered === -1 ? pinned : hovered;

  // Build-in entrance: gate on intersection, then disconnect (one-shot),
  // matching the prototype's IntersectionObserver({ threshold: 0.18 }).
  useEffect(() => {
    const el = templeRef.current;
    if (!el) return;

    const reduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Per-column build-in: clip-path inset(100%→0) + lift + fade, staggered.
  const colStyle = (i: number, isHot: boolean): CSSProperties => {
    const delay = [320, 500, 680][i];
    if (!active) {
      return {
        clipPath: 'inset(100% 0 0 0)',
        transform: 'translateY(14px)',
        opacity: 0,
        transition: `clip-path 1050ms ${EASE}, transform 1050ms ${EASE}, opacity 500ms ease`,
      };
    }
    if (isHot) {
      // Hover lifts the column AFTER the rise animation completed.
      return {
        clipPath: 'inset(0)',
        transform: 'translateY(-8px)',
        opacity: 1,
        transition: `transform 340ms ${EASE}, clip-path 0ms`,
      };
    }
    return {
      clipPath: 'inset(0)',
      transform: 'none',
      opacity: 1,
      transition: `clip-path 1050ms ${EASE}, transform 1050ms ${EASE}, opacity 500ms ease`,
      transitionDelay: `${delay}ms, ${delay}ms, ${delay}ms`,
    };
  };

  return (
    <Section id="saeulen" theme="dark" veil>
      {/* Scoped — only the halo breathe-keyframe + reduced-motion reset
          can't be inline styles. Unique `tt-` prefix avoids any global clash. */}
      <style>{`
        @keyframes tt-halo-breathe {
          0%, 100% { transform: scale(1);    opacity: 0.85; }
          50%      { transform: scale(1.07); opacity: 1; }
        }
        .tt-temple-active .tt-halo { animation: tt-halo-breathe 7s ease-in-out 2700ms infinite; }
        @media (prefers-reduced-motion: reduce) {
          .tt-temple [style] { transition: none !important; }
          .tt-temple .tt-halo,
          .tt-temple .tt-col-anim { animation: none !important; }
        }
      `}</style>

      <div className="reveal" style={{ maxWidth: 880 }}>
        <Eyebrow>03 — Was du bekommst</Eyebrow>
        <h2
          className="font-display"
          style={{
            marginTop: 28,
            fontSize: 'clamp(2rem, 4.6vw, 3.5rem)',
            fontWeight: 300,
            lineHeight: 1.05,
            color: 'var(--foreground)',
            textWrap: 'balance',
            fontVariationSettings: "'opsz' 72, 'SOFT' 50",
          }}
        >
          Drei Säulen, die wir <span className="italic-gold">konkret füllen.</span>
        </h2>
        <p
          style={{
            marginTop: 24,
            fontSize: 17,
            lineHeight: 1.7,
            color: 'var(--foreground-muted)',
            maxWidth: 640,
          }}
        >
          Keine Slogans. Was wir versprechen, sind Routinen, die seit Jahrzehnten funktionieren.
          Hier ist, was du erwarten kannst.
        </p>
      </div>

      {/* Temple */}
      <div
        ref={templeRef}
        className={`tt-temple${active ? ' tt-temple-active' : ''} reveal reveal-d1`}
        style={{
          marginTop: 'clamp(28px, 4vw, 56px)',
          position: 'relative',
          isolation: 'isolate',
        }}
      >
        {/* Warm halo behind the temple — fades in last, then breathes */}
        <div
          className="tt-halo"
          aria-hidden
          style={{
            position: 'absolute',
            inset: '-40px -10% 40px',
            background:
              'radial-gradient(ellipse 60% 70% at 50% 55%, oklch(0.55 0.14 28 / 22%) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: -1,
            transformOrigin: '50% 60%',
            opacity: active ? 1 : 0,
            transition: 'opacity 1400ms ease 1900ms',
          }}
        />

        {/* ENTABLATURE (cornice → frieze → architrave) — drops in from above */}
        <div
          style={{
            position: 'relative',
            maxWidth: TEMPLE_W,
            margin: '0 auto',
            transform: active ? 'none' : 'translateY(-64px)',
            opacity: active ? 1 : 0,
            transition: `transform 1100ms ${EASE} 950ms, opacity 800ms ease 950ms`,
            willChange: 'transform, opacity',
          }}
        >
          {/* Cornice */}
          <div
            style={{
              height: 7,
              background: stoneCornice,
              borderTop: '1px solid oklch(0.7 0.085 72 / 35%)',
              boxShadow: 'inset 0 -1px 0 rgba(6,2,1,0.5)',
            }}
          />
          {/* Frieze — plain stone band */}
          <div
            style={{
              height: 22,
              background: stoneFrieze,
              borderTop: '1px solid rgba(6,2,1,0.4)',
            }}
          />
          {/* Architrave */}
          <div
            style={{
              height: 9,
              background: stoneArchitrave,
              borderTop: '1px solid rgba(6,2,1,0.5)',
              borderBottom: '1px solid rgba(6,2,1,0.45)',
            }}
          />
          {/* Taenia */}
          <div style={{ height: 3, background: stoneShadow }} />
        </div>

        {/* COLUMNS */}
        <div
          style={{
            maxWidth: TEMPLE_W,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            alignItems: 'end',
            padding: '0 24px',
            position: 'relative',
          }}
        >
          {pillars.map((p, i) => {
            const isHot = openIndex === i;
            return (
              // Decorative mirror of the pillar state: the column lifts/glows
              // when its caption (below) is hovered or focused. Interaction is
              // owned by the captioned <article>, so this stays non-interactive.
              <div
                key={p.label}
                aria-hidden
                className="tt-col-anim"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                  ...colStyle(i, isHot),
                }}
              >
                {/* Hover glow behind the column */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: '8% 0 4% 0',
                    background:
                      'radial-gradient(ellipse 55% 70% at 50% 50%, oklch(0.55 0.16 26 / 50%) 0%, transparent 65%)',
                    filter: 'blur(18px)',
                    opacity: active && isHot ? 1 : 0,
                    transform: active && isHot ? 'scale(1.05)' : 'scale(0.92)',
                    transition: `opacity 380ms ease, transform 380ms ${EASE}`,
                    pointerEvents: 'none',
                    zIndex: -1,
                  }}
                />
                <GreekColumn />
              </div>
            );
          })}
        </div>

        {/* STYLOBATE + STEREOBATE — slide up from below */}
        <div
          style={{
            transform: active ? 'none' : 'translateY(32px)',
            opacity: active ? 1 : 0,
            transition: `transform 900ms ${EASE}, opacity 600ms ease`,
          }}
        >
          {/* Stylobate — plain stone band */}
          <div
            style={{
              maxWidth: TEMPLE_W,
              margin: '0 auto',
              height: 26,
              background: stoneFrieze,
              borderTop: '1px solid oklch(0.7 0.085 72 / 35%)',
              borderBottom: '1px solid rgba(6,2,1,0.5)',
            }}
          />

          {/* STEREOBATE steps */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                maxWidth: STEREO_1,
                margin: '0 auto',
                height: 14,
                background: stoneStep,
                borderTop: '1px solid oklch(0.7 0.085 72 / 25%)',
                borderBottom: '1px solid rgba(6,2,1,0.55)',
              }}
            />
            <div
              style={{
                maxWidth: STEREO_2,
                margin: '0 auto',
                height: 12,
                background: stoneStepDim,
                borderTop: '1px solid oklch(0.7 0.085 72 / 18%)',
                borderBottom: '1px solid rgba(6,2,1,0.6)',
              }}
            />
            <div
              style={{
                maxWidth: STEREO_3,
                margin: '0 auto',
                height: 10,
                background:
                  'linear-gradient(180deg, oklch(0.22 0.08 23) 0%, oklch(0.10 0.035 18) 100%)',
                borderTop: '1px solid oklch(0.7 0.085 72 / 12%)',
              }}
            />
            <div
              aria-hidden
              style={{
                height: 14,
                background:
                  'linear-gradient(180deg, oklch(0.12 0.04 20 / 60%) 0%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Pillar captions — sit right under the temple */}
      <div
        style={{
          maxWidth: TEMPLE_W,
          margin: '4px auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(20px, 2.5vw, 36px)',
          padding: '0 24px',
        }}
      >
        {pillars.map((p, i) => {
          const isOpen = openIndex === i;
          return (
            // Disclosure: hover/focus opens (transient), click/Enter/Space
            // pins it (sticky — touch + keyboard). A real <button> gives native
            // keyboard activation; button-reset styles keep the editorial look.
            <button
              type="button"
              key={p.label}
              className={`reveal reveal-d${i + 1}`}
              aria-expanded={isOpen}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(-1)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(-1)}
              onClick={() => setPinned((current) => (current === i ? -1 : i))}
              style={{
                position: 'relative',
                display: 'block',
                width: '100%',
                margin: 0,
                padding: '28px 0 22px',
                textAlign: 'left',
                font: 'inherit',
                color: 'inherit',
                background: 'none',
                border: 0,
                borderTop: `1px solid ${isOpen ? 'var(--couleur-gold-dim)' : 'var(--border-strong)'}`,
                transition: 'border-color 320ms ease',
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
              }}
            >
              {/* Thread connecting column → pillar */}
              <span
                aria-hidden
                style={{
                  content: '',
                  position: 'absolute',
                  top: -14,
                  left: '50%',
                  width: 1,
                  height: isOpen ? 14 : 10,
                  background:
                    'linear-gradient(180deg, transparent, var(--couleur-gold-dim) 70%, var(--couleur-gold-dim))',
                  opacity: isOpen ? 0.95 : 0.4,
                  transform: 'translateX(-50%)',
                  transition: `opacity 320ms ease, height 380ms ${EASE}`,
                }}
              />

              {/* head — always visible */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 12,
                  }}
                >
                  <span
                    className="font-display"
                    style={{
                      fontSize: 17,
                      fontStyle: 'italic',
                      color: 'var(--couleur-gold)',
                      fontVariationSettings: "'opsz' 36, 'SOFT' 80",
                      lineHeight: 1,
                    }}
                  >
                    {p.numeral}
                  </span>
                  <span
                    style={{
                      fontSize: 10.5,
                      letterSpacing: '0.32em',
                      textTransform: 'uppercase',
                      color: 'var(--couleur-burgund)',
                      fontWeight: 500,
                    }}
                  >
                    {p.label}
                  </span>
                </div>
                <h3
                  className="font-display"
                  style={{
                    marginTop: 18,
                    fontSize: 'clamp(20px, 2.2vw, 26px)',
                    lineHeight: 1.22,
                    color: 'var(--foreground)',
                    textWrap: 'balance',
                    fontVariationSettings: "'opsz' 48, 'SOFT' 40",
                    letterSpacing: '-0.012em',
                  }}
                >
                  {p.title}
                </h3>
              </div>

              {/* body — collapsed by default, expands on hover/focus */}
              <div
                style={{
                  maxHeight: isOpen ? 540 : 0,
                  overflow: 'hidden',
                  opacity: isOpen ? 1 : 0,
                  transition: isOpen
                    ? `max-height 620ms ${EASE}, opacity 480ms ease 80ms`
                    : `max-height 560ms ${EASE}, opacity 320ms ease`,
                }}
              >
                <div>
                  <p
                    style={{
                      marginTop: 16,
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: 'var(--foreground-muted)',
                    }}
                  >
                    {p.body}
                  </p>
                  {/* Routine detail — the prototype's `routine`/`detail` copy,
                      surfaced inside the expanding body. */}
                  <div
                    style={{
                      marginTop: 18,
                      paddingTop: 14,
                      borderTop: '1px solid var(--border-strong)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        letterSpacing: '0.26em',
                        textTransform: 'uppercase',
                        color: 'var(--couleur-gold-dim)',
                      }}
                    >
                      {p.routine}
                    </div>
                    <p
                      style={{
                        marginTop: 8,
                        fontSize: 13.5,
                        fontStyle: 'italic',
                        lineHeight: 1.65,
                        color: 'var(--foreground-muted)',
                      }}
                    >
                      {p.detail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover hint — visible only while collapsed */}
              <div
                aria-hidden
                style={{
                  marginTop: 14,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 10,
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  color: 'var(--couleur-gold)',
                  opacity: isOpen ? 0 : 0.7,
                  transition: 'opacity 280ms ease, transform 280ms ease',
                }}
              >
                <span>↓ mehr lesen</span>
              </div>
            </button>
          );
        })}
      </div>
    </Section>
  );
}
