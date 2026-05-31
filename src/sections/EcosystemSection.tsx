import { useScrollReveal } from '../lib/useScrollReveal';

interface EcosystemMode {
  number: string;
  title: string;
  description: string;
  features: string[];
}

const MODES: EcosystemMode[] = [
  {
    number: 'I',
    title: 'Inspection Mode',
    description:
      'Autonomous room inspection powered by AI vision, environmental monitoring, and multi-sensor threat detection.',
    features: [
      'Hidden camera detection',
      'Room condition analysis',
      'Safety compliance checks',
    ],
  },
  {
    number: 'II',
    title: 'Assistant Mode',
    description:
      'Interactive AI concierge system designed to support guests and hotel staff through intelligent assistance.',
    features: [
      'AI-powered interaction',
      'Room guidance',
      'Smart operational support',
    ],
  },
  {
    number: 'III',
    title: 'Response Mode',
    description:
      'Real-time anomaly reporting and centralized coordination for faster operational response.',
    features: [
      'Instant alerts',
      'Dashboard synchronization',
      'Staff coordination',
    ],
  },
];

export default function EcosystemSection() {
  const [ref, revealed] = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="ecosystem"
      data-revealed={revealed}
      className="relative bg-spectra-cream-deep py-16 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Soft radial light from top-right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 85% 15%, rgba(214,225,232,0.55) 0%, transparent 60%)',
        }}
      />
      <div className="absolute top-0 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 h-px bg-spectra-hairline" />

      <div className="relative max-w-[1400px] mx-auto">

        {/* ── Section header ── */}
        <div className="grid grid-cols-12 gap-8 mb-12 md:mb-24">
          <div className="col-span-12 lg:col-span-3">
            <div className="s-up flex items-center gap-3">
              <span className="w-6 h-px bg-spectra-ink/40" />
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase bg-spectra-ink text-spectra-cream px-3 py-1.5 rounded-md font-semibold">
                02 · The Ecosystem
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <h2 className="s-up s-d1 font-editorial font-light text-spectra-ink leading-[1.05] tracking-[-0.02em] mb-6"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 4rem)' }}>
              One Intelligent Ecosystem<br />
              <span className="italic text-spectra-ink-soft">for Modern Hospitality.</span>
            </h2>
            <p className="s-up s-d2 max-w-2xl text-base md:text-[17px] leading-[1.7] text-spectra-ink-mute">
              WARDEN combines autonomous inspection, AI-powered assistance, and
              real-time operational response within a unified smart hospitality platform.
            </p>
          </div>
        </div>

        {/* ── Diagram: WARDEN Core ── */}
        <div className="relative flex flex-col items-center mb-16 md:mb-20">

          {/* Core hub */}
          <div className="s-fade s-d3 relative z-10 mb-12 md:mb-20">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Static outer + mid rings */}
              <span className="absolute inset-0 rounded-full border border-spectra-ink/12" />
              <span className="absolute inset-5 rounded-full border border-spectra-ink/15 bg-spectra-pearl/40" />
              {/* Inner disc — the actual chip */}
              <div className="absolute inset-10 rounded-full bg-spectra-pearl border border-spectra-hairline
                              shadow-[0_18px_50px_-15px_rgba(10,14,18,0.18),0_4px_12px_-4px_rgba(10,14,18,0.08)]
                              flex flex-col items-center justify-center spectra-pulse">
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-spectra-ink-faint mb-1.5">
                  WARDEN
                </span>
                <span className="font-editorial italic text-spectra-ink text-[15px] tracking-tight">
                  Core
                </span>
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-spectra-ink" />
              </div>
            </div>
          </div>

          {/* ── Desktop fan-out connection lines ── */}
          <svg
            className="absolute top-[210px] md:top-[280px] left-1/2 -translate-x-1/2 z-0 hidden md:block pointer-events-none"
            width="980"
            height="200"
            viewBox="0 0 980 200"
            fill="none"
            aria-hidden="true"
          >
            <path d="M430 8 C 360 60, 240 120, 165 196" stroke="rgba(10,14,18,0.16)" strokeWidth="1" />
            <path d="M490 8 L 490 196"                  stroke="rgba(10,14,18,0.16)" strokeWidth="1" />
            <path d="M550 8 C 620 60, 740 120, 815 196" stroke="rgba(10,14,18,0.16)" strokeWidth="1" />
            <path className="spectra-glow" d="M430 8 C 360 60, 240 120, 165 196"
                  stroke="rgba(10,14,18,0.5)" strokeWidth="1.2" strokeLinecap="round" />
            <path className="spectra-glow" d="M490 8 L 490 196"
                  stroke="rgba(10,14,18,0.5)" strokeWidth="1.2" strokeLinecap="round"
                  style={{ animationDelay: '-1s' }} />
            <path className="spectra-glow" d="M550 8 C 620 60, 740 120, 815 196"
                  stroke="rgba(10,14,18,0.5)" strokeWidth="1.2" strokeLinecap="round"
                  style={{ animationDelay: '-2s' }} />
            <circle cx="430" cy="8" r="2.5" fill="rgba(10,14,18,0.4)" />
            <circle cx="490" cy="8" r="2.5" fill="rgba(10,14,18,0.4)" />
            <circle cx="550" cy="8" r="2.5" fill="rgba(10,14,18,0.4)" />
            <circle cx="165" cy="196" r="3.5" fill="rgba(10,14,18,0.55)" />
            <circle cx="490" cy="196" r="3.5" fill="rgba(10,14,18,0.55)" />
            <circle cx="815" cy="196" r="3.5" fill="rgba(10,14,18,0.55)" />
          </svg>

          {/* ── Mobile vertical connector (replaces fan-out on small screens) ── */}
          <div className="flex flex-col items-center md:hidden -mt-4 mb-4 gap-0">
            {[0, 1, 2].map((i) => (
              <svg key={i} width="2" height="40" viewBox="0 0 2 40" fill="none" aria-hidden="true">
                <line x1="1" y1="0" x2="1" y2="40"
                      stroke="rgba(10,14,18,0.18)" strokeWidth="1" />
                <circle r="2.5" cx="1" fill="rgba(10,14,18,0.55)"
                        className="signal-dot"
                        style={{ offsetPath: "path('M1 0 L1 40')", animationDelay: `${-i * 0.9}s` } as React.CSSProperties} />
              </svg>
            ))}
          </div>

          {/* ── Three mode cards ── */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 w-full max-w-[1100px]">
            {MODES.map((m, i) => (
              <article
                key={m.title}
                className={`s-up s-d${i + 4}
                            group relative bg-spectra-pearl rounded-2xl p-6 md:p-8
                            border border-spectra-hairline backdrop-blur-sm
                            transition-all duration-500 ease-smooth
                            hover:-translate-y-1
                            hover:shadow-[0_22px_50px_-15px_rgba(10,14,18,0.20),0_6px_15px_-5px_rgba(10,14,18,0.08)]
                            hover:border-spectra-mist-deep/40`}
                style={{
                  background:
                    'linear-gradient(160deg, rgba(251,250,247,0.95) 0%, rgba(214,225,232,0.35) 100%)',
                }}
              >
                {/* Mode marker */}
                <div className="flex items-center justify-between mb-7">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full
                                   bg-spectra-ink text-spectra-cream font-editorial italic text-[15px] tracking-tight">
                    {m.number}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-spectra-ink-faint">
                    Mode
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-editorial text-xl md:text-2xl text-spectra-ink mb-3 tracking-tight">
                  {m.title}
                </h3>

                {/* Description */}
                <p className="text-[14px] leading-[1.65] text-spectra-ink-mute mb-6">
                  {m.description}
                </p>

                {/* Feature list */}
                <ul className="space-y-2.5 pt-5 border-t border-spectra-hairline">
                  {m.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[13px] text-spectra-ink-soft">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-spectra-mist-deep shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        {/* ── Closing line ── */}
        <p className="s-fade s-d7 max-w-2xl mx-auto text-center font-editorial italic text-spectra-ink-soft text-lg md:text-xl leading-[1.5]">
          Designed as a scalable hospitality ecosystem, WARDEN bridges physical
          hotel operations with intelligent digital infrastructure.
        </p>
      </div>
    </section>
  );
}
