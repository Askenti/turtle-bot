import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_·—';

interface ScrambleTextProps {
  text: string;
  trigger?: boolean;
  className?: string;
  duration?: number;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
}

export default function ScrambleText({
  text,
  trigger = true,
  className,
  duration = 900,
  as: Tag = 'span',
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;

    startRef.current = null;

    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      const revealed = Math.floor(progress * text.length);

      const scrambled = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < revealed) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplay(scrambled);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, text, duration]);

  return <Tag className={className}>{display}</Tag>;
}
