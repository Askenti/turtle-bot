import { useEffect, useState, useCallback } from 'react';

interface Floor {
  id: string;
  label: string;
  name: string;
}

const floors: Floor[] = [
  { id: 'hero', label: 'L', name: 'LOBBY' },
  { id: 'problem', label: '1', name: 'FLR 1' },
  { id: 'solution', label: '2', name: 'FLR 2' },
  { id: 'team', label: 'R', name: 'RCPTN' },
  { id: 'market', label: '4', name: 'FLR 4' },
  { id: 'marketing', label: '5', name: 'FLR 5' },
  { id: 'roadmap', label: '★', name: 'FUTURE' },
];

export default function FloorPanel() {
  const [activeFloor, setActiveFloor] = useState('hero');
  const [visible, setVisible] = useState(false);

  const navigateFloor = useCallback((floorId: string) => {
    const navigate = (window as unknown as Record<string, unknown>).elevatorNavigate as ((id: string) => void) | undefined;
    if (navigate) {
      navigate(floorId);
    } else {
      // Fallback: smooth scroll
      const el = document.getElementById(floorId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    // Show panel after initial load
    const timer = setTimeout(() => setVisible(true), 1000);

    const observers: IntersectionObserver[] = [];

    floors.forEach((floor) => {
      const el = document.getElementById(floor.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveFloor(floor.id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      clearTimeout(timer);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const activeFloorName = floors.find((f) => f.id === activeFloor)?.name || 'LOBBY';

  return (
    <div
      className={`
        fixed right-6 top-1/2 -translate-y-1/2 z-40
        bg-[#082C30] p-4 rounded-3xl
        flex flex-col gap-4 items-center
        shadow-[0_15px_35px_rgba(0,0,0,0.5)] border-2 border-[#166E78]/40
        transition-all duration-500
        ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-80'}
        hidden md:flex
      `}
    >
      {/* Elevator Digital Display Screen */}
      <div className="flex flex-col items-center">
        <span className="text-[8px] uppercase tracking-[0.2em] text-[#00F0FF]/60 font-bold font-mono text-center mb-1">
          Floor
        </span>
        <div className="w-[54px] h-[26px] bg-[#031517] border border-[#00F0FF]/25 rounded flex items-center justify-center font-mono text-[10px] text-[#00F0FF] font-semibold tracking-widest shadow-[inset_0_0_6px_rgba(0,240,255,0.25)] select-none">
          {activeFloorName}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 items-center mt-2">
        {floors.map((floor, index) => (
          <div key={floor.id} className="flex flex-col items-center gap-3">
            {index > 0 && <div className="w-[2px] h-[8px] bg-[#0d3b41]" />}
            <button
              onClick={() => navigateFloor(floor.id)}
              className={`floor-button ${activeFloor === floor.id ? 'active' : ''}`}
              aria-label={`Navigate to floor ${floor.label}`}
            >
              {floor.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
