import { useEffect, useRef } from 'react';
import FluidShader from '../components/FluidShader';
import type { ShaderPalette } from '../data/shader-palettes';

/** Warmer marketing-section palette — slightly more amber than the
 *  default BEIGE_PALETTE so the section reads as a step warmer
 *  than the Problem/Market panels that bracket it. */
const WARM_BEIGE_PALETTE: ShaderPalette = {
  deep:      [0.929, 0.890, 0.816], // #EDE3D0 — section base
  mid:       [0.882, 0.820, 0.706], // #E1D1B4 — deeper sand
  highlight: [0.690, 0.541, 0.310], // #B08A4F — amber thread
};

const strategies = [
  { number: '01', title: 'Media Outreach', description: 'Demonstration of AI scanning capabilities on LinkedIn and B2B networks.', accent: false },
  { number: '02', title: 'Trade Shows', description: 'Participation in hospitality tech exhibitions (COEX, HITEC Korea).', accent: false },
  { number: '03', title: 'Direct Pitch', description: 'ROI calculations and direct engagement with hotel general managers.', accent: false },
  { number: '04', title: 'Trust Badge', description: 'WARDEN Verified badge integration on booking platforms worldwide.', accent: true },
];

export default function MarketingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = section.querySelectorAll('.animate-flipcard, .stagger-card, .animate-subtitle');
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
      id="marketing"
      className="relative bg-warden-beige-warm py-24 px-6 overflow-hidden"
    >
      {/* Warm sand fluid shader — a half-step warmer than the surrounding panels */}
      <FluidShader
        className="absolute inset-0 w-full h-full opacity-55 pointer-events-none"
        palette={WARM_BEIGE_PALETTE}
        streakOpacity={0.05}
        vignetteStrength={0.5}
        fallbackBackground="linear-gradient(160deg, #EDE3D0 0%, #E1D1B4 50%, #EDE3D0 100%)"
      />

      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(168,154,130,0.2) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="animate-subtitle flex items-center gap-4 mb-3">
          <div className="h-px flex-1 bg-warden-beige-mute/40" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-warden-cyan-dim uppercase">
            Floor 5 · Go-to-Market
          </span>
          <div className="h-px flex-1 bg-warden-beige-mute/40" />
        </div>

        <h2 className="animate-flipcard font-serif text-2xl md:text-3xl text-warden-ink tracking-tight text-center mb-12">
          Marketing & <span className="italic text-warden-cyan-dim">Retention Strategy</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {strategies.map((strategy) => (
            <div
              key={strategy.number}
              className={`
                stagger-card bg-warden-beige rounded-xl p-6 text-center border transition-all duration-300 hover:-translate-y-1
                ${strategy.accent
                  ? 'border-warden-cyan/50 hover:border-warden-cyan hover:shadow-[0_8px_25px_rgba(0,240,255,0.2)]'
                  : 'border-warden-beige-soft hover:border-warden-cyan/40 hover:shadow-[0_8px_25px_rgba(0,240,255,0.1)]'
                }
              `}
            >
              <div className={`text-lg font-bold font-mono mb-3 ${strategy.accent ? 'text-warden-cyan' : 'text-warden-cyan-dim'}`}>
                {strategy.number}
              </div>
              <h4 className="font-serif text-lg text-warden-ink mb-2">{strategy.title}</h4>
              <p className="text-xs text-warden-ink-mute leading-relaxed">{strategy.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
