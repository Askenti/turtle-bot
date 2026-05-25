import { useScrollReveal } from '../lib/useScrollReveal';

interface Milestone {
  year: string;
  phase: string;
  title: string;
  description: string;
  /** 1 = nearest / dimmest, 4 = furthest / most luminous */
  intensity: 1 | 2 | 3 | 4;
}

const MILESTONES: Milestone[] = [
  {
    year: '2026',
    phase: 'Phase I',
    title: 'Pilot Deployment',
    description: 'Pilot hotel deployment and continuous system optimisation in Incheon.',
    intensity: 1,
  },
  {
    year: '2027',
    phase: 'Phase II',
    title: 'AI Automation & PMS',
    description: 'Expanded AI automation, hotel-chain rollout, and property-management-system integration.',
    intensity: 2,
  },
  {
    year: '2028',
    phase: 'Phase III',
    title: 'Smart Hotel Network',
    description: 'Networked properties with predictive analytics and the WARDEN Verified standard.',
    intensity: 3,
  },
  {
    year: '2029+',
    phase: 'Beyond',
    title: 'Cross-Industry Expansion',
    description: 'Public institutions, healthcare facilities, and smart-building deployments worldwide.',
    intensity: 4,
  },
];

/** Per-intensity card classes — softens nearer milestones, brightens distant ones. */
const intensityStyles: Record<Milestone['intensity'], {
  card:   string;
  year:   string;
  node:   string;
  yearSize: string;
  glow:   string;
}> = {
  1: {
    card:   'bg-spectra-pearl border-spectra-hairline',
    year:   'text-spectra-ink-soft',
    node:   'bg-spectra-ink/20',
    yearSize: 'clamp(2.5rem, 5vw, 4rem)',
    glow:   '',
  },
  2: {
    card:   'bg-spectra-pearl border-spectra-ink/15',
    year:   'text-spectra-ink',
    node:   'bg-spectra-ink/40',
    yearSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
    glow:   '',
  },
  3: {
    card:   'bg-spectra-pearl border-spectra-mist-deep/55',
    year:   'text-spectra-ink',
    node:   'bg-spectra-mist-deep',
    yearSize: 'clamp(3rem, 6vw, 5rem)',
    glow:   'shadow-[0_20px_50px_-15px_rgba(10,14,18,0.15)]',
  },
  4: {
    card:   'bg-gradient-to-br from-spectra-pearl to-spectra-mist/45 border-spectra-mist-deep',
    year:   'text-spectra-ink',
    node:   'bg-spectra-ink',
    yearSize: 'clamp(3.25rem, 6.5vw, 5.5rem)',
    glow:   'shadow-[0_30px_70px_-20px_rgba(10,14,18,0.30),0_8px_20px_-5px_rgba(180,198,210,0.4)]',
  },
};

export default function RoadmapSection() {
  const [ref, revealed] = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="roadmap"
      data-revealed={revealed}
      className="relative bg-spectra-cream-deep py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Soft glow that brightens toward the right — the "future" direction */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 95% 55%, rgba(180,198,210,0.55) 0%, transparent 65%)',
        }}
      />
      <div className="absolute top-0 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 h-px bg-spectra-hairline" />

      <div className="relative max-w-[1400px] mx-auto">

        {/* ── Header ── */}
        <div className="grid grid-cols-12 gap-8 mb-20 md:mb-24">
          <div className="col-span-12 lg:col-span-3">
            <div className="s-up flex items-center gap-3 mb-6 lg:mb-0">
              <span className="w-6 h-px bg-spectra-ink/40" />
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-spectra-ink-mute">
                10 · Roadmap
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <h2 className="s-up s-d1 font-editorial font-light text-spectra-ink leading-[1.05] tracking-[-0.02em] mb-6"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}>
              Expanding the Future<br />
              <span className="italic text-spectra-ink-soft">of Trusted Hospitality.</span>
            </h2>
            <p className="s-up s-d2 max-w-2xl text-base md:text-[17px] leading-[1.7] text-spectra-ink-mute">
              From a single pilot hotel in Incheon to cross-industry deployments —
              a four-year arc, then the open horizon.
            </p>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* Desktop horizontal rail */}
          <div
            className="hidden lg:block absolute top-[42px] left-[6%] right-[6%] h-px pointer-events-none"
            aria-hidden="true"
          >
            <div className="relative h-full">
              <div className="absolute inset-0"
                   style={{
                     background:
                       'linear-gradient(to right, rgba(10,14,18,0.25), rgba(10,14,18,0.4) 35%, rgba(180,198,210,0.75) 70%, rgba(10,14,18,0.15) 100%)',
                   }} />
            </div>
          </div>

          {/* Cards */}
          <ol className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
            {MILESTONES.map((m, i) => {
              const s = intensityStyles[m.intensity];
              return (
                <li key={m.year} className={`s-up s-d${i + 3} relative`}>

                  {/* Node — desktop only */}
                  <div className="hidden lg:flex absolute -top-[11px] left-1/2 -translate-x-1/2 items-center justify-center z-10">
                    <span className={`block w-3.5 h-3.5 rounded-full ${s.node} ring-4 ring-spectra-cream-deep`} />
                  </div>

                  {/* Card */}
                  <article
                    className={`group h-full rounded-2xl p-6 pt-10 lg:pt-12 ${s.card} ${s.glow}
                               border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                               hover:-translate-y-1`}
                  >
                    {/* Phase eyebrow */}
                    <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-spectra-ink-faint mb-4">
                      {m.phase} {m.intensity === 4 && '· ◇'}
                    </p>

                    {/* Year */}
                    <p className={`font-editorial font-light leading-none tracking-[-0.02em] mb-5 ${s.year}`}
                       style={{ fontSize: s.yearSize }}>
                      {m.year}
                    </p>

                    {/* Title */}
                    <h3 className="font-editorial text-[17px] text-spectra-ink mb-3 tracking-tight leading-tight">
                      {m.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] leading-[1.65] text-spectra-ink-mute">
                      {m.description}
                    </p>

                    {/* Intensity-4 special detail — distant horizon hint */}
                    {m.intensity === 4 && (
                      <p className="mt-6 pt-4 border-t border-spectra-ink/15 font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-mute">
                        Open Horizon
                      </p>
                    )}
                  </article>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Closing — extends the rail visually with a → off-page suggestion */}
        <div className="s-fade s-d8 mt-16 md:mt-20 flex items-center justify-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-spectra-ink-mute">
            The road continues
          </span>
          <span className="w-12 h-px bg-gradient-to-r from-spectra-ink/30 to-transparent" />
          <span className="w-1 h-1 rounded-full bg-spectra-ink/20" />
        </div>
      </div>
    </section>
  );
}
