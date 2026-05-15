import { routes, type VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  framework: 'nextjs',
  buildCommand: 'pnpm build',
  installCommand: 'pnpm install',
  headers: [
    routes.cacheControl('/_next/static/(.*)', {
      public: true,
      maxAge: '1 year',
      immutable: true,
    }),
    routes.cacheControl('/brand/(.*)', {
      public: true,
      maxAge: '7 days',
    }),
    routes.cacheControl('/haus/(.*)', {
      public: true,
      maxAge: '7 days',
    }),
  ],
};

export default config;
