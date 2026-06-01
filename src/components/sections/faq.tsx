'use client';

import { useState } from 'react';
import { Eyebrow, Section } from '@/components/primitives/section';
import { useReveal } from '@/hooks/use-reveal';

/**
 * FAQ — Accordion (08 — Häufige Fragen).
 * 1:1-Port von design_reference/home-bottom.jsx → function FAQ().
 * Light theme. Interaktiv:
 *  - openIdx via useState (Item 0 offen by default), Klick toggelt.
 *  - Weiche Höhen-Animation über grid-template-rows 0fr → 1fr (motion-safe).
 *  - Rundes Chevron-Icon, rotiert 180° beim Öffnen.
 *  - Offenes Item färbt Nummer / Frage / Icon burgund.
 *  - Gestaffeltes Einblenden via useReveal-Hook (.reveal / .reveal-dN),
 *    der prefers-reduced-motion bereits respektiert.
 * Die 6 Fragen/Antworten sind wörtlich aus dem Design übernommen.
 */

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: 'Müssen Mitglieder fechten?',
    a: 'Nein. Die Bestimmungsmensur — die Pflichtpartie — haben wir 1971 abgeschafft. Verabredungsmensuren werden weiterhin gefochten, aber freiwillig. Der Umgang mit dem Korbschläger gehört zur Ausbildung, als Disziplin, nicht als Probe.',
  },
  {
    q: 'Ist Teutonia politisch?',
    a: 'Parteipolitisch neutral. Wir nehmen keine Parteilinie ein und lehnen jede Vereinnahmung ab. Im Haus wird diskutiert, nicht agitiert. Seit 2016 sind wir Gründungsmitglied der Allgemeinen Deutschen Burschenschaft (ADB) mit klar verfassungstreuer Linie.',
  },
  {
    q: 'Wer kann Mitglied werden?',
    a: 'Studierende des KIT. Voraussetzung ist die Immatrikulation am Karlsruher Institut für Technologie und der Wille, das Haus mitzutragen. Frauen sind als Gäste ausdrücklich willkommen; das Mitgliedsrecht ist statutgemäß männlichen Studierenden vorbehalten.',
  },
  {
    q: 'Was kostet das Wohnen?',
    a: 'Ab 280 € Warmmiete pro Monat — alles inklusive: Heizung, Strom, Wasser, Internet. Das ist nicht günstiger als das Studierendenwerk, aber du wohnst möbliert, mit eigenem Bad, in fünf Minuten zum KIT und mit Mitbewohnern, die schon wissen, wie die Klausur abläuft.',
  },
  {
    q: 'Bin ich zu irgendetwas verpflichtet?',
    a: 'Im Probesemester nicht. Im ersten Jahr als Fux: jede Woche eine Paukstunde und eine Fuxenstunde. Danach einmal im Monat ein Convent, Teilnahme am Hausleben und Übernahme eines Amts in der Verwaltung (Aktivenkasse, Schriftwart, etc.). Studium hat Vorrang. Wer schreibt, tritt in den Hintergrund — Wohnen geht weiter.',
  },
  {
    q: 'Was ist mit dem Begriff „Burschenschaft“?',
    a: 'Das Wort hat Beifang. Wir entstanden 1843 aus der Bewegung für Demokratie und Einheit. Diese liberal-freiheitliche Gesinnung ist unser roter Faden — nicht der Versuch, eine vergangene Welt zu konservieren. Burschenschaft heißt bei uns: Bildungs- und Lerngemeinschaft.',
  },
];

// reveal-dN stagger (1..6) — entspricht dem gestaffelten Einblenden des Designs.
const revealDelay = [1, 2, 3, 4, 5, 6] as const;

function FaqItem({
  faq,
  index,
  isOpen,
  isFirst,
  onToggle,
}: {
  faq: Faq;
  index: number;
  isOpen: boolean;
  isFirst: boolean;
  onToggle: () => void;
}) {
  const ref = useReveal<HTMLDivElement>();
  const num = String(index + 1).padStart(2, '0');
  const delay = revealDelay[Math.min(index, revealDelay.length - 1)];

  return (
    <div
      ref={ref}
      className={`reveal reveal-d${delay} border-b border-border ${
        isFirst ? 'border-t border-border' : ''
      }`}
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full cursor-pointer items-center gap-[18px] border-none bg-transparent py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-couleur-burgund"
      >
        {/* Nummer */}
        <span
          className={`font-display tabnum shrink-0 text-[13px] transition-[color,opacity] duration-[250ms] [font-variation-settings:'opsz'_24,'SOFT'_0] ${
            isOpen ? 'text-couleur-burgund opacity-100' : 'text-foreground-dim opacity-[0.55]'
          }`}
        >
          {num}
        </span>

        {/* Frage */}
        <span
          className={`flex-1 font-display text-[clamp(17px,1.9vw,22px)] font-light leading-[1.25] [font-variation-settings:'opsz'_48,'SOFT'_30] transition-[color] duration-[220ms] motion-safe:transition-[color,transform] motion-safe:duration-300 motion-safe:[transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)] group-hover:text-foreground ${
            isOpen ? 'text-foreground motion-safe:translate-x-[5px]' : 'text-foreground-muted'
          }`}
        >
          {faq.q}
        </span>

        {/* Chevron-Icon */}
        <span
          aria-hidden="true"
          className={`grid size-[30px] shrink-0 place-items-center rounded-full border transition-[border-color,color,background] duration-[220ms] ${
            isOpen
              ? 'border-couleur-burgund bg-[oklch(0.4_0.17_22_/_8%)] text-couleur-burgund'
              : 'border-border-strong text-foreground-dim'
          }`}
        >
          <svg
            aria-hidden
            role="presentation"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={`transition-transform duration-[360ms] [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)] ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            <path
              d="M2.5 5L7 9.5L11.5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* Animierter Body — Höhe via grid-template-rows 0fr → 1fr */}
      <div
        className={`grid transition-[grid-template-rows] duration-[400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-[68ch] pb-7 pl-[34px] text-pretty text-[15px] leading-[1.78] text-foreground-muted">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <Section id="faq" theme="light">
      <div className="reveal mb-12">
        <Eyebrow>08 — Häufige Fragen</Eyebrow>
        <h2 className="font-display mt-7 max-w-[22ch] text-balance text-[clamp(2rem,4.6vw,3.5rem)] font-light leading-[1.05] text-foreground [font-variation-settings:'opsz'_72,'SOFT'_50]">
          Was die Leute uns <span className="italic-gold">tatsächlich fragen.</span>
        </h2>
        <p className="mt-6 max-w-[540px] text-[15px] leading-[1.7] text-foreground-muted">
          Es gibt Missverständnisse über Burschenschaften. Wir beantworten sie hier präzise, ohne
          Pathos.
        </p>
      </div>

      <div>
        {faqs.map((faq, i) => (
          <FaqItem
            key={faq.q}
            faq={faq}
            index={i}
            isFirst={i === 0}
            isOpen={openIdx === i}
            onToggle={() => setOpenIdx((prev) => (prev === i ? null : i))}
          />
        ))}
      </div>
    </Section>
  );
}
