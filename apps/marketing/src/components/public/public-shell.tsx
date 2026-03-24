'use client';

import { ReactNode } from 'react';
import { Header, Footer } from '@/components/layout';

export function PublicShell({
  children,
  compactHeader = false,
}: {
  children: ReactNode;
  compactHeader?: boolean;
}) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Header compact={compactHeader} />
      <main className="relative pt-28 md:pt-32">{children}</main>
      <Footer />
    </div>
  );
}
