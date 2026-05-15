'use server';

import 'server-only';
import { z } from 'zod';
import { Resend } from 'resend';
import { getServerEnv } from '@/lib/env';
import { ContactEmail } from '@/lib/email/contact-email';

const ContactSchema = z.object({
  name: z.string().min(2, 'Bitte vollständigen Namen angeben').max(120),
  email: z.email('Ungültige E-Mail-Adresse'),
  topic: z.enum(['zimmer', 'schnupperabend', 'allgemein'], {
    error: () => 'Bitte ein Thema wählen',
  }),
  message: z
    .string()
    .min(10, 'Etwas mehr Kontext bitte — mindestens 10 Zeichen')
    .max(4000, 'Maximal 4000 Zeichen'),
  // Honeypot — must remain empty
  website: z.string().max(0).optional().default(''),
});

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: Partial<Record<keyof z.infer<typeof ContactSchema>, string[]>>;
};

const topicLabels: Record<string, string> = {
  zimmer: 'Zimmer-Anfrage',
  schnupperabend: 'Schnupperabend',
  allgemein: 'Allgemeine Anfrage',
};

const rateLimitStore = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60_000;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const last = rateLimitStore.get(key) ?? 0;
  if (now - last < RATE_LIMIT_WINDOW_MS) {
    return false;
  }
  rateLimitStore.set(key, now);
  // Cheap cleanup
  if (rateLimitStore.size > 200) {
    for (const [k, t] of rateLimitStore) {
      if (now - t > RATE_LIMIT_WINDOW_MS * 5) {
        rateLimitStore.delete(k);
      }
    }
  }
  return true;
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    topic: String(formData.get('topic') ?? 'allgemein'),
    message: String(formData.get('message') ?? ''),
    website: String(formData.get('website') ?? ''),
  };

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Bitte überprüfe deine Eingaben.',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // Honeypot triggered → silently succeed (pretend OK)
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { status: 'success', message: 'Danke — wir melden uns.' };
  }

  // Rate-limit by email
  if (!checkRateLimit(parsed.data.email.toLowerCase())) {
    return {
      status: 'error',
      message:
        'Bitte warte einen Moment, bevor du eine weitere Anfrage absendest.',
    };
  }

  const env = getServerEnv();
  const topicLabel = topicLabels[parsed.data.topic] ?? 'Anfrage';

  if (!env.RESEND_API_KEY) {
    // In dev without API key — log and pretend success
    console.info('[contact] No RESEND_API_KEY set — would have sent:', {
      ...parsed.data,
      topicLabel,
    });
    return {
      status: 'success',
      message:
        'Danke — wir haben deine Nachricht erhalten und melden uns bald.',
    };
  }

  try {
    const resend = new Resend(env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: `KB! Teutonia Website <${env.CONTACT_FROM_EMAIL}>`,
      to: [env.CONTACT_TO_EMAIL],
      replyTo: parsed.data.email,
      subject: `[Website] ${topicLabel} — ${parsed.data.name}`,
      react: ContactEmail({
        name: parsed.data.name,
        email: parsed.data.email,
        topic: topicLabel,
        message: parsed.data.message,
        receivedAt: new Date().toLocaleString('de-DE', {
          timeZone: 'Europe/Berlin',
        }),
      }),
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return {
        status: 'error',
        message:
          'Senden hat leider nicht geklappt. Bitte direkt an zimmer@kbteutonia.de schreiben.',
      };
    }

    return {
      status: 'success',
      message:
        'Danke — wir haben deine Nachricht erhalten und melden uns bald.',
    };
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return {
      status: 'error',
      message:
        'Etwas lief schief. Bitte direkt an zimmer@kbteutonia.de schreiben.',
    };
  }
}
