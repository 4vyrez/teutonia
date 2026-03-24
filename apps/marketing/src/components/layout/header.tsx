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
  if (href.startsWith('/#')) {
    return false;
  }

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
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6"
    >
      <nav
        className={cn(
          'mx-auto flex w-full max-w-7xl items-center justify-between rounded-[1.6rem] border px-4 py-3 transition-all duration-300 md:px-5',
          isScrolled
            ? 'border-white/80 bg-white/82 shadow-[0_20px_70px_rgba(105,76,45,0.1)] backdrop-blur-xl'
            : 'border-transparent bg-white/55 shadow-[0_10px_40px_rgba(105,76,45,0.08)] backdrop-blur'
        )}
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-12 w-10 overflow-hidden rounded-[0.9rem] border border-[#e2d6c4] bg-white shadow-[0_10px_24px_rgba(98,76,49,0.08)]">
            <Image
              src="/images/Teutonia-wappen.jpg"
              alt="Wappen der Teutonia"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <div className="font-serif text-2xl text-slate-900">Teutonia</div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-primary/75">
              Karlsruhe seit 1843
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {mainNavigation.map((item) =>
            item.children ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-white/70 hover:text-slate-950 focus:outline-none">
                  {item.label}
                  <ChevronDown className="h-4 w-4 text-primary/70" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-[18rem] rounded-[1.2rem] border border-[#e4d8c7] bg-white/94 p-2 shadow-[0_28px_70px_rgba(92,67,43,0.1)]"
                >
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.label} asChild className="rounded-[1rem] px-3 py-3">
                      <Link href={child.href} className="grid gap-1">
                        <span className="font-medium text-slate-900">{child.label}</span>
                        {child.description ? (
                          <span className="text-xs leading-5 text-slate-600">{child.description}</span>
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
                    ? 'bg-primary/8 text-primary'
                    : 'text-slate-700 hover:bg-white/70 hover:text-slate-950'
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
            className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            House Explorer
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="inline-flex rounded-full border border-[#e7dccb] bg-white/75 p-3 text-slate-800 lg:hidden"
          aria-label={isMobileMenuOpen ? 'Navigation schließen' : 'Navigation öffnen'}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-3 w-full max-w-7xl rounded-[1.8rem] border border-white/80 bg-white/92 p-4 shadow-[0_24px_80px_rgba(98,72,46,0.12)] backdrop-blur-xl lg:hidden"
          >
            <div className="grid gap-2">
              {mainNavigation.map((item) =>
                item.children ? (
                  <div key={item.label} className="rounded-[1.2rem] border border-stone-200 bg-stone-50/75 p-3">
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">
                      {item.label}
                    </div>
                    <div className="mt-3 grid gap-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="rounded-[1rem] bg-white/90 px-4 py-3 text-sm font-medium text-slate-800"
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
                    className="rounded-[1.2rem] border border-stone-200 bg-stone-50/70 px-4 py-3 text-sm font-medium text-slate-800"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            <Link
              href="/#house"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-shimmer mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
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
