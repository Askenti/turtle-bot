import { useEffect, useRef } from 'react';
import BlueprintOverlay from '../components/BlueprintOverlay';
import FluidShader, { BEIGE_PALETTE } from '../components/FluidShader';

const problems = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-warden-cyan-dim">
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
        <circle cx="24" cy="20" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M12 38C12 32 17 28 24 28C31 28 36 32 36 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="16" x2="32" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
    title: 'Hidden Camera Epidemic',
    description:
      "Severe spycam ('Molka') threats in hospitality spaces across South Korea and expanding globally. Guest privacy is at critical risk.",
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-warden-cyan-dim">
        <path d="M24 6L6 42H42L24 6Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
        <line x1="24" y1="18" x2="24" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="24" cy="36" r="2" fill="currentColor" />
      </svg>
    ),
    title: 'Manual Inspection Failures',
    description:
      'Human-error prone manual checks by overloaded hotel staff. Inconsistent quality and missed threats compromise guest safety.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-warden-cyan-dim">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
        <line x1="24" y1="12" x2="24" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="24" x2="32" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
      </svg>
    ),
    title: 'Delayed Response Times',
    description:
      'Disconnect between security discovery and immediate response. Critical incidents lack real-time communication systems.',
  },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = section.querySelectorAll('.animate-subtitle, .animate-flipcard, .stagger-card');
            elements.forEach((el) => el.classList.add('revealed'));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative bg-warden-beige py-24 px-6 overflow-hidden"
    >
      {/* Cream-marble fluid shader — warm cream → sand → honey vein.
          opacity-60 lets the section's beige show through so the marble
          feels like a watermark instead of taking over. */}
      <FluidShader
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
        palette={BEIGE_PALETTE}
        streakOpacity={0.05}
        vignetteStrength={0.5}
        fallbackBackground="linear-gradient(160deg, #F5F0E6 0%, #EDE3D0 50%, #F5F0E6 100%)"
      />

      {/* Soft beige texture */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(168,154,130,0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Hotel floor-plan blueprint — faint cyan lines at very low opacity */}
      <BlueprintOverlay opacity={0.045} />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Floor indicator */}
        <div className="animate-subtitle flex items-center gap-4 mb-3">
          <div className="h-px flex-1 bg-warden-beige-mute/40" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-warden-cyan-dim uppercase">
            Floor 1 · The Challenge
          </span>
          <div className="h-px flex-1 bg-warden-beige-mute/40" />
        </div>

        {/* Subtitle */}
        <span className="animate-subtitle block text-warden-cyan-dim text-xs font-semibold tracking-[0.2em] uppercase text-center mb-3">
          Critical Industry Challenge
        </span>

        {/* Title */}
        <h2 className="animate-flipcard font-serif text-3xl md:text-4xl text-warden-ink tracking-tight text-center mb-16">
          The Problem Hotels <span className="italic text-warden-cyan-dim">Face Today</span>
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="stagger-card bg-warden-beige-warm rounded-xl p-8 border border-warden-beige-soft shadow-lg shadow-warden-teal-deep/5 hover:-translate-y-1 hover:border-warden-cyan/50 hover:shadow-[0_10px_30px_rgba(0,240,255,0.15)] transition-all duration-300"
            >
              <div className="mb-5">{problem.icon}</div>
              <h3 className="font-serif text-xl text-warden-ink mb-3">{problem.title}</h3>
              <p className="text-sm text-warden-ink-mute leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
