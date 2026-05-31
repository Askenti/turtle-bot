import { useScrollReveal } from '../lib/useScrollReveal';

// ── Pillar visuals ────────────────────────────────────────────────────────────

function EdgeChipGlyph() {
  return (
    <svg viewBox="0 0 60 60" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Chip body */}
      <rect x="14" y="14" width="32" height="32" rx="3" stroke="#0A0E12" strokeWidth="1.2" fill="rgba(214,225,232,0.4)" />
      {/* Inner die */}
      <rect x="22" y="22" width="16" height="16" rx="1" fill="#0A0E12" />
      <rect x="25" y="25" width="10" height="10" rx="0.5" fill="rgba(180,198,210,0.8)" />
      {/* Pins */}
      {[18, 26, 34, 42].map(p => (
        <g key={p}>
          <line x1={p} y1="14" x2={p} y2="10" stroke="#0A0E12" strokeWidth="1.2" />
          <line x1={p} y1="46" x2={p} y2="50" stroke="#0A0E12" strokeWidth="1.2" />
          <line x1="14" y1={p} x2="10" y2={p} stroke="#0A0E12" strokeWidth="1.2" />
          <line x1="46" y1={p} x2="50" y2={p} stroke="#0A0E12" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
}

function LockGlyph() {
  return (
    <svg viewBox="0 0 60 60" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Shackle */}
      <path d="M20 28 V20 a10 10 0 0 1 20 0 V28"
            stroke="#0A0E12" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Body */}
      <rect x="14" y="28" width="32" height="22" rx="3" fill="#0A0E12" />
      {/* Keyhole */}
      <circle cx="30" cy="38" r="2.5" fill="rgba(180,198,210,0.9)" />
      <rect x="29" y="38" width="2" height="6" fill="rgba(180,198,210,0.9)" />
      {/* Signal arcs around the lock */}
      <path d="M8 30 Q 6 38 8 46" stroke="rgba(10,14,18,0.35)" strokeWidth="0.8" fill="none" />
      <path d="M52 30 Q 54 38 52 46" stroke="rgba(10,14,18,0.35)" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

function ShieldGlyph() {
  return (
    <svg viewBox="0 0 60 60" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Shield outline */}
      <path d="M30 8 L 50 16 V 32 Q 50 46 30 54 Q 10 46 10 32 V 16 Z"
            stroke="#0A0E12" strokeWidth="1.4" fill="rgba(214,225,232,0.45)" strokeLinejoin="round" />
      {/* Inner ring */}
      <circle cx="30" cy="30" r="9" stroke="#0A0E12" strokeWidth="1" fill="none" />
      {/* Check */}
      <path d="M25 30 L 29 34 L 36 25" stroke="#0A0E12" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

interface Pillar {
  number: string;
  title: string;
  description: string;
  features: string[];
  glyph: React.ReactNode;
}

const PILLARS: Pillar[] = [
  {
    number: '01',
    title: 'Local Edge Processing',
    description: 'Sensitive inspection data is processed locally to reduce external exposure and improve response speed.',
    features: ['Local AI inference', 'Low-latency processing', 'Reduced cloud dependency'],
    glyph: <EdgeChipGlyph />,
  },
  {
    number: '02',
    title: 'Secure Communication',
    description: 'Encrypted system communication protects operational synchronisation and reporting across the platform.',
    features: ['Secure API communication', 'MQTT synchronisation', 'Encrypted telemetry'],
    glyph: <LockGlyph />,
  },
  {
    number: '03',
    title: 'Privacy Protection',
    description: 'WARDEN supports responsible hotel operations through protected reporting and controlled system access.',
    features: ['Secure operational logs', 'Audit trail tracking', 'Access-controlled reports'],
    glyph: <ShieldGlyph />,
  },
];

interface FlowNode {
  label: string;
  sub: string;
}

const FLOW: FlowNode[] = [
  { label: 'Sensor Data',           sub: 'Raw multi-sensor capture' },
  { label: 'Local AI Processing',   sub: 'Edge inference on-device' },
  { label: 'Encrypted Transmission', sub: 'AES + signed payloads' },
  { label: 'Central Dashboard',     sub: 'Operations console' },
];

export default function SecuritySection() {
  const [ref, revealed] = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="security"
      data-revealed={revealed}
      className="relative bg-spectra-cream py-16 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-0 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 h-px bg-spectra-hairline" />

      <div className="max-w-[1400px] mx-auto">

        {/* ── Header ── */}
        <div className="grid grid-cols-12 gap-y-6 md:gap-8 mb-12 md:mb-24">
          <div className="col-span-12 lg:col-span-3">
            <div className="s-up flex items-center gap-3 mb-6 lg:mb-0">
              <span className="w-6 h-px bg-spectra-ink/40" />
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase bg-spectra-ink text-spectra-cream px-3 py-1.5 rounded-md font-semibold">
                07 · Security
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <h2 className="s-up s-d1 font-editorial font-light text-spectra-ink leading-[1.05] tracking-[-0.02em] mb-6"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 4rem)' }}>
              Privacy-First<br />
              <span className="italic text-spectra-ink-soft">Security Architecture.</span>
            </h2>
            <p className="s-up s-d2 max-w-2xl text-base md:text-[17px] leading-[1.7] text-spectra-ink-mute">
              WARDEN combines edge AI, secure communication, and protected
              operational infrastructure to support safer hospitality environments.
            </p>
          </div>
        </div>

        {/* ── Three pillar cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-14 md:mb-32">
          {PILLARS.map((p, i) => (
            <article
              key={p.number}
              className={`s-up s-d${i + 3}
                          group relative bg-spectra-pearl rounded-2xl p-7 md:p-8
                          border border-spectra-hairline
                          transition-all duration-500 ease-smooth
                          hover:-translate-y-1 hover:border-spectra-mist-deep/40
                          hover:shadow-[0_22px_50px_-15px_rgba(10,14,18,0.20),0_6px_15px_-5px_rgba(10,14,18,0.08)]`}
            >
              {/* Header row */}
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-spectra-ink-faint">
                  {p.number}
                </span>
                <div className="w-12 h-12 opacity-90 group-hover:opacity-100 transition-opacity">
                  {p.glyph}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-editorial text-xl text-spectra-ink mb-3 tracking-tight">
                {p.title}
              </h3>

              {/* Description */}
              <p className="text-[13.5px] leading-[1.65] text-spectra-ink-mute mb-5">
                {p.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 pt-4 border-t border-spectra-hairline">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[12.5px] text-spectra-ink-soft">
                    <span className="mt-[6px] w-1 h-1 rounded-full bg-spectra-mist-deep shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* ── Data-flow diagram ── */}
        <div className="s-up s-d6 relative rounded-3xl overflow-hidden border border-spectra-hairline"
             style={{ background: 'linear-gradient(180deg, #FBFAF7 0%, #EAF1F6 100%)' }}>
          <div className="px-6 md:px-10 lg:px-16 pt-16 pb-10 md:py-20">

            {/* Heading */}
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="w-6 h-px bg-spectra-ink/30" />
                <span className="font-mono text-[11px] tracking-[0.25em] uppercase bg-spectra-ink text-spectra-cream px-3 py-1.5 rounded-md font-semibold">
                  Technical Insight
                </span>
                <span className="w-6 h-px bg-spectra-ink/30" />
              </div>
              <h3 className="font-editorial font-light text-spectra-ink leading-[1.1] tracking-[-0.02em] max-w-2xl mx-auto"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                Encrypted Data Flow,<br />
                <span className="italic text-spectra-ink-soft">From Sensor to Console.</span>
              </h3>
            </div>

            {/* Flow — horizontal on desktop, vertical on mobile */}
            <div className="relative">

              {/* Desktop connecting line behind nodes */}
              <div className="hidden md:block absolute top-[42px] left-[8%] right-[8%] h-px pointer-events-none">
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-spectra-ink/10" />
                  <div className="absolute inset-y-[-2px] inset-x-0 flex justify-around items-center">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="w-1 h-1 rounded-full bg-spectra-mist-deep" />
                    ))}
                  </div>
                </div>
              </div>

              <ol className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-6 relative">
                {FLOW.map((node, i) => (
                  <li key={node.label}
                      className={`s-slide s-d${i + 3} relative flex md:flex-col items-center md:items-center gap-4 md:gap-0`}>
                    {/* Node disc */}
                    <span className="shrink-0 relative z-10 w-[84px] h-[84px] rounded-full
                                     bg-spectra-pearl border border-spectra-ink/25
                                     shadow-[0_8px_22px_-8px_rgba(10,14,18,0.18)]
                                     flex flex-col items-center justify-center text-center px-2">
                      <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-spectra-ink-faint mb-1">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {/* Mini icon — different per node */}
                      <span className="text-spectra-ink">
                        {i === 0 && (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="2" fill="currentColor" />
                            <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="0.8" fill="none" />
                            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" fill="none" />
                          </svg>
                        )}
                        {i === 1 && (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="4" y="4" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
                            <rect x="6" y="6" width="4" height="4" fill="currentColor" />
                          </svg>
                        )}
                        {i === 2 && (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M5 7 V 5 a3 3 0 0 1 6 0 V 7" stroke="currentColor" strokeWidth="1" fill="none" />
                            <rect x="3" y="7" width="10" height="6" rx="1" fill="currentColor" />
                          </svg>
                        )}
                        {i === 3 && (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="2" y="3" width="12" height="9" rx="0.5" stroke="currentColor" strokeWidth="1" />
                            <line x1="2" y1="5.5" x2="14" y2="5.5" stroke="currentColor" strokeWidth="0.5" />
                            <rect x="4" y="7" width="3" height="3" fill="currentColor" opacity="0.6" />
                            <rect x="8" y="7" width="4" height="1" fill="currentColor" opacity="0.4" />
                            <rect x="8" y="9" width="3" height="1" fill="currentColor" opacity="0.4" />
                          </svg>
                        )}
                      </span>
                    </span>

                    {/* Label */}
                    <div className="md:mt-5 md:text-center flex-1 md:flex-none">
                      <p className="font-editorial text-[15px] text-spectra-ink leading-tight tracking-tight">
                        {node.label}
                      </p>
                      <p className="mt-1 font-mono text-[9px] tracking-[0.25em] uppercase text-spectra-ink-faint">
                        {node.sub}
                      </p>
                    </div>

                    {/* Mobile arrow */}
                    {i < FLOW.length - 1 && (
                      <span className="md:hidden absolute left-[42px] mt-[100px] text-spectra-ink-faint text-xs">↓</span>
                    )}
                  </li>
                ))}
              </ol>

              {/* Floating "encrypted" chip */}
              <div className="hidden md:flex absolute top-[6px] left-1/2 -translate-x-1/2
                              items-center gap-2 px-3 py-1 rounded-full bg-spectra-ink text-spectra-cream
                              font-mono text-[9px] tracking-[0.3em] uppercase">
                <span className="w-1 h-1 rounded-full bg-spectra-cream animate-pulse" />
                <span>End-to-End Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Closing line */}
        <p className="s-fade s-d8 max-w-3xl mx-auto mt-20 text-center font-editorial italic text-spectra-ink-soft text-lg md:text-xl leading-[1.5]">
          Every inspection — encrypted, local-first, and accountable
          by design.
        </p>
      </div>
    </section>
  );
}
