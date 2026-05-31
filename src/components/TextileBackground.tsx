import { useEffect, useRef } from 'react';

/**
 * TextileBackground — a barely-visible silk/cloth layer that lives behind every
 * section, slowly drifts on its own, and parallaxes gently toward the cursor.
 *
 * Implementation notes:
 *  · Cursor is tracked on window mousemove (passive). The normalized −1..1
 *    position is written to CSS variables --mx/--my on the element itself,
 *    and CSS handles the actual transform — that way we never trigger a React
 *    re-render mid-frame.
 *  · A 600ms ease-out transition smooths the follow, so the layer "drifts"
 *    toward the cursor instead of snapping. Feels alive, never jittery.
 *  · `pointer-events: none` so it never intercepts clicks.
 *  · Disabled when prefers-reduced-motion or coarse pointer (touch).
 */
export default function TextileBackground() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    // Write the transform directly (instead of via custom-property + calc())
    // so it can never be dropped by an untyped-token cascade quirk.
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth)  * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      const dx = (x * 18).toFixed(2);
      const dy = (y * 12).toFixed(2);
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return <div ref={ref} className="textile-layer" aria-hidden="true" />;
}
