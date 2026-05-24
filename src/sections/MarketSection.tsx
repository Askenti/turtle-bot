import { useEffect, useRef } from 'react';
import BlueprintOverlay from '../components/BlueprintOverlay';
import WardenCard from '../components/WardenCard';

const marketCards = [
  {
    label: 'TARGET_ZONE',
    title: 'Incheon Business Hotels',
    description:
      'Strategic focus on 3-5★ hotels in Songdo and Incheon Airport zone. Initial deployment target: approximately 140 hotels.',
    featured: false,
  },
  {
    label: 'MARKET_DATA',
    title: '$24.38B',
    description:
      'Projected hospitality robotics market volume with 17.89% CAGR through 2032.',
    featured: true,
  },
  {
    label: 'VALUE_PROP',
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

        {/* Market cards - now using WardenCard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {marketCards.map((card, i) => (
            <WardenCard
              key={card.label}
              label={card.label}
              featured={card.featured}
              className="stagger-card"
              scanInterval={7000 + i * 1500}
            >
              <p className="font-mono text-xs text-warden-cyan-dim uppercase tracking-widest mb-3">
                {card.label.replace('_', ' ')}
              </p>
              <h3 className={`font-serif mb-3 ${card.featured ? 'text-3xl text-warden-ink' : 'text-lg text-warden-ink'}`}>
                {card.title}
              </h3>
              <p className="text-sm text-warden-ink-mute leading-relaxed">
                {card.description}
              </p>
            </WardenCard>
          ))}
        </div>

        {/* Comparison Table - also wrapped in glassmorphic style */}
        <div className="animate-content overflow-x-auto">
          <div
            className="warden-card rounded-xl overflow-hidden min-w-[600px]"
            style={{
              background: 'rgba(237, 227, 208, 0.06)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(226, 215, 190, 0.12)',
              boxShadow: `
                inset 1px 1px 0 rgba(255, 255, 255, 0.06),
                inset -1px -1px 0 rgba(0, 0, 0, 0.08),
                0 4px 20px rgba(0, 0, 0, 0.12)
              `,
            }}
          >
            {/* Corner brackets for table */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-warden-cyan/20 pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-warden-cyan/20 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-warden-cyan/20 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-warden-cyan/20 pointer-events-none" />

            {/* Technical label */}
            <span className="absolute top-3 right-8 font-mono text-[9px] tracking-[0.15em] uppercase text-warden-beige-mute/50">
              [COMPETITIVE_ANALYSIS]
            </span>

            <table className="w-full relative z-10">
              <thead>
                <tr style={{ background: 'rgba(226, 215, 190, 0.08)' }}>
                  <th className="text-left p-4 font-mono text-xs text-warden-ink-mute uppercase tracking-wider">
                    Feature / Parameter
                  </th>
                  <th className="text-center p-4 font-mono text-xs text-warden-ink-mute uppercase tracking-wider">
                    Pudu BellaBot
                  </th>
                  <th className="text-center p-4 font-mono text-xs text-warden-ink-mute uppercase tracking-wider">
                    Keenon T10
                  </th>
                  <th className="text-center p-4 font-mono text-xs text-warden-cyan-dim uppercase tracking-wider" style={{ background: 'rgba(0, 240, 255, 0.06)' }}>
                    WARDEN (Our Solution)
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} style={{ background: i % 2 === 0 ? 'rgba(237, 227, 208, 0.04)' : 'transparent' }}>
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
                    <td className="text-center p-4" style={{ background: 'rgba(0, 240, 255, 0.04)' }}>
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
