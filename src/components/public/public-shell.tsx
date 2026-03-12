'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
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
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(154,56,48,0.12),transparent_34%),radial-gradient(circle_at_top_right,rgba(198,168,117,0.22),transparent_28%),linear-gradient(180deg,#f8f3eb_0%,#f4eee4_38%,#fbf7f0_100%)]" />
        <motion.div
          className="absolute left-[-10%] top-[8rem] h-[28rem] w-[28rem] rounded-full bg-[rgba(198,168,117,0.12)] blur-3xl"
          animate={{ x: [0, 24, 0], y: [0, 18, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[-10%] h-[22rem] w-[22rem] rounded-full bg-[rgba(122,47,43,0.12)] blur-3xl"
          animate={{ x: [0, -28, 0], y: [0, -20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(89,73,57,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(89,73,57,0.05)_1px,transparent_1px)] bg-[size:88px_88px] opacity-40" />
      </div>

      <Header compact={compactHeader} />
      <main className="relative pt-28 md:pt-32">{children}</main>
      <Footer />
    </div>
  );
}
