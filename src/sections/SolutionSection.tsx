import { useEffect, useRef } from 'react';

const solutions = [
  {
    number: '01',
    title: 'AI Inspector',
    description:
      'Advanced AI scans for hidden spycams while auditing room cleanliness and identifying missing items in real-time.',
    features: ['360° LiDAR scanning', 'YOLOv8 threat detection', 'Inventory verification'],
  },
  {
    number: '02',
    title: 'Smart Assistant',
    description:
      'Acts as an intelligent concierge, guiding guests through hotel amenities and providing live updates and assistance.',
    features: ['Natural language processing', 'Guest assistance 24/7', 'Amenity navigation'],
  },
  {
    number: '03',
    title: 'Instant Response',
    description:
      'Comprehensive digital safety reports sent instantly to centralized dashboard for immediate management action.',
    features: ['Real-time alerting', 'Centralized dashboard', 'Automated reporting'],
  },
];

export default function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = section.querySelectorAll('.animate-subtitle, .animate-flipcard, .stagger-card');
            els.forEach((el) => el.classList.add('revealed'));
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
      id="solution"
      className="relative bg-warden-teal-dark text-warden-beige py-24 px-6 overflow-hidden"
    >
      {/* Subtle cyan grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,240,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-warden-cyan/[0.05] blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="animate-subtitle flex items-center gap-4 mb-3">
          <div className="h-px flex-1 bg-warden-cyan/20" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-warden-cyan/60 uppercase">
            Floor 2 · The Solution
          </span>
          <div className="h-px flex-1 bg-warden-cyan/20" />
        </div>

        <span className="animate-subtitle block text-warden-cyan text-xs font-semibold tracking-[0.2em] uppercase text-center mb-3">
          Innovative Ecosystem
        </span>

        <h2 className="animate-flipcard font-serif text-3xl md:text-4xl text-warden-beige tracking-tight text-center mb-16">
          Our Comprehensive <span className="italic text-warden-cyan text-cyan-glow">Solution</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution) => (
            <div
              key={solution.number}
              className="stagger-card bg-warden-teal-deep/60 backdrop-blur-sm rounded-xl p-8 border border-warden-cyan/15 hover:border-warden-cyan/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] transition-all duration-300"
            >
              <div className="text-2xl font-bold text-warden-cyan font-mono mb-4">{solution.number}</div>
              <h3 className="font-serif text-xl text-warden-beige uppercase tracking-wide mb-4">
                {solution.title}
              </h3>
              <p className="text-warden-beige/70 text-sm leading-relaxed mb-6">
                {solution.description}
              </p>
              <ul className="space-y-2">
                {solution.features.map((feature) => (
                  <li key={feature} className="text-xs text-warden-beige/60 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-warden-cyan shrink-0">
                      <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
