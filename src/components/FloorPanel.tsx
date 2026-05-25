import { useEffect, useState } from 'react';
import { FLOORS, navigateToFloor } from '../data/floors';

export default function FloorPanel() {
  const [activeFloor, setActiveFloor] = useState('hero');
  const [visible, setVisible] = useState(false);

  // Reveal after the initial page-loader exits
  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 1000);
    return () => window.clearTimeout(t);
  }, []);

  // ── Active-floor tracking ──
  // Single IntersectionObserver watching every floor at once. When several
  // sections are visible at the same time we pick the one with the largest
  // intersectionRatio — that's the section the user is actually looking at.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let bestId: string | null = null;
        let bestRatio = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestId = entry.target.id;
          }
        });
        if (bestId) setActiveFloor(bestId);
      },
      { threshold: [0.3, 0.5, 0.7] }
    );

    FLOORS.forEach((floor) => {
      const el = document.getElementById(floor.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const activeFloorName =
    FLOORS.find((f) => f.id === activeFloor)?.name ?? 'LOBBY';

  return (
    <div
      className={`
        fixed right-5 top-1/2 -translate-y-1/2 z-40
        bg-spectra-pearl/90 backdrop-blur-md p-3 rounded-3xl
        flex-col gap-3 items-center
        shadow-[0_20px_50px_-15px_rgba(10,14,18,0.25),0_6px_15px_-5px_rgba(10,14,18,0.10)]
        border border-spectra-hairline
        transition-all duration-500
        ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
        hidden md:flex
      `}
    >
      {/* Elevator digital display */}
      <div className="flex flex-col items-center pt-1">
        <span className="text-[8px] uppercase tracking-[0.3em] text-spectra-ink-faint font-mono text-center mb-1.5">
          Floor
        </span>
        <div className="w-[58px] h-[24px] bg-spectra-ink rounded-md flex items-center justify-center
                        font-mono text-[10px] text-spectra-cream font-medium tracking-[0.15em]
                        shadow-[inset_0_1px_2px_rgba(255,255,255,0.06)] select-none">
          {activeFloorName}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-spectra-hairline mt-1" />

      {/* Floor buttons */}
      <div className="flex flex-col gap-2 items-center">
        {FLOORS.map((floor) => {
          const isActive = activeFloor === floor.id;
          return (
            <button
              key={floor.id}
              onClick={() => navigateToFloor(floor.id)}
              className={`
                w-9 h-9 rounded-full flex items-center justify-center
                font-mono text-[10px] tracking-tight
                transition-all duration-300
                ${isActive
                  ? 'bg-spectra-ink text-spectra-cream shadow-[0_4px_10px_-2px_rgba(10,14,18,0.35)]'
                  : 'text-spectra-ink-mute hover:bg-spectra-ink/8 hover:text-spectra-ink'
                }
              `}
              aria-label={`Navigate to ${floor.description}`}
              aria-current={isActive ? 'true' : undefined}
            >
              {floor.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
