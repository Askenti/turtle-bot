import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal — small hook to fade content in the first time it
 * scrolls into view. Returns [ref, hasRevealed].
 *
 * Attach the ref to any element. When that element first enters the
 * viewport, `hasRevealed` flips to true (and stays true). Pair it with
 * CSS that hides children by default and reveals them when the parent
 * carries `data-revealed="true"`.
 *
 * The observer disconnects as soon as it fires, so there's no scroll-time
 * cost after the section has been seen once.
 */
export function useScrollReveal<T extends HTMLElement>(
  threshold = 0.12
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (revealed) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [revealed, threshold]);

  return [ref, revealed];
}
