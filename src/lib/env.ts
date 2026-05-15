import { z } from 'zod';

const PublicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default('http://localhost:3000'),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url()
    .default('https://teutonia-app.vercel.app'),
});

const ServerEnvSchema = z.object({
  RESEND_API_KEY: z.string().optional(),
  CONTACT_TO_EMAIL: z.string().email().default('zimmer@kbteutonia.de'),
  CONTACT_FROM_EMAIL: z
    .string()
    .email()
    .default('website@kbteutonia.de'),
});

const publicEnvResult = PublicEnvSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

if (!publicEnvResult.success) {
  console.error('Invalid public env:', publicEnvResult.error.flatten().fieldErrors);
  throw new Error('Invalid public environment variables');
}

export const publicEnv = publicEnvResult.data;

export function getServerEnv() {
  const result = ServerEnvSchema.safeParse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  });
  if (!result.success) {
    console.error('Invalid server env:', result.error.flatten().fieldErrors);
    throw new Error('Invalid server environment variables');
  }
  return result.data;
}
