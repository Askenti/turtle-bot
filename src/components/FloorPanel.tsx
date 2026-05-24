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
        fixed right-6 top-1/2 -translate-y-1/2 z-40
        bg-[#082C30] p-4 rounded-3xl
        flex-col gap-4 items-center
        shadow-[0_15px_35px_rgba(0,0,0,0.5)] border-2 border-[#166E78]/40
        transition-all duration-500
        ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-80'}
        hidden md:flex
      `}
    >
      {/* Elevator digital display */}
      <div className="flex flex-col items-center">
        <span className="text-[8px] uppercase tracking-[0.2em] text-[#00F0FF]/60 font-bold font-mono text-center mb-1">
          Floor
        </span>
        <div className="w-[54px] h-[26px] bg-[#031517] border border-[#00F0FF]/25 rounded flex items-center justify-center font-mono text-[10px] text-[#00F0FF] font-semibold tracking-widest shadow-[inset_0_0_6px_rgba(0,240,255,0.25)] select-none">
          {activeFloorName}
        </div>
      </div>

      {/* Floor buttons */}
      <div className="flex flex-col gap-3 items-center mt-2">
        {FLOORS.map((floor, index) => (
          <div key={floor.id} className="flex flex-col items-center gap-3">
            {index > 0 && <div className="w-[2px] h-[8px] bg-[#0d3b41]" />}
            <button
              onClick={() => navigateToFloor(floor.id)}
              className={`floor-button ${activeFloor === floor.id ? 'active' : ''}`}
              aria-label={`Navigate to ${floor.description}`}
              aria-current={activeFloor === floor.id ? 'true' : undefined}
            >
              {floor.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
