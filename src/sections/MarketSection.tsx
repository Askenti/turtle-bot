import { useEffect, useRef } from 'react';
import BlueprintOverlay from '../components/BlueprintOverlay';
import FluidShader from '../components/FluidShader';
import { BEIGE_PALETTE } from '../data/shader-palettes';

const marketCards = [
  {
    label: 'Beachhead Market',
    title: 'Incheon Business Hotels',
    description:
      'Strategic focus on 3-5★ hotels in Songdo and Incheon Airport zone. Initial deployment target: approximately 140 hotels.',
    featured: false,
  },
  {
    label: 'Global Market Size',
    title: '$24.38B',
    description:
      'Projected hospitality robotics market volume with 17.89% CAGR through 2032.',
    featured: true,
  },
  {
    label: 'Value Drivers',
    title: 'WARDEN Verified Badge',
    description:
      'Enhanced guest trust through privacy verification and automatic integration on booking aggregators.',
    featured: false,
  },
];

const comparisonRows = [
  { feature: 'Hidden Camera Detection', puda: false, keenon: false, warden: true, wardenText: null },
  { feature: 'Autonomous Room Inspection', puda: false, keenon: null, warden: true, wardenText: 'Full Auto' },
  { feature: 'Real-time Alert Dashboard', puda: false, keenon: false, warden: true, wardenText: null },
  { feature: 'Monthly Subscription (RaaS)', puda: '₩460,000', keenon: '₩740,000', warden: true, wardenText: '₩799,000 - ₩1,099,000' },
];

function CheckMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="inline text-warden-cyan-dim">
      <circle cx="9" cy="9" r="9" fill="currentColor" fillOpacity="0.15" />
      <path d="M5 9L8 12L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="inline text-warden-beige-mute">
      <circle cx="9" cy="9" r="9" fill="currentColor" fillOpacity="0.1" />
      <path d="M7 7L11 11M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function MarketSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = section.querySelectorAll('.animate-subtitle, .animate-flipcard, .stagger-card, .animate-content');
            els.forEach((el) => el.classList.add('revealed'));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="market"
      className="relative bg-warden-beige py-24 px-6 overflow-hidden"
    >
      {/* Cream-marble fluid shader — warm cream → sand → honey vein */}
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
      <BlueprintOverlay opacity={0.04} />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="animate-subtitle flex items-center gap-4 mb-3">
          <div className="h-px flex-1 bg-warden-beige-mute/40" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-warden-cyan-dim uppercase">
            Floor 4 · Market
          </span>
          <div className="h-px flex-1 bg-warden-beige-mute/40" />
        </div>

        <span className="animate-subtitle block text-warden-cyan-dim text-xs font-semibold tracking-[0.2em] uppercase text-center mb-3">
          Market Opportunity
        </span>

        <h2 className="animate-flipcard font-serif text-3xl md:text-4xl text-warden-ink tracking-tight text-center mb-16">
          Market Opportunity & <span className="italic text-warden-cyan-dim">Strategy</span>
        </h2>

        {/* Market cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {marketCards.map((card) => (
            <div
              key={card.label}
              className={`
                stagger-card bg-warden-beige-warm rounded-xl p-8 border border-warden-beige-soft
                hover:-translate-y-0.5 hover:border-warden-cyan/50 hover:shadow-[0_8px_25px_rgba(0,240,255,0.12)] transition-all duration-300
                ${card.featured ? 'border-l-4 border-l-warden-cyan' : ''}
              `}
            >
              <p className="font-mono text-xs text-warden-cyan-dim uppercase tracking-widest mb-3">
                {card.label}
              </p>
              <h3 className={`font-serif mb-3 ${card.featured ? 'text-3xl text-warden-ink' : 'text-lg text-warden-ink'}`}>
                {card.title}
              </h3>
              <p className="text-sm text-warden-ink-mute leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="animate-content overflow-x-auto">
          <div className="bg-warden-beige-warm rounded-xl border border-warden-beige-soft shadow-sm overflow-hidden min-w-[600px]">
            <table className="w-full">
              <thead>
                <tr className="bg-warden-beige-soft/60">
                  <th className="text-left p-4 font-mono text-xs text-warden-ink-mute uppercase tracking-wider">
                    Feature / Parameter
                  </th>
                  <th className="text-center p-4 font-mono text-xs text-warden-ink-mute uppercase tracking-wider">
                    Pudu BellaBot
                  </th>
                  <th className="text-center p-4 font-mono text-xs text-warden-ink-mute uppercase tracking-wider">
                    Keenon T10
                  </th>
                  <th className="text-center p-4 font-mono text-xs text-warden-cyan-dim uppercase tracking-wider bg-warden-cyan/[0.08]">
                    WARDEN (Our Solution)
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-warden-beige-warm' : 'bg-warden-beige/50'}>
                    <td className="p-4 text-sm font-semibold text-warden-ink">{row.feature}</td>
                    <td className="text-center p-4">
                      {typeof row.puda === 'boolean' ? (
                        row.puda ? <CheckMark /> : <CrossMark />
                      ) : (
                        <span className="text-sm text-warden-ink-mute">{row.puda}</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {row.keenon === null ? (
                        <span className="text-sm text-warden-beige-mute">Manual</span>
                      ) : typeof row.keenon === 'boolean' ? (
                        row.keenon ? <CheckMark /> : <CrossMark />
                      ) : (
                        <span className="text-sm text-warden-ink-mute">{row.keenon}</span>
                      )}
                    </td>
                    <td className="text-center p-4 bg-warden-cyan/[0.06]">
                      {row.wardenText ? (
                        <span className="text-sm font-semibold text-warden-ink">{row.wardenText}</span>
                      ) : (
                        <CheckMark />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
