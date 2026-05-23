import { useEffect, useRef, useState } from 'react';
import CinematicPortrait, { type TeamMember } from '../components/CinematicPortrait';

const teamMembers: TeamMember[] = [
  {
    name: 'Pivevar Darya',
    role: 'Team Leader',
    description:
      'Project Visionary. Orchestrating the strategic pivot from autonomous luxury tech to humanitarian hospitality.',
    isLeader: true,
  },
  {
    name: 'Saydullayeva Aziza',
    role: 'AI Systems Engineer',
    description:
      'Core AI development. Integrates ML perception modules and trains anomaly-detection pipelines for hotel deployments.',
  },
  {
    name: 'Nurillaeva Zarina',
    role: 'UI / Dashboard',
    description:
      'Designs the centralized reporting interface and real-time alert visualization for hotel management teams.',
  },
  {
    name: 'Tologoneva Batkaiym',
    role: 'Robotics & Mechanical',
    description:
      'Owns the WARDEN chassis. Mechanical CAD, protective casing in Fusion 360, sensor mounting topology.',
  },
  {
    name: 'Hakimova Hadicha',
    role: 'Business & Market',
    description:
      'Market research, business model, and go-to-market strategy for the hospitality sector pilot in Incheon.',
  },
  {
    name: 'Kodirova Zahrokhon',
    role: 'System Integrator',
    description:
      'Optimizing low-level drivers and sensor fusion for robust hardware performance across deployment hotels.',
  },
  {
    name: 'Norov Mirsaid',
    role: 'Navigation Engineer',
    description:
      'ROS 2 + SLAM Toolbox autonomous navigation. Precise indoor mapping and obstacle avoidance at hotel-scale.',
  },
  {
    name: 'Nimatilaev Javokhir',
    role: 'Computer Vision Engineer',
    description:
      'Multi-factor hidden-camera detection using optical, thermal, and RF-based sensor fusion algorithms.',
  },
  {
    name: 'Amaan',
    role: 'QA & Integration',
    description:
      'System testing, end-to-end validation, and quality assurance of WARDEN deployment scenarios.',
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Reveal animations on enter
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = section.querySelectorAll('.animate-subtitle, .animate-flipcard, .animate-content');
            els.forEach((el) => el.classList.add('revealed'));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Scroll position → active dot
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onScroll = () => {
      const cardWidth = rail.scrollWidth / teamMembers.length;
      const idx = Math.round(rail.scrollLeft / cardWidth);
      setActiveIndex(Math.min(teamMembers.length - 1, Math.max(0, idx)));
    };
    rail.addEventListener('scroll', onScroll, { passive: true });
    return () => rail.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToIndex = (i: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.children[i] as HTMLElement | undefined;
    if (card) {
      rail.scrollTo({ left: card.offsetLeft - rail.clientWidth / 2 + card.clientWidth / 2, behavior: 'smooth' });
    }
  };

  // Compute per-card state: idle / locked / dimmed
  const stateFor = (i: number): 'idle' | 'locked' | 'dimmed' => {
    if (hoveredIndex === null) return 'idle';
    if (hoveredIndex === i) return 'locked';
    return 'dimmed';
  };

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative min-h-screen py-20 overflow-hidden bg-warden-teal-deep"
    >
      {/* Cyan grid wallpaper */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,240,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient halo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-warden-cyan/[0.06] blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10">
        {/* Section header */}
        <div className="max-w-[1200px] mx-auto px-6 mb-12">
          <div className="animate-subtitle flex items-center gap-4 mb-3">
            <div className="h-px flex-1 bg-warden-cyan/20" />
            <span className="font-mono text-[10px] tracking-[0.45em] text-warden-cyan/70 uppercase">
              Floor R · Personnel Database
            </span>
            <div className="h-px flex-1 bg-warden-cyan/20" />
          </div>

          <h2 className="animate-flipcard font-display font-bold text-warden-beige text-center tracking-wide uppercase mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Team 1 <span className="text-warden-cyan text-cyan-glow">Spectra</span>
          </h2>

          <p className="animate-content font-mono text-[10px] tracking-[0.3em] text-warden-beige/45 uppercase text-center">
            School of Global Convergence Studies · Inha University · Incheon
          </p>

          {/* Live hover-status readout (terminal-style) */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-3 font-mono text-[9px] tracking-[0.3em] uppercase">
              <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                hoveredIndex !== null
                  ? 'bg-warden-cyan shadow-[0_0_8px_rgba(0,240,255,0.9)] animate-pulse'
                  : 'bg-warden-cyan-dim/50'
              }`} />
              <span className="text-warden-cyan/60">
                {hoveredIndex !== null
                  ? `Locked on subject ${String(hoveredIndex + 1).padStart(2, '0')} · ${teamMembers[hoveredIndex].name}`
                  : 'Awaiting target · Hover a portrait to engage'}
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal cinematic rail */}
        <div ref={railRef} className="cine-rail">
          {teamMembers.map((m, i) => (
            <CinematicPortrait
              key={m.name}
              member={m}
              index={i}
              state={stateFor(i)}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex((curr) => (curr === i ? null : curr))}
            />
          ))}
        </div>

        {/* Scroll progress dots */}
        <div className="max-w-[1200px] mx-auto px-6 mt-8 flex items-center justify-center gap-2">
          {teamMembers.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-8 bg-warden-cyan shadow-[0_0_8px_rgba(0,240,255,0.7)]'
                  : 'w-1.5 bg-warden-cyan/25 hover:bg-warden-cyan/50'
              }`}
              aria-label={`Go to member ${i + 1}`}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-warden-cyan/40">
            ← Drag · Scroll · Hover to Lock →
          </span>
        </div>
      </div>
    </section>
  );
}
