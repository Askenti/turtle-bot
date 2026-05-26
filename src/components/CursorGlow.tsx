import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -400, y: -400 });
  const curr = useRef({ x: -400, y: -400 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    let rafId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      curr.current.x = lerp(curr.current.x, pos.current.x, 0.08);
      curr.current.y = lerp(curr.current.y, pos.current.y, 0.08);
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${curr.current.x - 200}px, ${curr.current.y - 200}px)`;
      }
    };
    tick();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,168,122,0.07) 0%, transparent 70%)',
        zIndex: 9998,
        willChange: 'transform',
      }}
    />
  );
}
