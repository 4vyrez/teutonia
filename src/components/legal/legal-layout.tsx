import Link from 'next/link';
import type { ReactNode } from 'react';
import { Eyebrow } from '@/components/primitives/section';
import { SiteFooter } from '@/components/sections/site-footer';
import { SiteHeader } from '@/components/sections/site-header';

export type LegalSection = {
  /** Pre-formatted section number, e.g. "01". */
  n: string;
  heading: string;
  body: ReactNode;
};

export type LegalLayoutProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
  crossLink: { href: string; label: string };
  /** "Stand"-Zeile, e.g. "Mai 2026". */
  stand: string;
};

/**
 * Shared editorial layout for the legal routes (/impressum, /datenschutz).
 *
 * MUST open with the dark hero band so the transparent <SiteHeader/> stays
 * legible at the top of the page (the header reads the theme of the visible
 * section while scrolling). Mirrors `design_reference/legal.jsx` → LegalLayout.
 * Server Component — `.reveal` classes are activated by the global reveal hook.
 */
export function LegalLayout({
  eyebrow,
  title,
  intro,
  sections,
  crossLink,
  stand,
}: LegalLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Dark hero band — keeps the transparent header legible at page top */}
        <section
          data-theme="dark"
          className="relative overflow-hidden bg-background text-foreground"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 [background:radial-gradient(ellipse_60%_45%_at_78%_12%,oklch(0.78_0.14_78/8%)_0%,transparent_60%)]" />
            <div className="absolute inset-0 [background:radial-gradient(ellipse_65%_60%_at_8%_100%,oklch(0.42_0.16_22/16%)_0%,transparent_65%)]" />
            <div className="grain" />
          </div>
          <div className="relative mx-auto w-full max-w-7xl px-6 pt-[clamp(140px,20vh,220px)] pb-[clamp(56px,8vw,96px)] sm:px-8 lg:px-12">
            <div className="max-w-[760px]">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground-dim transition-colors hover:text-foreground"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:-translate-x-[3px]"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Zur Startseite
              </Link>

              <Eyebrow className="mt-10">{eyebrow}</Eyebrow>
              <h1 className="font-display mt-[22px] text-[clamp(2.5rem,6.5vw,4.5rem)] font-light leading-none tracking-[-0.022em] text-foreground [font-variation-settings:'opsz'_144,'SOFT'_50,'WONK'_0]">
                {title}
              </h1>
              <p className="mt-6 max-w-[560px] text-[17px] leading-[1.7] text-foreground-muted [text-wrap:pretty]">
                {intro}
              </p>
            </div>
          </div>
        </section>

        {/* Sections — editorial numbered list, light theme */}
        <section data-theme="light" className="bg-background text-foreground">
          <div className="mx-auto w-full max-w-7xl px-6 pt-[clamp(56px,8vw,88px)] pb-[clamp(80px,12vw,150px)] sm:px-8 lg:px-12">
            <div className="flex max-w-[760px] flex-col">
              {sections.map((s) => (
                <section key={s.n} className="reveal grid gap-[14px] border-t border-border py-8">
                  <div className="flex flex-wrap items-baseline gap-4">
                    <span className="font-display text-[14px] tabular-nums tracking-normal text-couleur-burgund [font-variation-settings:'opsz'_36,'SOFT'_0]">
                      {s.n}
                    </span>
                    <h2 className="font-display text-[clamp(1.25rem,2.4vw,1.6rem)] font-light leading-tight text-foreground [font-variation-settings:'opsz'_48,'SOFT'_50,'WONK'_0]">
                      {s.heading}
                    </h2>
                  </div>
                  <div className="max-w-[640px] text-[15px] leading-[1.78] text-foreground-muted [text-wrap:pretty]">
                    {s.body}
                  </div>
                </section>
              ))}

              {/* Footer of the legal page — stand + cross link */}
              <div className="reveal mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-couleur-gold-dim pt-7">
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground-dim">
                  Stand · {stand}
                </span>
                <Link
                  href={crossLink.href}
                  className="group inline-flex items-center gap-2 text-[13px] text-foreground-muted transition-colors hover:text-couleur-burgund-hi"
                >
                  {crossLink.label}
                  <span
                    aria-hidden
                    className="inline-flex transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
