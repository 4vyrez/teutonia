'use client';

import { useActionState, useEffect, useRef } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { submitContact, type ContactState } from '@/lib/actions/contact';
import { cn } from '@/lib/utils';

const initialState: ContactState = { status: 'idle' };

const topics: Array<{ value: 'zimmer' | 'schnupperabend' | 'allgemein'; label: string }> = [
  { value: 'zimmer', label: 'Zimmer anfragen' },
  { value: 'schnupperabend', label: 'Schnupperabend' },
  { value: 'allgemein', label: 'Allgemeine Frage' },
];

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState,
  );
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
      className="grid gap-6"
    >
      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field
        label="Thema"
        name="topic"
        error={state.errors?.topic?.[0]}
      >
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Thema">
          {topics.map((t) => (
            <label
              key={t.value}
              className="cursor-pointer"
            >
              <input
                type="radio"
                name="topic"
                value={t.value}
                defaultChecked={t.value === 'zimmer'}
                className="peer sr-only"
              />
              <span className="inline-flex h-10 items-center rounded-md border border-border-strong px-4 text-xs uppercase tracking-[0.18em] text-foreground-muted transition-colors hover:border-couleur-gold-dim hover:text-foreground peer-checked:border-couleur-gold peer-checked:bg-couleur-burgund/15 peer-checked:text-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring">
                {t.label}
              </span>
            </label>
          ))}
        </div>
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          error={state.errors?.name?.[0]}
        >
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            placeholder="Vorname Nachname"
            className="h-11 w-full bg-transparent border-b border-border-strong px-0 text-base text-foreground placeholder:text-foreground-dim focus:border-couleur-gold focus:outline-none"
          />
        </Field>
        <Field
          label="E-Mail"
          name="email"
          error={state.errors?.email?.[0]}
        >
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            placeholder="du@beispiel.de"
            className="h-11 w-full bg-transparent border-b border-border-strong px-0 text-base text-foreground placeholder:text-foreground-dim focus:border-couleur-gold focus:outline-none"
          />
        </Field>
      </div>

      <Field
        label="Deine Nachricht"
        name="message"
        error={state.errors?.message?.[0]}
      >
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          placeholder="Was möchtest du wissen?"
          className="w-full resize-y bg-transparent border-b border-border-strong px-0 py-2 text-base text-foreground placeholder:text-foreground-dim focus:border-couleur-gold focus:outline-none"
        />
      </Field>

      <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-foreground-dim sm:max-w-md">
          Wir antworten meist innerhalb von zwei bis drei Tagen direkt von
          einem Bundesbruder. Deine Daten verwenden wir nur, um zu antworten.
        </p>
        <button
          type="submit"
          disabled={isPending}
          className="group inline-flex h-12 items-center justify-center gap-2 self-end rounded-md bg-couleur-burgund px-8 text-sm font-medium text-primary-foreground shadow-[0_1px_0_oklch(1_0_0/8%)_inset,0_8px_24px_-12px_oklch(0.42_0.16_22/55%)] transition-colors hover:bg-couleur-burgund-hi focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2
                className="h-4 w-4 animate-spin"
                aria-hidden
              />
              Senden…
            </>
          ) : (
            <>
              Nachricht senden
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ label, name, error, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[11px] uppercase tracking-[0.22em] text-couleur-gold-dim"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p
          className={cn(
            'mt-2 text-xs italic text-couleur-burgund-hi',
          )}
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
