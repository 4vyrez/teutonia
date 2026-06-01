'use client';

import { ArrowUpRight, Loader2 } from 'lucide-react';
import { useActionState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { type ContactState, submitContact } from '@/lib/actions/contact';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

const initialState: ContactState = { status: 'idle' };

const topics: Array<{ value: 'zimmer' | 'schnupperabend' | 'allgemein'; label: string }> = [
  { value: 'zimmer', label: 'Zimmer anfragen' },
  { value: 'schnupperabend', label: 'Schnupperabend' },
  { value: 'allgemein', label: 'Allgemeine Frage' },
];

const FIELD_CLASS =
  'h-12 w-full rounded-xl border border-border-strong bg-background px-4 text-sm text-foreground placeholder:text-foreground-dim outline-none transition-colors focus:border-couleur-burgund';

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success') {
      toast.success('Nachricht gesendet', {
        description: state.message,
      });
      formRef.current?.reset();
    }
    if (state.status === 'error' && state.message && !state.errors) {
      toast.error('Fehler', { description: state.message });
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className="reveal reveal-d1 rounded-2xl border border-border bg-background-elev p-9"
    >
      {/* Card header */}
      <div className="flex items-baseline justify-between gap-4">
        <div className="text-[10px] uppercase tracking-[0.26em] text-couleur-burgund">
          Direktanfrage
        </div>
        <div className="text-[11px] text-foreground-dim">Antwort in ≈ 48 Std.</div>
      </div>
      <h3 className="font-display mt-3.5 text-[26px] text-foreground [font-variation-settings:'opsz'_48,'SOFT'_40]">
        Zimmer anfragen
      </h3>

      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Field label="Thema" name="topic" error={state.errors?.topic?.[0]} className="mt-6">
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Thema">
          {topics.map((t) => (
            <label key={t.value} className="cursor-pointer">
              <input
                type="radio"
                name="topic"
                value={t.value}
                defaultChecked={t.value === 'zimmer'}
                className="peer sr-only"
              />
              <span className="inline-flex h-10 items-center rounded-xl border border-border-strong px-4 text-xs uppercase tracking-[0.18em] text-foreground-muted transition-colors hover:border-couleur-gold-dim hover:text-foreground peer-checked:border-couleur-gold peer-checked:bg-couleur-burgund/15 peer-checked:text-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring">
                {t.label}
              </span>
            </label>
          ))}
        </div>
      </Field>

      <Field label="Name" name="name" error={state.errors?.name?.[0]} className="mt-[18px]">
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          required
          minLength={2}
          placeholder="Dein Name"
          className={FIELD_CLASS}
        />
      </Field>

      <div className="mt-[18px] grid gap-3.5 sm:grid-cols-2">
        <Field label="E-Mail" name="email" error={state.errors?.email?.[0]}>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            placeholder="deine@mail.de"
            className={FIELD_CLASS}
          />
        </Field>
        <Field label="Studiengang" name="studiengang">
          <input
            type="text"
            id="studiengang"
            name="studiengang"
            autoComplete="off"
            placeholder="z. B. Maschinenbau"
            className={FIELD_CLASS}
          />
        </Field>
      </div>

      <Field
        label="Nachricht (optional)"
        name="message"
        error={state.errors?.message?.[0]}
        className="mt-[18px]"
      >
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={3}
          placeholder="Wann möchtest du vorbeikommen? Hast du Fragen?"
          className="min-h-[110px] w-full resize-y rounded-xl border border-border-strong bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground-dim outline-none transition-colors focus:border-couleur-burgund"
        />
      </Field>

      <button
        type="submit"
        disabled={isPending}
        className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-couleur-burgund px-8 text-sm font-medium text-primary-foreground shadow-[0_1px_0_oklch(1_0_0/8%)_inset,0_8px_24px_-12px_oklch(0.42_0.16_22/55%)] transition-colors hover:bg-couleur-burgund-hi focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:opacity-60"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Senden…
          </>
        ) : (
          <>
            Anfrage senden
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </>
        )}
      </button>

      <div className="mt-3.5 text-center text-[11px] text-foreground-dim">
        Oder direkt:{' '}
        <a
          href={`mailto:${siteConfig.contact.emails.zimmer}`}
          className="text-couleur-burgund hover:text-couleur-burgund-hi"
        >
          {siteConfig.contact.emails.zimmer}
        </a>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

function Field({ label, name, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-[10px] uppercase tracking-[0.22em] text-foreground-dim"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p className={cn('mt-2 text-xs italic text-couleur-burgund-hi')} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
