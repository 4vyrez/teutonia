'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Arrow, LinkButton } from '@/components/primitives/button';
import { Wappen } from '@/components/primitives/wappen';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

type HeaderTheme = 'dark' | 'light';

/**
 * Liest beim Scrollen Zustand + sichtbares Section-Theme aus (1:1 aus
 * design_reference/shared.jsx → useScrollHeader):
 *   - solid: ab scrollY > 40vh → frosted-glass-Header.
 *   - theme: data-theme der Sektion, die den Probe-Punkt (35vh) überlappt.
 *   - active: id ebendieser Sektion → Nav-Underline.
 * prefers-reduced-motion ist über die Transitions in globals.css abgedeckt.
 */
function useScrollHeader() {
  const [solid, setSolid] = useState(false);
  const [theme, setTheme] = useState<HeaderTheme>('dark');
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > window.innerHeight * 0.4);
      const probe = window.innerHeight * 0.35;
      const sections = document.querySelectorAll<HTMLElement>('section[data-theme]');
      let currTheme: HeaderTheme = 'dark';
      let currId = '';
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          currTheme = (s.dataset.theme as HeaderTheme) || 'dark';
          currId = s.id;
        }
      }
      setTheme(currTheme);
      setActive(currId);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return { solid, theme, active };
}

/** '#haus' → '/#haus' (cross-page-fähig), '/mitgliedschaft' bleibt wie es ist. */
function toHref(href: string): string {
  return href.startsWith('#') ? `/${href}` : href;
}

/** Nav-Eintrag ist aktiv, wenn sein Hash der aktuell sichtbaren Section-id entspricht. */
function isActive(href: string, active: string): boolean {
  const hash = href.startsWith('#') ? href.slice(1) : '';
  return hash !== '' && hash === active;
}

export function SiteHeader() {
  const { solid, theme, active } = useScrollHeader();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLight = solid && theme === 'light';
  // Header-Theme: oben immer 'dark' (über dunkler Hero-Sektion), sonst Section-Theme.
  const headerTheme: HeaderTheme = solid ? theme : 'dark';

  // Schließe das Mobile-Menü bei Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // Frosted-glass-Chrome (.site-header[data-solid][data-theme] aus styles.css).
  // Werte verbatim aus design_reference/styles.css übernommen.
  const chrome = !solid
    ? undefined
    : isLight
      ? {
          background: 'oklch(0.97 0.003 265 / 82%)',
          backdropFilter: 'saturate(1.4) blur(18px)',
          WebkitBackdropFilter: 'saturate(1.4) blur(18px)',
          borderBottomColor: 'oklch(0 0 0 / 8%)',
        }
      : {
          background: 'oklch(0.135 0.006 265 / 76%)',
          backdropFilter: 'saturate(1.4) blur(18px)',
          WebkitBackdropFilter: 'saturate(1.4) blur(18px)',
          borderBottomColor: 'oklch(1 1 1 / 6%)',
        };

  return (
    <header
      data-theme={headerTheme}
      data-solid={solid}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-transparent',
        'transition-[background-color,backdrop-filter,border-color,padding] duration-[360ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]',
        solid ? 'py-[14px]' : 'py-6',
      )}
      style={chrome}
    >
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-6 px-[clamp(20px,4vw,56px)]">
        {/* Wortmarke */}
        <Link href="/" aria-label="KB! Teutonia — Startseite" className="flex items-center gap-3">
          <Wappen variant="image" light={isLight} className="h-8 w-auto" />
          <div className="flex flex-col">
            <span
              className="font-display text-foreground"
              style={{
                fontSize: 16,
                lineHeight: 1.05,
                fontVariationSettings: "'opsz' 24, 'SOFT' 30",
              }}
            >
              KB! Teutonia
            </span>
            <span
              className="text-couleur-gold-dim"
              style={{
                fontSize: 9,
                textTransform: 'uppercase',
                letterSpacing: '0.26em',
                marginTop: 3,
              }}
            >
              Karlsruhe · seit 1843
            </span>
          </div>
        </Link>

        {/* Desktop-Navigation */}
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-7 min-[901px]:flex">
          {siteConfig.navigation.map((item) => {
            const activeItem = isActive(item.href, active);
            return (
              <Link
                key={item.href}
                href={toHref(item.href)}
                aria-current={activeItem ? 'true' : undefined}
                className={cn(
                  'relative text-[13px] transition-colors duration-200',
                  activeItem
                    ? 'text-foreground after:absolute after:inset-x-0 after:-bottom-2 after:h-px after:bg-couleur-burgund'
                    : 'text-foreground-muted hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* CTA-Pill */}
          <LinkButton
            href={siteConfig.appUrl}
            target="_blank"
            rel="noreferrer"
            variant="pill"
            tone={isLight ? 'light' : 'dark'}
            className="hidden sm:inline-flex"
          >
            Mitgliederbereich
            <Arrow />
          </LinkButton>

          {/* Mobile-Toggle */}
          <button
            type="button"
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border-strong text-foreground transition-colors hover:border-couleur-gold-dim min-[901px]:hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              role="img"
            >
              <title>{menuOpen ? 'Menü schließen' : 'Menü öffnen'}</title>
              {menuOpen ? (
                <>
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile-Navigation — Disclosure-Panel */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Hauptnavigation (mobil)"
          className="border-t border-border bg-background/95 px-[clamp(20px,4vw,56px)] py-4 backdrop-blur-md min-[901px]:hidden"
          style={{ backdropFilter: 'saturate(1.4) blur(18px)' }}
        >
          <ul className="flex flex-col">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={toHref(item.href)}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(item.href, active) ? 'true' : undefined}
                  className={cn(
                    'block border-b border-border py-3 text-[15px] transition-colors',
                    isActive(item.href, active)
                      ? 'text-couleur-burgund-hi'
                      : 'text-foreground-muted hover:text-foreground',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <LinkButton
            href={siteConfig.appUrl}
            target="_blank"
            rel="noreferrer"
            variant="pill"
            tone={isLight ? 'light' : 'dark'}
            className="mt-4"
            onClick={() => setMenuOpen(false)}
          >
            Mitgliederbereich
            <Arrow />
          </LinkButton>
        </nav>
      )}
    </header>
  );
}
