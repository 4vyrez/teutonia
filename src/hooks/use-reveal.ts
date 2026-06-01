'use client';

/**
 * use-reveal — scroll-reveal primitive for KB! Teutonia.
 *
 * Ports the prototype's `.reveal` behaviour (design_reference/shared.jsx →
 * useScrollReveal) to an IntersectionObserver hook. Elements start hidden
 * (data-rv="off" → opacity 0 + translateY(16px), see .reveal in globals.css)
 * and animate in once they cross into view. Above-the-fold content is never
 * hidden, so the hero paints instantly.
 *
 * prefers-reduced-motion: the hook is a no-op. It never sets data-rv="off",
 * so content is always visible — matching the reduced-motion CSS override.
 *
 * ── API ──────────────────────────────────────────────────────────────────
 *
 * 1) Ref-callback (per element):
 *      const ref = useReveal<HTMLDivElement>();
 *      <div ref={ref} className="reveal reveal-d2">…</div>
 *    Returns a stable ref callback. Attach it to any element that already
 *    carries the `.reveal` (and optional `.reveal-dN`) classes. The hook
 *    arms the element (data-rv="off") on mount and reveals it on intersect.
 *
 * 2) <Reveal> wrapper (ergonomic — renders the element for you):
 *      <Reveal className="…" delay={2}>…</Reveal>          // <div>
 *      <Reveal as="li" className="…" delay={3}>…</Reveal>  // any tag
 *    Props:
 *      - as:        intrinsic tag name (default 'div')
 *      - delay:     1..6 → adds `reveal-dN` stagger class (optional)
 *      - className: merged after the base `reveal` class
 *      - …rest:     forwarded to the rendered element (style, id, etc.)
 *
 * Both share one module-level IntersectionObserver (created lazily, client
 * only) so hundreds of revealed elements cost a single observer.
 */

import {
  type ComponentPropsWithoutRef,
  createElement,
  type ElementType,
  type ReactNode,
  useCallback,
  useRef,
} from 'react';

const PREFERS_REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal a bit before the element's top edge fully enters — matches the
// prototype's `vh * 0.92` trigger line (reveal slightly past the bottom).
const ROOT_MARGIN = '0px 0px -8% 0px';

let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return null;
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.removeAttribute('data-rv');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0.01 },
    );
  }
  return sharedObserver;
}

/**
 * Ref callback that arms an element for scroll-reveal. Stable across renders.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const elementRef = useRef<T | null>(null);

  return useCallback((node: T | null) => {
    // Detach previous node from the observer.
    if (elementRef.current && sharedObserver) {
      sharedObserver.unobserve(elementRef.current);
    }
    elementRef.current = node;
    if (!node || PREFERS_REDUCED) return;

    const observer = getObserver();
    if (!observer) return;

    // Arm: hide until intersection. If it's already on-screen the observer
    // fires immediately on the next frame and removes the attribute again.
    node.setAttribute('data-rv', 'off');
    observer.observe(node);
  }, []);
}

type RevealProps<T extends ElementType> = {
  as?: T;
  /** Stagger step 1..6 → applies the `reveal-dN` delay class. */
  delay?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

/**
 * <Reveal> — renders an element pre-wired for scroll-reveal.
 * Defaults to a <div>; pass `as` for any intrinsic tag.
 */
export function Reveal<T extends ElementType = 'div'>({
  as,
  delay,
  className,
  children,
  ...rest
}: RevealProps<T>) {
  const ref = useReveal<HTMLElement>();
  const Tag = (as ?? 'div') as ElementType;
  const classes = ['reveal', delay ? `reveal-d${delay}` : '', className].filter(Boolean).join(' ');

  return createElement(Tag, { ref, className: classes, ...rest }, children);
}
