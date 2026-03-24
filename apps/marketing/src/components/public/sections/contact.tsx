'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Instagram, Facebook, MapPin, CheckCircle2 } from 'lucide-react';
import { siteMeta } from '@/content/public-site';
import { contactSchema, type ContactInput } from '@/lib/validations/schemas';
import { cn } from '@teutonia/shared';

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: <Instagram className="h-4 w-4" />,
  Facebook: <Facebook className="h-4 w-4" />,
};

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  function onSubmit(data: ContactInput) {
    const body = encodeURIComponent(
      `Name: ${data.name}\n\nNachricht:\n${data.message}`
    );
    window.location.href = `mailto:${siteMeta.emails.general}?subject=Kontaktanfrage%20von%20${encodeURIComponent(data.name)}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section id="contact" className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          {/* Left: Copy + contact details */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
              Kontakt
            </p>
            <h2 className="font-serif text-4xl font-light italic text-foreground md:text-5xl">
              Schreib uns.
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-muted-foreground">
              Du hast Fragen zum Haus, zur Gemeinschaft oder möchtest einfach vorbeikommen?
              Schreib uns — oder komm direkt vorbei. Wir freuen uns.
            </p>

            {/* Address */}
            <div className="mt-8 flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
              <div className="font-sans text-sm text-muted-foreground">
                {siteMeta.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="mt-4">
              <a
                href={`mailto:${siteMeta.emails.general}`}
                className="font-sans text-sm text-primary underline underline-offset-4 hover:opacity-70"
              >
                {siteMeta.emails.general}
              </a>
            </div>

            {/* Socials */}
            <div className="mt-6 flex gap-3">
              {siteMeta.socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-sans text-sm text-foreground/70 transition-colors hover:border-primary/30 hover:text-foreground"
                >
                  {socialIcons[social.label] ?? null}
                  {social.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card p-10 text-center"
                >
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                  <h3 className="font-serif text-2xl italic text-foreground">
                    Nachricht gesendet.
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground">
                    Dein E-Mail-Programm öffnet sich automatisch. Wir melden uns bald bei dir.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5 rounded-2xl border border-border bg-card p-6 md:p-8"
                >
                  {/* Name */}
                  <div>
                    <label className="mb-1.5 block font-sans text-sm font-medium text-foreground">
                      Name
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="Dein Name"
                      className={cn(
                        'w-full rounded-xl border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/40 focus:ring-2 focus:ring-primary/10',
                        errors.name ? 'border-destructive' : 'border-border'
                      )}
                    />
                    {errors.name && (
                      <p className="mt-1 font-sans text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-1.5 block font-sans text-sm font-medium text-foreground">
                      E-Mail
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="deine@email.de"
                      className={cn(
                        'w-full rounded-xl border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/40 focus:ring-2 focus:ring-primary/10',
                        errors.email ? 'border-destructive' : 'border-border'
                      )}
                    />
                    {errors.email && (
                      <p className="mt-1 font-sans text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-1.5 block font-sans text-sm font-medium text-foreground">
                      Nachricht
                    </label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="Deine Nachricht an uns…"
                      className={cn(
                        'w-full resize-none rounded-xl border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/40 focus:ring-2 focus:ring-primary/10',
                        errors.message ? 'border-destructive' : 'border-border'
                      )}
                    />
                    {errors.message && (
                      <p className="mt-1 font-sans text-xs text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-shimmer w-full rounded-xl bg-primary px-6 py-3.5 font-sans text-sm font-semibold text-primary-foreground transition-opacity disabled:opacity-60"
                  >
                    Nachricht senden
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* CTA below form */}
            <div className="mt-6 text-center">
              <Link
                href="/#contact"
                className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-sans text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Jetzt Mitglied werden →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
