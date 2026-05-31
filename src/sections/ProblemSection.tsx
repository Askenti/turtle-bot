import { useScrollReveal } from '../lib/useScrollReveal';
import CountUp from '../lib/CountUp';

interface ProblemCard {
  number: string;
  title: string;
  description: string;
}

const PROBLEMS: ProblemCard[] = [
  {
    number: '01',
    title: 'Hidden Camera Risks',
    description:
      'Growing concerns over illegal surveillance devices and privacy violations inside hotel rooms.',
  },
  {
    number: '02',
    title: 'Inconsistent Manual Inspections',
    description:
      'Human-based inspections are time-consuming, subjective, and difficult to standardize across staff shifts.',
  },
  {
    number: '03',
    title: 'Fragmented Hotel Operations',
    description:
      'Disconnected monitoring, reporting, and communication systems reduce operational efficiency.',
  },
  {
    number: '04',
    title: 'Labor & Response Challenges',
    description:
      'Hotels face increasing labor shortages and delayed response coordination across daily operations.',
  },
];

interface Stat {
  /** React node for the headline value (can include CountUp) */
  value: React.ReactNode;
  label: string;
  caption: string;
}

const STATS: Stat[] = [
  {
    value: <CountUp to={58} suffix="%" />,
    label: 'Traveler Concern',
    caption:
      'Of travelers expressed concerns about the presence of hidden cameras in their commercial accommodation (Sharma, 2026). An increase of over 600% since 2010.',
  },
  {
    value: <CountUp to={17.9} decimals={1} prefix="↑ " suffix="%" />,
    label: 'CAGR',
    caption:
      'Projected growth of the smart hospitality robotics market through 2032 (Hospitality Robot Market Report, 2025).',
  },
  {
    value: '∞',
    label: 'Guest Trust',
    caption: 'Rising guest expectations for privacy, safety, and operational transparency.',
  },
];

export default function ProblemSection() {
  const [ref, revealed] = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="problem"
      data-revealed={revealed}
      className="relative bg-spectra-cream py-16 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Hairline at top of section for the rhythm */}
      <div className="absolute top-0 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 h-px bg-spectra-hairline" />

      <div className="max-w-[1400px] mx-auto">

        {/* ── Section header ── */}
        <div className="grid grid-cols-12 gap-8 mb-12 md:mb-28">
          <div className="col-span-12 lg:col-span-3">
            <div className="s-up flex items-center gap-3 mb-6 lg:mb-0">
              <span className="w-6 h-px bg-spectra-ink/40" />
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase bg-spectra-ink text-spectra-cream px-3 py-1.5 rounded-md font-semibold">
                01 · The Problem
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <h2 className="s-up s-d1 font-editorial font-light text-spectra-ink leading-[1.05] tracking-[-0.02em] mb-6"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 4rem)' }}>
              The Growing Trust Crisis<br />
              <span className="italic text-spectra-ink-soft">in Modern Hospitality.</span>
            </h2>
            <p className="s-up s-d2 max-w-2xl text-base md:text-[17px] leading-[1.7] text-spectra-ink-mute">
              As hotels adopt smarter technologies, guest privacy and operational
              security are becoming increasingly difficult to manage through
              fragmented systems and inconsistent manual inspections.
            </p>
          </div>
        </div>

        {/* ── Problem cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-14 md:mb-32">
          {PROBLEMS.map((p, i) => (
            <article
              key={p.number}
              className={`s-up s-d${Math.min(i + 2, 5)}
                          group relative bg-spectra-pearl rounded-2xl p-7 md:p-8
                          border border-spectra-hairline
                          transition-all duration-500 ease-smooth
                          hover:-translate-y-1
                          hover:shadow-[0_18px_40px_-12px_rgba(10,14,18,0.18),0_4px_10px_-4px_rgba(10,14,18,0.06)]
                          hover:border-spectra-mist-deep/40`}
            >
              {/* Card number */}
              <div className="flex items-center gap-3 mb-8">
                <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-spectra-ink-faint">
                  {p.number}
                </span>
                <span className="flex-1 h-px bg-spectra-hairline" />
              </div>

              {/* Title */}
              <h3 className="font-editorial text-xl md:text-[22px] leading-[1.2] text-spectra-ink mb-4 tracking-tight">
                {p.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] leading-[1.65] text-spectra-ink-mute">
                {p.description}
              </p>

              {/* Hover dot indicator */}
              <span className="spectra-bob absolute top-7 right-7 w-1.5 h-1.5 rounded-full bg-spectra-ink/20
                               transition-all duration-500 group-hover:bg-spectra-mist-deep group-hover:scale-150" />
            </article>
          ))}
        </div>

        {/* ── Statistics strip ── */}
        <div className="s-fade s-d6 relative">
          {/* Mist-blue panel */}
          <div
            className="rounded-3xl border border-spectra-hairline overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, #FBFAF7 0%, #EAF1F6 60%, #DBE7EE 100%)',
            }}
          >
            <div className="px-6 md:px-12 lg:px-16 py-8 md:py-16">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-10">
                <span className="w-6 h-px bg-spectra-ink/30" />
                <span className="font-mono text-[11px] tracking-[0.25em] uppercase bg-spectra-ink text-spectra-cream px-3 py-1.5 rounded-md font-semibold">
                  Industry Signals
                </span>
              </div>

              {/* 3-up stat grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {STATS.map((stat, i) => (
                  <div key={stat.label} className={`s-up s-d${i + 3} flex flex-col`}>
                    <span className="font-editorial font-light text-spectra-ink leading-none mb-4 tracking-[-0.02em]"
                          style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)' }}>
                      {stat.value}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-spectra-ink-mute mb-3">
                      {stat.label}
                    </span>
                    <p className="text-[13.5px] leading-[1.6] text-spectra-ink-mute max-w-xs">
                      {stat.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
