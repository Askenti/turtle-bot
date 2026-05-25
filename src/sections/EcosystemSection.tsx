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
      className="relative bg-spectra-cream-deep py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
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
        <div className="grid grid-cols-12 gap-8 mb-20 md:mb-24">
          <div className="col-span-12 lg:col-span-3">
            <div className="s-up flex items-center gap-3">
              <span className="w-6 h-px bg-spectra-ink/40" />
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-spectra-ink-mute">
                02 · The Ecosystem
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <h2 className="s-up s-d1 font-editorial font-light text-spectra-ink leading-[1.05] tracking-[-0.02em] mb-6"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}>
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
            <div className="relative w-52 h-52 md:w-64 md:h-64">
              {/* Outer ring */}
              <span className="absolute inset-0 rounded-full border border-spectra-ink/12" />
              {/* Mid ring */}
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

          {/* ── Connection lines (desktop only) ── */}
          <svg
            className="absolute top-[180px] md:top-[210px] left-1/2 -translate-x-1/2 z-0 hidden md:block pointer-events-none"
            width="900"
            height="120"
            viewBox="0 0 900 120"
            fill="none"
            aria-hidden="true"
          >
            {/* center → card 1 (left) */}
            <path
              className="spectra-line"
              d="M450 10 Q 450 60 150 110"
              stroke="rgba(10,14,18,0.18)"
              strokeWidth="1"
              style={{ animationDelay: '0.6s' }}
            />
            {/* center → card 2 (middle) */}
            <path
              className="spectra-line"
              d="M450 10 L 450 110"
              stroke="rgba(10,14,18,0.18)"
              strokeWidth="1"
              style={{ animationDelay: '0.8s' }}
            />
            {/* center → card 3 (right) */}
            <path
              className="spectra-line"
              d="M450 10 Q 450 60 750 110"
              stroke="rgba(10,14,18,0.18)"
              strokeWidth="1"
              style={{ animationDelay: '1.0s' }}
            />
          </svg>

          {/* ── Three mode cards ── */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 w-full max-w-[1100px]">
            {MODES.map((m, i) => (
              <article
                key={m.title}
                className={`s-up s-d${i + 4}
                            group relative bg-spectra-pearl rounded-2xl p-7 md:p-8
                            border border-spectra-hairline backdrop-blur-sm
                            transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
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
                <h3 className="font-editorial text-2xl text-spectra-ink mb-3 tracking-tight">
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
