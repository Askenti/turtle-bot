import { useEffect, useRef, useState } from 'react';

/**
 * CountUp — animates a numeric value from 0 to `to` once the element scrolls
 * into view. Pure rAF, no React state updates during the tween (writes directly
 * to a ref'd span) so it stays smooth even when the page is heavy.
 *
 * Honors prefers-reduced-motion by jumping straight to the final value.
 */
interface CountUpProps {
  to: number;
  /** Number of decimal places to show */
  decimals?: number;
  /** Prefix (e.g. "↑ ") */
  prefix?: string;
  /** Suffix (e.g. "%" or "k") */
  suffix?: string;
  /** Animation duration in ms */
  duration?: number;
  /** Whether to format integers with thousands separators */
  separator?: boolean;
}

export default function CountUp({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1600,
  separator = true,
}: CountUpProps) {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [started, setStarted] = useState(false);

  // Pre-format the final value so SSR / first paint reads the right number
  const formatted = (value: number) => {
    const fixed = value.toFixed(decimals);
    if (!separator) return `${prefix}${fixed}${suffix}`;
    const [int, dec] = fixed.split('.');
    const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${prefix}${dec ? `${grouped}.${dec}` : grouped}${suffix}`;
  };

  useEffect(() => {
    const el = spanRef.current;
    if (!el || started) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      // Fire as soon as any sliver enters the viewport; rootMargin pre-triggers
      // slightly before the element scrolls into view for a more natural feel.
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const el = spanRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.textContent = formatted(to);
      return;
    }

    const start = performance.now();
    let raf = 0;

    // ease-out-cubic — feels premium for marketing reveal
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = formatted(to * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, to, duration]);

  return <span ref={spanRef}>{formatted(started ? to : 0)}</span>;
}
