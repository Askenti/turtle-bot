import { useCallback, useRef } from 'react';

interface MagneticProps {
  children: React.ReactNode;
  /** Maximum pixel offset toward the cursor */
  strength?: number;
  /** className passed through to the wrapper */
  className?: string;
}

/**
 * Magnetic — wraps any child element and nudges it toward the cursor while
 * the mouse hovers within its bounding box. Writes directly to the element's
 * transform via ref (no React re-renders), GPU-composited, with a 220ms
 * ease-out spring back on leave.
 *
 * Disabled on touch / coarse pointers and when prefers-reduced-motion is set.
 */
export default function Magnetic({
  children,
  strength = 14,
  className = '',
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      const dx = Math.max(-1, Math.min(1, x)) * strength;
      const dy = Math.max(-1, Math.min(1, y)) * strength;
      el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
  }, []);

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block will-change-transform transition-transform duration-220 ease-spring ${className}`}
    >
      {children}
    </span>
  );
}
