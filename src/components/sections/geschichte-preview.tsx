'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Eyebrow, Section } from '@/components/primitives/section';

/**
 * GeschichtePreview — Era-Karten-Preview (07 — Geschichte).
 * 1:1-Port von design_reference/home-bottom.jsx → function Geschichte().
 * Light theme. Interaktiv: aktive Ära via useState, getrieben durch die
 * proportionale Era-Bar und die Era-Liste links; Detailpanel rechts.
 */

type Era = {
  n: string;
  span: string;
  name: string;
  anchor: string;
  body: string;
  pivots: string[];
  dim: boolean;
};

const eras: [Era, ...Era[]] = [
  {
    n: '01',
    span: '1843 – 1857',
    name: 'Gründung & Revolution',
    anchor: '10. Oktober 1843',
    body: 'Erste Burschenschaft an einer technischen Hochschule in Deutschland. Mitglieder kämpfen 1848/49 im badischen Volksheer — acht Jahre Verbot folgen.',
    pivots: ['Gründung', 'Revolution 1848', 'Wiedergründung 1857'],
    dim: false,
  },
  {
    n: '02',
    span: '1877 – 1937',
    name: 'Wachstum & Verbund',
    anchor: '60 Jahre Aufbau',
    body: 'Schwesterverbindungen entstehen. Teutonia gründet den Rüdesheimer Deputierten-Convent mit und übernimmt Führungsrollen in nationalen Verbänden.',
    pivots: ['Germania 1877', 'Rüdesheimer DC 1900', 'DB-Vorsitz'],
    dim: false,
  },
  {
    n: '03',
    span: '1937 – 1950',
    name: 'Unterbrechung',
    anchor: '13 Jahre Zwangspause',
    body: 'Zwangsauflösung durch das NS-Regime. Mitglieder organisieren sich notgedrungen als „Kameradschaft Egerland". Diese Phase gehört zur Geschichte.',
    pivots: ['Gleichschaltung 1937', 'Kameradschaft Egerland', 'Neugründung 1950'],
    dim: true,
  },
  {
    n: '04',
    span: '1962 – 1990',
    name: 'Neubeginn & Konsolidierung',
    anchor: 'Parkstraße 1, 1962',
    body: 'Das heutige Verbindungshaus wird bezogen. Die Bestimmungsmensur wird 1971 als Pflicht abgeschafft. Teutonia definiert sich liberal und eigenständig.',
    pivots: ['Neubau 1962', 'Mensur abgeschafft 1971', 'Darmstädter AK 1977'],
    dim: false,
  },
  {
    n: '05',
    span: '1997 – heute',
    name: 'Klarer Kurs',
    anchor: 'Seit 2016 Mitglied der ADB',
    body: 'Austritt aus DB (1997) und NDB (2011) als Reaktion auf politische Drift in den Dachverbänden. 2016 Gründungsmitglied der Allgemeinen Deutschen Burschenschaft.',
    pivots: ['Hambacher Kreis 1997', 'ADB-Gründung 2016', 'Heute'],
    dim: false,
  },
];

// Proportionale Era-Dauern (Flex-Gewichte) — verbatim aus dem Design.
const eraDurations = [14, 80, 13, 47, 29];
const axisYears = ['1843', '1857', '1937', '1950', '1997', '2026'];

export function GeschichtePreview() {
  const [active, setActive] = useState(0);
  const current = eras[active] ?? eras[0];

  return (
    <Section id="geschichte" theme="light">
      {/* Header row */}
      <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 mb-[52px]">
        <div>
          <Eyebrow>07 — Geschichte</Eyebrow>
          <h2 className="font-display mt-6 text-balance text-[clamp(2rem,4.4vw,3.25rem)] font-light leading-[1.06] text-foreground [font-variation-settings:'opsz'_72,'SOFT'_50]">
            183 Jahre —{' '}
            <span className="italic text-couleur-burgund">
              eine Linie,
              <br />
              die hält.
            </span>
          </h2>
        </div>
        <div>
          <p className="max-w-[460px] text-[15px] leading-[1.75] text-foreground-muted">
            Die Geschichte ist lang — und lückenhaft, wie jede ehrliche deutsche Geschichte. Hier
            das Gerüst in fünf Kapiteln.
          </p>
          <Link
            href="/geschichte"
            className="mt-5 inline-flex items-center gap-2 border-b border-couleur-burgund/35 pb-[3px] text-xs font-medium uppercase tracking-[0.2em] text-couleur-burgund no-underline"
          >
            Vollständige Chronik <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>

      {/* Proportional era bar */}
      <div className="mb-10">
        <div className="flex h-0.5 overflow-hidden rounded-[2px] bg-border">
          {eras.map((era, i) => (
            <button
              key={era.n}
              type="button"
              onClick={() => setActive(i)}
              aria-label={era.name}
              style={{ flex: eraDurations[i] }}
              className={`h-full border-none p-0 cursor-pointer transition-[opacity,background] duration-200 ${
                active === i
                  ? 'bg-couleur-burgund opacity-100'
                  : i === 2
                    ? 'bg-foreground-dim opacity-[0.35]'
                    : 'bg-couleur-burgund opacity-[0.35]'
              }`}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between">
          {axisYears.map((y) => (
            <span
              key={y}
              className="font-display tabnum text-[10px] tracking-[-0.01em] text-foreground-dim"
            >
              {y}
            </span>
          ))}
        </div>
      </div>

      {/* Era tabs + detail */}
      <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Left: era list */}
        <div className="bg-background-veil">
          {eras.map((era, i) => (
            <button
              key={era.n}
              type="button"
              onClick={() => setActive(i)}
              className={`flex w-full cursor-pointer items-center gap-4 border-none px-6 py-[18px] text-left transition-colors duration-[180ms] ${
                active === i ? 'bg-background-elev' : 'bg-transparent'
              } ${i < eras.length - 1 ? 'border-b border-border' : ''}`}
            >
              <span
                className={`font-display tabnum shrink-0 text-[13px] transition-colors duration-[180ms] [font-variation-settings:'opsz'_24,'SOFT'_0] ${
                  active === i ? 'text-couleur-burgund' : 'text-foreground-dim'
                }`}
              >
                {era.n}
              </span>
              <div>
                <div
                  className={`text-[13.5px] leading-[1.3] transition-colors duration-[180ms] ${
                    active === i ? 'font-normal' : 'font-light'
                  } ${
                    active === i
                      ? 'text-foreground'
                      : era.dim
                        ? 'text-foreground-dim'
                        : 'text-foreground-muted'
                  }`}
                >
                  {era.name}
                </div>
                <div className="mt-0.5 text-[10px] tracking-[0.02em] text-foreground-dim">
                  {era.span}
                </div>
              </div>
              {active === i && (
                <span className="ml-auto h-1 w-1 shrink-0 rounded-full bg-couleur-burgund" />
              )}
            </button>
          ))}
        </div>

        {/* Right: detail panel */}
        <div className="flex min-h-[320px] flex-col justify-between bg-background-elev px-10 py-9">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-couleur-burgund">
                {current.span}
              </span>
              <span className="h-px flex-1 bg-border" />
              <span className="text-[9px] tracking-[0.08em] text-foreground-dim">
                {current.anchor}
              </span>
            </div>
            <h3
              className={`font-display text-[clamp(1.375rem,2.5vw,2rem)] font-light leading-[1.12] tracking-[-0.012em] [font-variation-settings:'opsz'_72,'SOFT'_50] ${
                current.dim ? 'text-foreground-muted' : 'text-foreground'
              }`}
            >
              {current.name}
            </h3>
            <p className="mt-4 max-w-[52ch] text-pretty text-[14.5px] leading-[1.75] text-foreground-muted">
              {current.body}
            </p>
          </div>

          {/* Pivot moments */}
          <div className="mt-8 flex flex-wrap gap-2">
            {current.pivots.map((p) => (
              <span
                key={p}
                className={`rounded-full border border-border bg-transparent px-3 py-[5px] text-[10px] font-medium uppercase tracking-[0.16em] ${
                  current.dim ? 'text-foreground-dim' : 'text-foreground-muted'
                }`}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
