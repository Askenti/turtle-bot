import { useEffect, useRef } from 'react';

interface Milestone {
  year: string;
  chapter: string;
  title: string;
  description: string;
  status: string;
  /** 1 = dimmest (present), 4 = brightest (future horizon) */
  intensity: 1 | 2 | 3 | 4;
}

const milestones: Milestone[] = [
  {
    year: '2026',
    chapter: 'Chapter I',
    title: 'Pilot Deployment',
    description: '2–5 partner hotels in Incheon. Multi-sensor calibration. Continuous data refinement.',
    status: 'In Progress',
    intensity: 1,
  },
  {
    year: '2027',
    chapter: 'Chapter II',
    title: 'Commercial Scaling',
    description: 'Hotel-chain rollout. PMS and booking-system integrations. Multi-tenant dashboard.',
    status: 'Planned',
    intensity: 2,
  },
  {
    year: '2028',
    chapter: 'Chapter III',
    title: 'Smart Hotel Network',
    description: 'Platform partnerships. WARDEN Verified standard. Predictive hotel analytics.',
    status: 'Strategic',
    intensity: 3,
  },
  {
    year: '2029+',
    chapter: 'Beyond',
    title: 'Cross-Industry Expansion',
    description: 'Public institutions. Education. Healthcare. The autonomous guardian, everywhere.',
    status: 'Visionary',
    intensity: 4,
  },
];

/** Tailwind classes scaled by milestone intensity */
const intensityStyle = {
  1: {
    card:    'border-warden-cyan/15 bg-warden-teal-deep/60',
    year:    'text-warden-cyan-soft/60',
    glow:    'shadow-[0_0_15px_rgba(0,240,255,0.10)]',
    dot:     'bg-warden-cyan-dim shadow-[0_0_8px_rgba(26,139,148,0.6)]',
    chapter: 'text-warden-cyan-dim',
  },
  2: {
    card:    'border-warden-cyan/25 bg-warden-teal-deep/70',
    year:    'text-warden-cyan-soft/80',
    glow:    'shadow-[0_0_25px_rgba(0,240,255,0.18)]',
    dot:     'bg-warden-cyan-soft shadow-[0_0_10px_rgba(61,217,230,0.7)]',
    chapter: 'text-warden-cyan-soft',
  },
  3: {
    card:    'border-warden-cyan/45 bg-warden-teal-dark/80',
    year:    'text-warden-cyan',
    glow:    'shadow-[0_0_35px_rgba(0,240,255,0.28)]',
    dot:     'bg-warden-cyan shadow-[0_0_14px_rgba(0,240,255,0.85)]',
    chapter: 'text-warden-cyan',
  },
  4: {
    card:    'border-warden-cyan/70 bg-gradient-to-br from-warden-teal-dark/80 to-warden-cyan/10',
    year:    'text-warden-cyan text-cyan-glow',
    glow:    'shadow-[0_0_55px_rgba(0,240,255,0.45)]',
    dot:     'bg-warden-cyan shadow-[0_0_20px_rgba(0,240,255,1)] animate-pulse',
    chapter: 'text-warden-cyan text-cyan-glow',
  },
} as const;

export default function RoadmapSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = section.querySelectorAll('.animate-subtitle, .animate-flipcard, .animate-content, .stagger-card');
            els.forEach((el) => el.classList.add('revealed'));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      className="relative min-h-screen px-6 py-24 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #051E22 0%, #0A2E33 35%, #103E42 75%, #155A60 100%)',
      }}
    >
      {/* Scan-line ambience */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,240,255,0.6) 0px, rgba(0,240,255,0.6) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* Horizon halo — the glow toward "what's next" */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-warden-cyan/[0.15] blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[120px] bg-warden-cyan/25 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">

        {/* ── Chapter marker ── */}
        <div className="animate-subtitle flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-warden-cyan/40" />
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-warden-cyan animate-pulse shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
            <span className="font-mono text-[10px] tracking-[0.5em] text-warden-cyan/70 uppercase">
              Transmission · Penthouse
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-warden-cyan animate-pulse shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-warden-cyan/40" />
        </div>

        {/* ── Title ── */}
        <h2 className="animate-flipcard font-serif text-4xl md:text-6xl text-warden-beige text-center tracking-tight leading-[1.05] mb-4">
          What Comes <span className="italic text-warden-cyan text-cyan-glow">Next</span>
        </h2>
        <p className="animate-content text-center text-warden-beige/60 max-w-2xl mx-auto mb-16 text-sm leading-relaxed">
          WARDEN is not a one-room product. It's a four-year arc — from a single hotel corridor in Incheon
          to a standard that follows guests across every door they open.
        </p>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Connecting beam — runs across the middle of the cards (desktop) */}
          <div className="hidden md:block absolute top-[88px] left-[6%] right-[6%] h-px bg-gradient-to-r from-warden-cyan-dim/40 via-warden-cyan/60 to-warden-cyan shadow-[0_0_10px_rgba(0,240,255,0.4)] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {milestones.map((m, idx) => {
              const s = intensityStyle[m.intensity];
              return (
                <div
                  key={m.year}
                  className={`stagger-card relative rounded-lg border backdrop-blur-sm p-6 transition-all duration-500 hover:-translate-y-1 ${s.card} ${s.glow}`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ring-4 ring-warden-teal-deep items-center justify-center">
                    <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                  </div>

                  {/* Status badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`font-mono text-[9px] tracking-[0.3em] uppercase ${s.chapter}`}>
                      {m.chapter}
                    </span>
                    <span className="font-mono text-[8px] tracking-widest uppercase text-warden-beige/40">
                      {String(idx + 1).padStart(2, '0')} / 04
                    </span>
                  </div>

                  {/* Year */}
                  <div className={`font-mono text-5xl md:text-6xl font-bold tracking-tight mb-3 ${s.year}`}>
                    {m.year}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl text-warden-beige mb-3 leading-tight">
                    {m.title}
                  </h3>

                  {/* Description */}
                  <p className="text-warden-beige/65 text-xs leading-relaxed mb-4">
                    {m.description}
                  </p>

                  {/* Status pill */}
                  <div className="pt-3 border-t border-warden-cyan/15">
                    <span className={`font-mono text-[9px] tracking-widest uppercase ${s.chapter}`}>
                      ◆ {m.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Closing teaser ── */}
        <div className="animate-content mt-20 text-center">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-warden-cyan/40" />
            <span className="font-mono text-[10px] tracking-[0.5em] text-warden-cyan/70 uppercase">
              Signal continues
            </span>
            <span className="w-8 h-px bg-warden-cyan/40" />
          </div>
          <p className="font-serif italic text-warden-cyan text-cyan-glow text-lg md:text-xl tracking-wide">
            "Every guest, every door, every floor — quietly watched over."
          </p>
          <p className="mt-3 font-mono text-[10px] tracking-[0.3em] text-warden-beige/40 uppercase">
            Warden · 2026 → ∞
          </p>
        </div>
      </div>
    </section>
  );
}
