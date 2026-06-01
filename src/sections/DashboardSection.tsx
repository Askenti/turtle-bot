import { useScrollReveal } from '../lib/useScrollReveal';

/**
 * DashboardSection — section 06 of the Spectra redesign.
 *
 * The centerpiece is the live WARDEN Operations Dashboard embedded via iframe.
 * Source: https://thewarden.lovable.app/dashboard
 */

export default function DashboardSection() {
  const [ref, revealed] = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="dashboard"
      data-revealed={revealed}
      className="relative bg-spectra-cream-deep py-16 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Soft mist halo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 25%, rgba(214,225,232,0.55) 0%, transparent 60%)',
        }}
      />
      <div className="absolute top-0 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 h-px bg-spectra-hairline" />

      <div className="relative max-w-[1400px] mx-auto">

        {/* ── Header ── */}
        <div className="grid grid-cols-12 gap-8 mb-12 md:mb-24">
          <div className="col-span-12 lg:col-span-3">
            <div className="s-up flex items-center gap-3 mb-6 lg:mb-0">
              <span className="w-6 h-px bg-spectra-ink/40" />
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase bg-spectra-ink text-spectra-cream px-3 py-1.5 rounded-md font-semibold">
                06 · Dashboard
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <h2 className="s-up s-d1 font-editorial font-light text-spectra-ink leading-[1.05] tracking-[-0.02em] mb-6"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 4rem)' }}>
              Centralised Intelligence<br />
              <span className="italic text-spectra-ink-soft">for Hotel Operations.</span>
            </h2>
            <p className="s-up s-d2 max-w-2xl text-base md:text-[17px] leading-[1.7] text-spectra-ink-mute">
              WARDEN transforms inspection data into real-time operational insights
              through a centralised AI-powered monitoring dashboard.
            </p>
          </div>
        </div>

        {/* ── Browser-framed live dashboard ── */}
        <div className="s-up s-d3 relative rounded-3xl overflow-hidden border border-spectra-hairline bg-spectra-pearl
                        shadow-[0_40px_100px_-30px_rgba(10,14,18,0.25),0_12px_30px_-10px_rgba(10,14,18,0.10)]">

          {/* Browser chrome */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-spectra-hairline bg-spectra-cream/40 backdrop-blur-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-spectra-ink/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-spectra-ink/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-spectra-ink/15" />
            </div>
            <div className="flex-1 mx-4 max-w-xl mx-auto bg-spectra-pearl rounded-md border border-spectra-hairline px-3 py-1
                            font-mono text-[10px] tracking-[0.18em] text-spectra-ink-faint text-center">
              thewarden.lovable.app · dashboard
            </div>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint hidden sm:inline">
              ◦ Connected
            </span>
          </div>

          {/* ── Live dashboard iframe ── */}
          <iframe
            src="https://thewarden.lovable.app/dashboard"
            title="WARDEN Operations Dashboard"
            className="w-full h-[600px] md:h-[750px] lg:h-[820px] border-0 bg-spectra-cream"
            allow="fullscreen"
            loading="lazy"
          />
        </div>

        {/* Closing line */}
        <p className="s-fade s-d6 max-w-3xl mx-auto mt-16 text-center font-editorial italic text-spectra-ink-soft text-lg md:text-xl leading-[1.5]">
          One console for every inspection, every room, every floor —
          delivered in real time.
        </p>
      </div>
    </section>
  );
}
