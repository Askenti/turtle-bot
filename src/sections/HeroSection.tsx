import { navigateToFloor } from '../data/floors';
import ParticleField from '../components/ParticleField';
import Magnetic from '../components/Magnetic';

/**
 * Hero — Luxury Smart Hospitality.
 *
 * Bright cream canvas, editorial Fraunces headline, generous whitespace.
 * No glitch bars, no scan lines, no robot. The "tech" is delivered via a
 * floating diagram panel on the right (Apple-style product page).
 */
export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center overflow-hidden bg-spectra-cream"
    >
      {/* Three.js floating dust-mote particles */}
      <ParticleField count={80} />

      {/* Subtle radial light from upper-left (luxury hospitality glow) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 18% 25%, rgba(214,225,232,0.55) 0%, transparent 60%)',
        }}
      />
      {/* Faint horizon line at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-spectra-hairline" />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20 md:py-40">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-8 md:gap-12 items-center">

          {/* ── Left: identity + copy + CTAs ── */}
          <div className="col-span-12 lg:col-span-7">

            {/* Eyebrow */}
            <div className="hero-fade flex items-center gap-3 mb-10" style={{ animationDelay: '120ms' }}>
              <span className="w-8 h-px bg-spectra-ink/40" />
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase bg-spectra-ink text-spectra-cream px-3 py-1.5 rounded-md font-semibold">
                Spectra · Smart Hospitality
              </span>
            </div>

            {/* Wordmark */}
            <h1
              className="hero-up spectra-shimmer relative z-20 font-editorial font-light text-spectra-ink leading-[0.92] tracking-[-0.04em] mb-6 -ml-1 md:-ml-3 lg:-ml-4"
              style={{
                fontSize: 'clamp(3rem, 11vw, 8.5rem)',
                animationDuration: '3.0s',
                fontVariationSettings: '"SOFT" 50',
              }}
            >
              WARDEN
            </h1>

            {/* Tagline — italic editorial */}
            <h2
              className="hero-up font-editorial italic text-spectra-ink-soft leading-tight tracking-tight mb-8"
              style={{
                fontSize: 'clamp(1.15rem, 3vw, 2.25rem)',
                animationDelay: '300ms',
                animationDuration: '900ms',
              }}
            >
              The Future of Trusted Hospitality.
            </h2>

            {/* Description */}
            <p
              className="hero-up max-w-xl text-base md:text-[17px] leading-[1.7] text-spectra-ink-mute mb-12"
              style={{ animationDelay: '500ms' }}
            >
              An autonomous smart hospitality ecosystem designed to enhance hotel
              security, operational awareness, and guest trust through AI-powered
              room inspection and multi-sensor threat detection.
            </p>

            {/* CTAs */}
            <div
              className="hero-up flex flex-wrap items-center gap-4"
              style={{ animationDelay: '700ms' }}
            >
              <Magnetic strength={14}>
                <button
                  onClick={() => navigateToFloor('contact')}
                  className="group inline-flex items-center gap-3 px-6 py-3.5
                             bg-spectra-ink text-spectra-cream rounded-full
                             text-sm tracking-[0.15em] uppercase font-mono
                             transition-[background-color,box-shadow] duration-300
                             hover:bg-spectra-ink-soft hover:shadow-[0_12px_30px_rgba(10,14,18,0.18)]"
                >
                  <span>Watch Demo</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </Magnetic>

              <Magnetic strength={12}>
                <button
                  onClick={() => navigateToFloor('ai')}
                  className="inline-flex items-center gap-3 px-6 py-3.5
                             border border-spectra-ink/20 rounded-full
                             text-sm tracking-[0.15em] uppercase font-mono text-spectra-ink
                             transition-[border-color] duration-300
                             hover:border-spectra-ink"
                >
                  <span>Explore Technology</span>
                </button>
              </Magnetic>
            </div>
          </div>

          {/* ── Right: floating tech ornament panel ── */}
          <div className="col-span-12 lg:col-span-5 mt-12 lg:mt-0">
            <div
              className="hero-fade spectra-float relative aspect-[3/4] max-w-[280px] sm:max-w-[340px] lg:max-w-[420px] mx-auto lg:ml-auto"
              style={{ animationDelay: '900ms', animationDuration: '1.4s' }}
            >
              {/* Panel — soft glass card with mist-blue overlay */}
              <div className="absolute inset-0 rounded-[24px] bg-spectra-pearl shadow-[0_30px_80px_-20px_rgba(10,14,18,0.18),0_8px_20px_-8px_rgba(10,14,18,0.08)] border border-spectra-hairline overflow-hidden">

                {/* Soft mist-blue gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(155deg, rgba(214,225,232,0.65) 0%, rgba(214,225,232,0) 55%, rgba(180,198,210,0.25) 100%)',
                  }}
                />

                {/* Top bar — fake dashboard chrome */}
                <div className="absolute top-0 left-0 right-0 flex items-center gap-2 px-5 py-4 border-b border-spectra-hairline">
                  <span className="w-1.5 h-1.5 rounded-full bg-spectra-ink/15" />
                  <span className="w-1.5 h-1.5 rounded-full bg-spectra-ink/15" />
                  <span className="w-1.5 h-1.5 rounded-full bg-spectra-ink/15" />
                  <span className="ml-auto font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint">
                    Inspection · Live
                  </span>
                </div>

                {/* Center — system silhouette */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
                  {/* Concentric circles indicating "scanning" */}
                  <div className="relative w-44 h-44 mb-8">
                    <span className="absolute inset-0 rounded-full border border-spectra-ink/10" />
                    <span className="absolute inset-4 rounded-full border border-spectra-ink/12" />
                    <span className="absolute inset-10 rounded-full border border-spectra-ink/14 bg-spectra-mist/40" />
                    <span className="absolute inset-16 rounded-full border border-spectra-ink/18 bg-spectra-mist-deep/25" />
                    {/* Pulse dot in center */}
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-spectra-ink shadow-[0_0_0_8px_rgba(10,14,18,0.06)]" />
                  </div>

                  {/* Stat rows */}
                  <div className="w-full space-y-3">
                    {[
                      { label: 'Optical',  value: 'Clear' },
                      { label: 'Thermal',  value: 'Stable' },
                      { label: 'RF Scan',  value: 'Nominal' },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between">
                        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-spectra-ink-faint">
                          {row.label}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-spectra-ink-soft">
                          ◦ {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom — quiet label */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-spectra-hairline flex items-center justify-between">
                  <span className="font-editorial italic text-xs text-spectra-ink-mute">
                    Room 412 · Clear
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint">
                    Verified
                  </span>
                </div>
              </div>

              {/* Floating mini-card behind the main one */}
              <div
                className="absolute -z-10 -bottom-6 -left-8 w-44 h-28 rounded-2xl bg-spectra-mist-deep/30 border border-spectra-hairline"
                style={{ backdropFilter: 'blur(2px)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quiet scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-spectra-ink-faint">
          Scroll
        </span>
        <span className="w-px h-8 bg-spectra-ink/20" />
      </div>
    </section>
  );
}
