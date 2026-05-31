import { useScrollReveal } from '../lib/useScrollReveal';

interface DeploymentCard {
  number: string;
  title: string;
  description: string;
  glyph: React.ReactNode;
}

// ── Deployment-card glyphs ────────────────────────────────────────────────────

function SubscriptionGlyph() {
  return (
    <svg viewBox="0 0 60 60" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Receipt frame */}
      <rect x="14" y="10" width="32" height="40" rx="2" stroke="#0A0E12" strokeWidth="1.2" fill="rgba(214,225,232,0.4)" />
      {/* Header band */}
      <rect x="14" y="10" width="32" height="8" fill="#0A0E12" />
      {/* Lines */}
      <line x1="20" y1="24" x2="40" y2="24" stroke="rgba(10,14,18,0.4)" strokeWidth="0.8" />
      <line x1="20" y1="29" x2="36" y2="29" stroke="rgba(10,14,18,0.3)" strokeWidth="0.8" />
      <line x1="20" y1="34" x2="40" y2="34" stroke="rgba(10,14,18,0.4)" strokeWidth="0.8" />
      {/* Pricing emphasis */}
      <rect x="20" y="40" width="20" height="6" rx="1" fill="rgba(180,198,210,0.6)" />
      <text x="22" y="44.5" fontSize="4" fill="#0A0E12" fontFamily="monospace" letterSpacing="0.5">PER MONTH</text>
      {/* Loop arrow (recurring) */}
      <path d="M48 22 a 4 4 0 1 1 -2 -3" stroke="#0A0E12" strokeWidth="1" fill="none" />
      <path d="M44 17 L 46 19 L 44 21" stroke="#0A0E12" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OTAGlyph() {
  return (
    <svg viewBox="0 0 60 60" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Cloud */}
      <path d="M16 28 Q 12 22 18 18 Q 20 12 28 14 Q 33 8 40 14 Q 48 14 46 22 Q 50 24 46 28 L 18 28 Q 14 26 16 28 Z"
            fill="rgba(214,225,232,0.5)" stroke="#0A0E12" strokeWidth="1.1" />
      {/* Down arrow */}
      <line x1="30" y1="34" x2="30" y2="48" stroke="#0A0E12" strokeWidth="1.4" />
      <path d="M25 43 L 30 48 L 35 43" stroke="#0A0E12" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Device tray */}
      <rect x="20" y="50" width="20" height="4" rx="1" fill="#0A0E12" />
      {/* Progress dashes around arrow */}
      <line x1="22" y1="38" x2="24" y2="38" stroke="rgba(180,198,210,0.9)" strokeWidth="1.4" />
      <line x1="36" y1="38" x2="38" y2="38" stroke="rgba(180,198,210,0.9)" strokeWidth="1.4" />
      <line x1="22" y1="44" x2="24" y2="44" stroke="rgba(180,198,210,0.6)" strokeWidth="1.4" />
      <line x1="36" y1="44" x2="38" y2="44" stroke="rgba(180,198,210,0.6)" strokeWidth="1.4" />
    </svg>
  );
}

function ModularGlyph() {
  return (
    <svg viewBox="0 0 60 60" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Three stacked module bricks */}
      <rect x="12" y="38" width="36" height="12" rx="2" fill="#0A0E12" />
      <rect x="14" y="42" width="3" height="3" fill="rgba(180,198,210,0.7)" />
      <rect x="20" y="42" width="3" height="3" fill="rgba(180,198,210,0.5)" />
      <rect x="26" y="42" width="3" height="3" fill="rgba(180,198,210,0.7)" />

      <rect x="12" y="24" width="36" height="12" rx="2" stroke="#0A0E12" strokeWidth="1.2" fill="rgba(251,250,247,0.95)" />
      <circle cx="18" cy="30" r="1.5" fill="#0A0E12" />
      <line x1="22" y1="30" x2="42" y2="30" stroke="rgba(10,14,18,0.35)" strokeWidth="0.8" />

      {/* Top module hovering — being swapped */}
      <rect x="20" y="8" width="28" height="12" rx="2" stroke="#0A0E12" strokeWidth="1.2"
            fill="rgba(214,225,232,0.7)" strokeDasharray="3 2" />
      <line x1="26" y1="14" x2="42" y2="14" stroke="rgba(10,14,18,0.5)" strokeWidth="0.8" />
      {/* Replace arrow */}
      <path d="M10 22 L 18 22" stroke="#0A0E12" strokeWidth="1" />
      <path d="M14 19 L 18 22 L 14 25" stroke="#0A0E12" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FleetGlyph() {
  return (
    <svg viewBox="0 0 60 60" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Center hub */}
      <circle cx="30" cy="30" r="5" fill="#0A0E12" />
      <circle cx="30" cy="30" r="10" stroke="#0A0E12" strokeWidth="0.6" strokeOpacity="0.3" fill="none" />
      {/* Satellites — small hotels */}
      {[
        { x: 10, y: 14 },
        { x: 50, y: 14 },
        { x: 8, y: 44 },
        { x: 52, y: 44 },
        { x: 30, y: 8 },
      ].map((s, i) => (
        <g key={i}>
          <line x1="30" y1="30" x2={s.x} y2={s.y}
                stroke="rgba(10,14,18,0.3)" strokeWidth="0.6" strokeDasharray="2 2" />
          <rect x={s.x - 3} y={s.y - 3} width="6" height="6"
                stroke="#0A0E12" strokeWidth="0.9" fill="rgba(251,250,247,0.95)" />
          <rect x={s.x - 2} y={s.y - 1.5} width="1" height="1" fill="#0A0E12" />
          <rect x={s.x} y={s.y - 1.5} width="1" height="1" fill="#0A0E12" />
        </g>
      ))}
    </svg>
  );
}

const DEPLOYMENTS: DeploymentCard[] = [
  {
    number: '01',
    title: 'Subscription-Based Model',
    description: 'Flexible deployment without large upfront infrastructure costs — operational from day one.',
    glyph: <SubscriptionGlyph />,
  },
  {
    number: '02',
    title: 'OTA System Updates',
    description: 'Continuous software improvements and remote system optimisation across the entire fleet.',
    glyph: <OTAGlyph />,
  },
  {
    number: '03',
    title: 'Modular Maintenance',
    description: 'Replaceable sensors and scalable hardware infrastructure for long-lifecycle operations.',
    glyph: <ModularGlyph />,
  },
  {
    number: '04',
    title: 'Fleet Scalability',
    description: 'Centralised support for multi-floor, multi-property, and multi-region deployments.',
    glyph: <FleetGlyph />,
  },
];

// ── Larger "connected fleet" diagram for the panel below ──
function FleetTopology() {
  return (
    <svg viewBox="0 0 600 280" fill="none" aria-hidden="true" className="w-full h-auto">
      {/* Central cloud node */}
      <g>
        <circle cx="300" cy="140" r="44" stroke="#0A0E12" strokeWidth="1.2" fill="rgba(214,225,232,0.5)" />
        <circle cx="300" cy="140" r="30" stroke="rgba(10,14,18,0.35)" strokeWidth="0.8" fill="rgba(251,250,247,0.9)" />
        <text x="300" y="138" textAnchor="middle" fontSize="11" fill="#0A0E12" fontFamily="serif" fontStyle="italic">WARDEN</text>
        <text x="300" y="150" textAnchor="middle" fontSize="8" fill="rgba(10,14,18,0.55)" fontFamily="monospace" letterSpacing="2">CLOUD</text>
      </g>

      {/* Property nodes around the cloud — hotels */}
      {[
        { x: 80,  y: 60,  name: 'INCHEON · 12 ROOMS', dotN: 2 },
        { x: 80,  y: 220, name: 'SONGDO · 24 ROOMS', dotN: 3 },
        { x: 520, y: 60,  name: 'SEOUL · 18 ROOMS', dotN: 2 },
        { x: 520, y: 220, name: 'BUSAN · 8 ROOMS',  dotN: 1 },
      ].map((h, i) => (
        <g key={i}>
          {/* Connection line */}
          <path d={`M ${h.x} ${h.y} Q ${(h.x + 300) / 2} ${(h.y + 140) / 2 + (i % 2 === 0 ? -10 : 10)} 300 140`}
                stroke="rgba(10,14,18,0.25)" strokeWidth="0.8" fill="none" strokeDasharray="3 3" />
          {/* Hotel building outline */}
          <rect x={h.x - 28} y={h.y - 22} width="56" height="44" rx="2"
                fill="rgba(251,250,247,0.95)" stroke="#0A0E12" strokeWidth="1" />
          {/* Roofline */}
          <line x1={h.x - 28} y1={h.y - 16} x2={h.x + 28} y2={h.y - 16} stroke="rgba(10,14,18,0.4)" strokeWidth="0.6" />
          {/* Windows grid */}
          {[0, 1, 2].map((row) => (
            <g key={row}>
              {[0, 1, 2, 3].map((col) => (
                <rect key={col}
                      x={h.x - 22 + col * 11}
                      y={h.y - 12 + row * 9}
                      width="6" height="5"
                      fill={row * 4 + col < h.dotN ? '#0A0E12' : 'rgba(214,225,232,0.6)'} />
              ))}
            </g>
          ))}
          {/* Label */}
          <text x={h.x} y={h.y + 36} textAnchor="middle" fontSize="7"
                fill="rgba(10,14,18,0.55)" fontFamily="monospace" letterSpacing="0.6">
            {h.name}
          </text>
          {/* Active robot dot near hotel */}
          <circle cx={h.x + 32} cy={h.y - 16} r="2.5" fill="#0A0E12" />
        </g>
      ))}

      {/* Live indicator on cloud */}
      <circle cx="332" cy="108" r="3" fill="#0A0E12" />
      <circle cx="332" cy="108" r="6" stroke="#0A0E12" strokeWidth="0.6" strokeOpacity="0.4" fill="none" />

      {/* Tier label */}
      <text x="20" y="30" fontSize="8" fill="rgba(10,14,18,0.4)" fontFamily="monospace" letterSpacing="0.5">
        FLEET · LIVE
      </text>
      <text x="20" y="270" fontSize="8" fill="rgba(10,14,18,0.4)" fontFamily="monospace" letterSpacing="0.5">
        SYNCING · 4 PROPERTIES
      </text>
    </svg>
  );
}

export default function RaaSSection() {
  const [ref, revealed] = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="raas"
      data-revealed={revealed}
      className="relative bg-spectra-cream py-16 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-0 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 h-px bg-spectra-hairline" />

      <div className="max-w-[1400px] mx-auto">

        {/* ── Header ── */}
        <div className="grid grid-cols-12 gap-8 mb-12 md:mb-24">
          <div className="col-span-12 lg:col-span-3">
            <div className="s-up flex items-center gap-3 mb-6 lg:mb-0">
              <span className="w-6 h-px bg-spectra-ink/40" />
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase bg-spectra-ink text-spectra-cream px-3 py-1.5 rounded-md font-semibold">
                09 · RaaS Model
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <h2 className="s-up s-d1 font-editorial font-light text-spectra-ink leading-[1.05] tracking-[-0.02em] mb-6"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 4rem)' }}>
              Robotics-as-a-Service.<br />
              <span className="italic text-spectra-ink-soft">Built to Scale.</span>
            </h2>
            <p className="s-up s-d2 max-w-2xl text-base md:text-[17px] leading-[1.7] text-spectra-ink-mute">
              WARDEN is designed as a scalable hospitality platform with modular
              deployment and centralised operational support.
            </p>
          </div>
        </div>

        {/* ── 4 Deployment cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-14 md:mb-32">
          {DEPLOYMENTS.map((d, i) => (
            <article
              key={d.number}
              className={`s-up s-d${i + 3}
                          group relative bg-spectra-pearl rounded-2xl p-7 md:p-8
                          border border-spectra-hairline
                          transition-all duration-500 ease-smooth
                          hover:-translate-y-1 hover:border-spectra-mist-deep/40
                          hover:shadow-[0_22px_50px_-15px_rgba(10,14,18,0.20),0_6px_15px_-5px_rgba(10,14,18,0.08)]`}
            >
              <div className="flex items-start justify-between mb-7">
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-spectra-ink-faint">
                  {d.number}
                </span>
                <div className="w-12 h-12 opacity-90 group-hover:opacity-100 transition-opacity">
                  {d.glyph}
                </div>
              </div>

              <h3 className="font-editorial text-[17px] text-spectra-ink mb-3 tracking-tight leading-tight">
                {d.title}
              </h3>
              <p className="text-[13px] leading-[1.6] text-spectra-ink-mute">
                {d.description}
              </p>
            </article>
          ))}
        </div>

        {/* ── Fleet topology block ── */}
        <div className="s-up s-d6 relative rounded-3xl overflow-hidden border border-spectra-hairline"
             style={{ background: 'linear-gradient(180deg, #FBFAF7 0%, #EAF1F6 100%)' }}>
          <div className="px-6 md:px-10 lg:px-16 py-10 md:py-20">

            {/* Heading */}
            <div className="text-center mb-10 md:mb-14">
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="w-6 h-px bg-spectra-ink/30" />
                <span className="font-mono text-[11px] tracking-[0.25em] uppercase bg-spectra-ink text-spectra-cream px-3 py-1.5 rounded-md font-semibold">
                  Fleet Topology
                </span>
                <span className="w-6 h-px bg-spectra-ink/30" />
              </div>
              <h3 className="font-editorial font-light text-spectra-ink leading-[1.1] tracking-[-0.02em] max-w-2xl mx-auto"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                One Cloud, <span className="italic text-spectra-ink-soft">Many Properties.</span>
              </h3>
              <p className="mt-4 max-w-xl mx-auto text-[14.5px] leading-[1.65] text-spectra-ink-mute">
                Every WARDEN robot reports into the same central console — from a
                single pilot hotel to a multi-region rollout.
              </p>
            </div>

            {/* Diagram */}
            <div className="relative max-w-3xl mx-auto">
              <FleetTopology />
            </div>

            {/* Bottom mini-stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto">
              {[
                { v: '4', l: 'Properties' },
                { v: '62', l: 'Rooms' },
                { v: '8', l: 'Robots' },
                { v: '99.8%', l: 'Uptime' },
              ].map((s, i) => (
                <div key={s.l} className={`s-up s-d${i + 3} text-center md:text-left`}>
                  <p className="font-editorial font-light text-spectra-ink leading-none tracking-[-0.02em] mb-2"
                     style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                    {s.v}
                  </p>
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing line */}
        <p className="s-fade s-d8 max-w-3xl mx-auto mt-20 text-center font-editorial italic text-spectra-ink-soft text-lg md:text-xl leading-[1.5]">
          One service. Many hotels. Always synchronised.
        </p>
      </div>
    </section>
  );
}
