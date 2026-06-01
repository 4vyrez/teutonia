'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Eyebrow, Section } from '@/components/primitives/section';

/**
 * Semester — Live-Veranstaltungskalender (iCal).
 *
 * Rendert die Fallback-Termine sofort (kein Leer-/Loading-Zustand) und
 * versucht im Client-Effekt, den Live-iCal-Feed nachzuladen (mit CORS-Proxy-
 * Fallbacks). Schlägt das fehl, bleibt die Fallback-Liste stehen.
 * Port von design_reference/home-bottom.jsx → Semester().
 */

const FEED =
  'https://teutonia-app.vercel.app/events/feed/oh0fQHfx01kPS9_tWN3QDKqR-u7UmlBG6KbXOEeqjkI/events';

const MONTHS = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
const WDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

// Abgestimmte Fallback-Daten (iCal) — werden sofort gerendert.
const SEM_FALLBACK = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nUID:6a5924d9@teutonia.app\r\nDTSTART:20260521T000000Z\r\nDTEND:20260525T000000Z\r\nSUMMARY:165. Stiftungsfest Braunschweiger B! Germania\r\nLOCATION:Burschenschaft Germania\\, Braunschweig\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nUID:ca43ac10@teutonia.app\r\nDTSTART:20260529T000000Z\r\nDTEND:20260601T000000Z\r\nSUMMARY:Fechtwochenende & Aktivenkneipe\r\nLOCATION:Karlsruher Burschenschaft Teutonia\\, Parkstraße 1\\, Karlsruhe\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nUID:993de456@teutonia.app\r\nDTSTART:20260601T171500Z\r\nDTEND:20260601T211500Z\r\nSUMMARY:Convente\r\nLOCATION:Karlsruher Burschenschaft Teutonia\\, Parkstraße 1\\, Karlsruhe\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nUID:d5095ceb@teutonia.app\r\nDTSTART:20260606T000000Z\r\nDTEND:20260607T000000Z\r\nSUMMARY:Regionalveranstaltung Süd der ADB\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nUID:5da59968@teutonia.app\r\nDTSTART:20260606T000000Z\r\nDTEND:20260607T000000Z\r\nSUMMARY:1. KFR M-Tag & Kniggeseminar\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nUID:df36d61d@teutonia.app\r\nDTSTART:20260618T000000Z\r\nDTEND:20260622T000000Z\r\nSUMMARY:Teutonentour\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nUID:f5e5f4e6@teutonia.app\r\nDTSTART:20260626T000000Z\r\nDTEND:20260629T000000Z\r\nSUMMARY:175. Stiftungsfest Freiburger B! Teutonia\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nUID:13060266@teutonia.app\r\nDTSTART:20260629T171500Z\r\nDTEND:20260629T211500Z\r\nSUMMARY:Wahlconvente\r\nLOCATION:Karlsruher Burschenschaft Teutonia\\, Parkstraße 1\\, Karlsruhe\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nUID:443079dc@teutonia.app\r\nDTSTART:20260703T000000Z\r\nDTEND:20260706T000000Z\r\nSUMMARY:Seminartagung der ADB\r\nLOCATION:Burschenschaft Germania\\, Braunschweig\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nUID:ea7b3d77@teutonia.app\r\nDTSTART:20260707T170000Z\r\nDTEND:20260707T190000Z\r\nSUMMARY:Burschenschaftlicher Abend mit Bbr. Kramer\r\nLOCATION:Karlsruher Burschenschaft Teutonia\\, Parkstraße 1\\, Karlsruhe\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nUID:8350cb33@teutonia.app\r\nDTSTART:20260718T000000Z\r\nDTEND:20260719T000000Z\r\nSUMMARY:2. KFR M-Tag & Väter-Gäste-Kneipe\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nUID:c9b117ea@teutonia.app\r\nDTSTART:20260727T171500Z\r\nDTEND:20260727T211500Z\r\nSUMMARY:Convente\r\nLOCATION:Karlsruher Burschenschaft Teutonia\\, Parkstraße 1\\, Karlsruhe\r\nEND:VEVENT\r\nEND:VCALENDAR`;

type RawEvent = Record<string, string>;

type SemEvent = {
  uid: string;
  title: string;
  start: Date;
  end: Date | null;
  dispEnd: Date | null;
  isAllDay: boolean;
  isHome: boolean;
  loc: string;
  durDays: number;
  isMultiDay: boolean;
};

function parseDate(str: string): Date | null {
  if (!str) return null;
  const y = +str.slice(0, 4);
  const m = +str.slice(4, 6) - 1;
  const d = +str.slice(6, 8);
  if (!str.includes('T')) return new Date(y, m, d);
  return new Date(y, m, d, +str.slice(9, 11), +str.slice(11, 13));
}

function parseIcal(text: string): RawEvent[] {
  const lines = text.replace(/\r?\n[ \t]/g, '').split(/\r?\n/);
  const evts: RawEvent[] = [];
  let cur: RawEvent | null = null;
  for (const ln of lines) {
    if (ln === 'BEGIN:VEVENT') {
      cur = {};
    } else if (ln === 'END:VEVENT') {
      if (cur) evts.push(cur);
      cur = null;
    } else if (cur) {
      const ci = ln.indexOf(':');
      if (ci < 0) continue;
      const key = ln.slice(0, ci).split(';')[0];
      if (key) cur[key] = ln.slice(ci + 1);
    }
  }
  return evts;
}

function process(raw: RawEvent[]): SemEvent[] {
  const now = new Date();
  return raw
    .map((e): SemEvent => {
      const start = parseDate(e.DTSTART || '');
      const end = parseDate(e.DTEND || '');
      const isAllDay = !(e.DTSTART || '').includes('T');
      const loc = (e.LOCATION || '').replace(/\\,/g, ',').replace(/\\n/g, ' ').trim();
      const isHome = /Parkstraße|Teutonia.*Karlsruhe/.test(loc);
      const durDays = end && isAllDay && start ? Math.round((+end - +start) / 864e5) : 0;
      const dispEnd = isAllDay && durDays > 1 && end ? new Date(+end - 864e5) : end;
      return {
        uid: e.UID || (e.SUMMARY ?? ''),
        title: (e.SUMMARY || '').trim(),
        start: start as Date,
        end,
        dispEnd,
        isAllDay,
        isHome,
        loc,
        durDays,
        isMultiDay: isAllDay && durDays > 1,
      };
    })
    .filter((e) => e.start && (e.end ? e.end > now : e.start >= now))
    .filter((e) => !/convente/i.test(e.title))
    .sort((a, b) => +a.start - +b.start)
    .slice(0, 9);
}

function timeLabel(ev: SemEvent, isOng: boolean): string {
  if (isOng) return 'Läuft noch';
  if (ev.isMultiDay && ev.dispEnd) {
    const sd = ev.start.getDate();
    const sm = MONTHS[ev.start.getMonth()];
    const ed = ev.dispEnd.getDate();
    const em = MONTHS[ev.dispEnd.getMonth()];
    return ev.start.getMonth() === ev.dispEnd.getMonth()
      ? `${sd}. – ${ed}. ${em}`
      : `${sd}. ${sm} – ${ed}. ${em}`;
  }
  if (ev.isAllDay) return 'Ganztägig';
  const f = (d: Date) => d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  return ev.end ? `${f(ev.start)} – ${f(ev.end)} Uhr` : f(ev.start);
}

export function Semester() {
  const [items, setItems] = useState<SemEvent[]>(() => process(parseIcal(SEM_FALLBACK)));
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const tryFetch = async (url: string, asJson: boolean): Promise<string | undefined> => {
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 6000);
        try {
          const r = await fetch(url, { signal: ctrl.signal });
          if (asJson) {
            const d = (await r.json()) as { contents?: string };
            return d.contents;
          }
          return await r.text();
        } finally {
          clearTimeout(tid);
        }
      };
      const ok = (t: string | undefined): t is string =>
        typeof t === 'string' && t.includes('VCALENDAR');

      try {
        let text: string | undefined;
        try {
          text = await tryFetch(FEED, false);
        } catch {}
        if (!ok(text)) {
          try {
            text = await tryFetch(`https://corsproxy.io/?url=${encodeURIComponent(FEED)}`, false);
          } catch {}
        }
        if (!ok(text)) {
          try {
            text = await tryFetch(
              `https://api.allorigins.win/get?url=${encodeURIComponent(FEED)}`,
              true,
            );
          } catch {}
        }
        if (ok(text) && !cancelled) {
          const next = process(parseIcal(text));
          if (next.length) {
            setItems(next);
            setIsLive(true);
          }
        }
      } catch {
        /* Fallback bleibt stehen */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Section id="semester" theme="light" className="border-y border-border bg-background-veil">
      {/* Header */}
      <div className="reveal max-w-[680px]">
        <Eyebrow>06 — Semesterprogramm</Eyebrow>
        <h2 className="font-display mt-7 text-balance text-[clamp(2rem,4.6vw,3.5rem)] font-light leading-[1.05] text-foreground [font-variation-settings:'opsz'_72,'SOFT'_50]">
          Was wir in diesem <span className="italic-gold">Semester</span> tatsächlich tun.
        </h2>
        <p className="mt-6 max-w-[560px] text-pretty text-base leading-relaxed text-foreground-muted">
          Direkt aus dem Veranstaltungskalender — alle anstehenden Termine auf einen Blick.
        </p>
      </div>

      {/* Two-column: live list + editorial photo */}
      <div className="reveal reveal-d1 mt-14 grid items-stretch gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        {/* Live event list */}
        <div className="flex flex-col overflow-hidden rounded-[22px] border border-border-strong bg-background shadow-[0_8px_40px_-20px_oklch(0.18_0.006_265_/_14%)]">
          {/* List header bar */}
          <div className="flex items-center gap-2.5 border-b border-border bg-background-veil px-[22px] py-[13px]">
            <span
              aria-hidden
              className="inline-block h-[7px] w-[7px] flex-shrink-0 rounded-full transition-all duration-300"
              style={{
                background: isLive ? 'var(--couleur-burgund)' : 'var(--foreground-dim)',
                boxShadow: isLive ? '0 0 7px oklch(0.46 0.165 22 / 70%)' : 'none',
              }}
            />
            <span className="text-[10px] uppercase tracking-[0.24em] text-foreground-muted">
              Anstehende Termine
            </span>
            <span className="ml-auto text-[10px] text-foreground-dim">{items.length} Termine</span>
          </div>

          {/* Rows */}
          {items.map((ev, i) => {
            const now = new Date();
            const isOng = !!ev.end && ev.start <= now && ev.end > now;
            const isLast = i === items.length - 1;
            const day = ev.start.getDate();
            const mon = MONTHS[ev.start.getMonth()];
            const wd = WDAYS[ev.start.getDay()];
            const badge = isOng ? 'Jetzt' : ev.isHome ? 'Heim' : 'Auswärts';

            return (
              <div
                key={ev.uid}
                className="flex items-center gap-[18px] px-[22px] py-[17px] transition-colors"
                style={{
                  borderBottom: isLast ? 'none' : '1px solid var(--border)',
                  background: isOng ? 'oklch(0.46 0.165 22 / 4%)' : 'transparent',
                }}
              >
                {/* Round date circle */}
                <div
                  className="flex h-[52px] w-[52px] flex-shrink-0 flex-col items-center justify-center rounded-full transition-all"
                  style={{
                    background: isOng ? 'var(--couleur-burgund)' : 'var(--background-elev)',
                    border: isOng ? 'none' : '1px solid var(--border)',
                    boxShadow: isOng ? '0 2px 12px oklch(0.46 0.165 22 / 30%)' : 'none',
                  }}
                >
                  <span
                    className="font-display text-[19px] leading-none tracking-[-0.02em] [font-variation-settings:'opsz'_36,'SOFT'_20]"
                    style={{ color: isOng ? '#fff' : 'var(--foreground)' }}
                  >
                    {day}
                  </span>
                  <span
                    className="mt-0.5 text-[8px] uppercase tracking-[0.14em]"
                    style={{ color: isOng ? 'oklch(1 0 0 / 65%)' : 'var(--foreground-dim)' }}
                  >
                    {mon}
                  </span>
                </div>

                {/* Title + time */}
                <div className="min-w-0 flex-1">
                  <div className="font-display truncate text-[15.5px] leading-[1.25] text-foreground [font-variation-settings:'opsz'_36,'SOFT'_40]">
                    {ev.title}
                  </div>
                  <div className="mt-[5px] flex items-center gap-1.5 text-[11.5px] text-foreground-dim">
                    <span>{wd}</span>
                    <span
                      aria-hidden
                      className="inline-block h-[3px] w-[3px] flex-shrink-0 rounded-full bg-foreground-dim"
                    />
                    <span>{timeLabel(ev, isOng)}</span>
                  </div>
                </div>

                {/* Pill badge */}
                <div
                  className="flex-shrink-0 rounded-full px-[13px] py-1 text-[9.5px] uppercase tracking-[0.18em] transition-all"
                  style={{
                    border: isOng
                      ? '1px solid oklch(0.46 0.165 22 / 50%)'
                      : ev.isHome
                        ? '1px solid oklch(0.46 0.165 22 / 28%)'
                        : '1px solid var(--border)',
                    background: isOng
                      ? 'oklch(0.46 0.165 22 / 12%)'
                      : ev.isHome
                        ? 'oklch(0.46 0.165 22 / 7%)'
                        : 'transparent',
                    color: isOng || ev.isHome ? 'var(--couleur-burgund)' : 'var(--foreground-dim)',
                  }}
                >
                  {badge}
                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial photo */}
        <figure className="relative hidden overflow-hidden rounded-[22px] border border-border-strong lg:block">
          <Image
            src="/haus/haus-leben.jpeg"
            alt="Kneipsaal der KB! Teutonia mit gedeckten Tischen, Kerzen und Liederbüchern"
            fill
            sizes="(min-width: 1024px) 32vw, 100vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(40,20,15,0.08)_0%,_rgba(20,15,12,0.68)_100%)]"
          />
          <div className="grain absolute inset-0" />
          <figcaption className="absolute inset-x-0 bottom-0 px-7 pb-8 pt-7">
            <div className="text-[9px] uppercase tracking-[0.3em] text-couleur-burgund">Tafel 03</div>
            <div className="font-display mt-2.5 text-[22px] italic [font-variation-settings:'opsz'_48] text-[oklch(0.96_0.003_265)]">
              Vor der Kneipe.
            </div>
            <p className="mt-1.5 text-[12px] leading-[1.55] text-[oklch(0.76_0.004_265)]">
              Liederbücher auf den Tischen, Kerzen schon an.
            </p>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
