import { useScrollReveal } from '../lib/useScrollReveal';

const VERIFIED_PILLARS = [
  { label: 'Privacy',      sub: 'Guest data protected on-device' },
  { label: 'Inspection',   sub: 'Audited multi-sensor verification' },
  { label: 'Transparency', sub: 'Operational trail for every room' },
];

// ── The WARDEN Verified medallion ─────────────────────────────────────────────
function VerifiedMedallion() {
  return (
    <div className="relative w-full max-w-[260px] md:max-w-[320px] aspect-square mx-auto">
      {/* Outer ring — text-on-circle effect */}
      <svg viewBox="0 0 320 320" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {/* Outer faint ring */}
        <circle cx="160" cy="160" r="156" stroke="rgba(10,14,18,0.10)" strokeWidth="1" fill="none" />
        {/* Inner heavy ring */}
        <circle cx="160" cy="160" r="140" stroke="rgba(10,14,18,0.6)" strokeWidth="1.2" fill="none" />
        {/* Sun rays — radial ticks */}
        {Array.from({ length: 36 }).map((_, i) => {
          const angle = (i * 360) / 36;
          const long = i % 3 === 0;
          return (
            <line
              key={i}
              x1="160"
              y1="20"
              x2="160"
              y2={long ? 30 : 26}
              stroke="rgba(10,14,18,0.45)"
              strokeWidth={long ? 1 : 0.7}
              transform={`rotate(${angle} 160 160)`}
            />
          );
        })}
        {/* Curved text path — top half */}
        <defs>
          <path id="medallion-top" d="M 50 160 A 110 110 0 0 1 270 160" />
          <path id="medallion-bottom" d="M 60 160 A 100 100 0 0 0 260 160" />
        </defs>
        <text
          fontFamily="'JetBrains Mono', monospace"
          fontSize="11"
          fill="#0A0E12"
          letterSpacing="6"
        >
          <textPath href="#medallion-top" startOffset="50%" textAnchor="middle">
            WARDEN · VERIFIED · WARDEN · VERIFIED
          </textPath>
        </text>
        <text
          fontFamily="'JetBrains Mono', monospace"
          fontSize="9"
          fill="rgba(10,14,18,0.45)"
          letterSpacing="4"
        >
          <textPath href="#medallion-bottom" startOffset="50%" textAnchor="middle">
            HOSPITALITY · TRUST · STANDARD
          </textPath>
        </text>
      </svg>

      {/* Inner disc */}
      <div className="absolute inset-[36px] md:inset-[44px] rounded-full bg-spectra-pearl
                      border border-spectra-hairline
                      shadow-[0_22px_60px_-20px_rgba(10,14,18,0.25),inset_0_1px_0_rgba(255,255,255,0.7)]
                      flex flex-col items-center justify-center spectra-pulse">
        {/* Check icon */}
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
          <circle cx="22" cy="22" r="20" stroke="#0A0E12" strokeWidth="1.2" fill="none" />
          <path d="M14 22 L 20 28 L 30 16" stroke="#0A0E12" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="font-editorial italic text-spectra-ink text-[19px] tracking-tight mt-3">
          Verified
        </p>
      </div>
    </div>
  );
}

export default function BusinessSection() {
  const [ref, revealed] = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="business"
      data-revealed={revealed}
      className="relative bg-spectra-cream-deep py-16 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Soft mist halo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 50% 70%, rgba(214,225,232,0.55) 0%, transparent 60%)',
        }}
      />
      <div className="absolute top-0 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 h-px bg-spectra-hairline" />

      <div className="relative max-w-[1400px] mx-auto">

        {/* ── Header ── */}
        <div className="grid grid-cols-12 gap-y-6 md:gap-8 mb-12 md:mb-24">
          <div className="col-span-12 lg:col-span-3">
            <div className="s-up flex items-center gap-3 mb-6 lg:mb-0">
              <span className="w-6 h-px bg-spectra-ink/40" />
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase bg-spectra-ink text-spectra-cream px-3 py-1.5 rounded-md font-semibold">
                08 · Business Value
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <h2 className="s-up s-d1 font-editorial font-light text-spectra-ink leading-[1.05] tracking-[-0.02em] mb-6"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 4rem)' }}>
              Smarter Operations.<br />
              <span className="italic text-spectra-ink-soft">Greater Guest Trust.</span>
            </h2>
            <p className="s-up s-d2 max-w-2xl text-base md:text-[17px] leading-[1.7] text-spectra-ink-mute">
              WARDEN improves operational efficiency while helping hotels deliver
              safer and more trusted guest experiences.
            </p>
          </div>
        </div>

        {/* ── WARDEN Verified centerpiece ── */}
        <div className="s-up s-d6 relative rounded-3xl overflow-hidden border border-spectra-hairline"
             style={{ background: 'linear-gradient(180deg, #FBFAF7 0%, #EAF1F6 100%)' }}>
          <div className="px-6 md:px-10 lg:px-16 py-16 md:py-24">
            <div className="grid grid-cols-12 gap-y-8 md:gap-10 items-center">

              {/* Medallion */}
              <div className="col-span-12 lg:col-span-5 flex justify-center">
                <VerifiedMedallion />
              </div>

              {/* Text */}
              <div className="col-span-12 lg:col-span-7">
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-6 h-px bg-spectra-ink/30" />
                  <span className="font-mono text-[11px] tracking-[0.25em] uppercase bg-spectra-ink text-spectra-cream px-3 py-1.5 rounded-md font-semibold">
                    The Standard
                  </span>
                </div>

                <h3 className="font-editorial font-light text-spectra-ink leading-[1.1] tracking-[-0.02em] mb-6"
                    style={{ fontSize: 'clamp(1.35rem, 3.5vw, 2.5rem)' }}>
                  WARDEN <span className="italic text-spectra-ink-soft">Verified.</span>
                </h3>

                <p className="text-[15.5px] leading-[1.7] text-spectra-ink-mute mb-8 max-w-lg">
                  A future-ready hospitality trust standard focused on intelligent
                  safety, privacy, and operational transparency — a quiet seal that
                  guests can recognise across properties.
                </p>

                {/* Three verified pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {VERIFIED_PILLARS.map((p) => (
                    <div key={p.label}
                         className="rounded-xl bg-spectra-pearl border border-spectra-hairline p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M3 6 L 5 8 L 9 4" stroke="#0A0E12" strokeWidth="1.4"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-editorial text-[14px] text-spectra-ink tracking-tight">
                          {p.label}
                        </span>
                      </div>
                      <p className="text-[11.5px] leading-[1.5] text-spectra-ink-mute">
                        {p.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Closing line */}
        <p className="s-fade s-d8 max-w-3xl mx-auto mt-20 text-center font-editorial italic text-spectra-ink-soft text-lg md:text-xl leading-[1.5]">
          A quieter standard of trust — one guests feel before they see it.
        </p>
      </div>
    </section>
  );
}
