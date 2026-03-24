'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { mainNavigation } from '@/content/public-site';
import { cn } from '@teutonia/shared';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@teutonia/shared/components/ui/dropdown-menu';

function isActiveLink(pathname: string, href: string) {
  if (href.startsWith('/#')) return false;
  return pathname === href;
}

export function Header({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(compact);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12 || compact);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [compact]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6"
    >
      <nav
        className={cn(
          'mx-auto flex w-full max-w-7xl items-center justify-between rounded-xl border px-4 py-3 transition-all duration-300 md:px-5',
          isScrolled
            ? 'border-border bg-background shadow-sm'
            : 'border-transparent bg-transparent'
        )}
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-8 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <Image
              src="/images/Teutonia-wappen.jpg"
              alt="Wappen der Teutonia"
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <div>
            <div className="font-serif text-xl text-foreground">Teutonia</div>
            <div className="text-[9px] uppercase tracking-[0.24em] text-primary/70">
              Karlsruhe seit 1843
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {mainNavigation.map((item) =>
            item.children ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground focus:outline-none">
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 text-primary/50" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-[17rem] rounded-xl border border-border bg-background p-2 shadow-md"
                >
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.label} asChild className="rounded-lg px-3 py-3">
                      <Link href={child.href} className="grid gap-0.5">
                        <span className="font-medium text-foreground">{child.label}</span>
                        {child.description ? (
                          <span className="text-xs leading-5 text-muted-foreground">{child.description}</span>
                        ) : null}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  isActiveLink(pathname, item.href)
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/#house"
            className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
          >
            House Explorer
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="inline-flex rounded-lg border border-border bg-card p-2.5 text-foreground lg:hidden"
          aria-label={isMobileMenuOpen ? 'Navigation schließen' : 'Navigation öffnen'}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 w-full max-w-7xl rounded-xl border border-border bg-background p-3 shadow-md lg:hidden"
          >
            <div className="grid gap-1">
              {mainNavigation.map((item) =>
                item.children ? (
                  <div key={item.label} className="rounded-lg border border-border bg-muted/40 p-3">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                      {item.label}
                    </div>
                    <div className="grid gap-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="rounded-lg bg-card px-3 py-2.5 text-sm font-medium text-foreground"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted/40"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            <Link
              href="/#house"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-shimmer mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              House Explorer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
