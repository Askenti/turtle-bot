import { useState } from 'react';
import { useScrollReveal } from '../lib/useScrollReveal';

/**
 * DashboardSection — section 06 of the Spectra redesign.
 *
 * Swap YT_ID below with your YouTube video ID when ready.
 * The thumbnail auto-loads from YouTube; clicking plays inline.
 */

// ── Replace this ID with your YouTube video ID ──────────────────────────────
const YT_ID = '6mOz8B1wdkE';
// ─────────────────────────────────────────────────────────────────────────────

function DashboardVideo() {
  const [playing, setPlaying] = useState(false);

  if (!YT_ID) {
    // Placeholder shown before a video ID is set
    return (
      <div className="aspect-video bg-spectra-ink/5 flex flex-col items-center justify-center gap-4 py-20">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="22" stroke="rgba(10,14,18,0.2)" strokeWidth="1.5" />
          <path d="M19 16 L32 24 L19 32 Z" fill="rgba(10,14,18,0.25)" />
        </svg>
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-spectra-ink-faint text-center">
          Видео скоро появится
        </p>
      </div>
    );
  }

  if (playing) {
    return (
      <div className="aspect-video bg-spectra-ink">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&mute=1&rel=0&modestbranding=1&color=white&iv_load_policy=3`}
          title="WARDEN Dashboard Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-video bg-spectra-ink overflow-hidden group cursor-pointer"
      onClick={() => setPlaying(true)}
    >
      {/* YouTube max-res thumbnail */}
      <img
        src={`https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`}
        alt="WARDEN Dashboard Demo thumbnail"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-spectra-ink/30 group-hover:bg-spectra-ink/20 transition-colors duration-300" />

      {/* Play button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 rounded-full bg-spectra-ink/90 backdrop-blur-sm
                        flex items-center justify-center
                        shadow-[0_18px_40px_-10px_rgba(10,14,18,0.5)]
                        group-hover:scale-110 group-hover:bg-spectra-ink
                        transition-all duration-300">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M7 4 L 18 11 L 7 18 Z" fill="white" />
          </svg>
        </div>
        <span className="font-mono text-[11px] tracking-[0.25em] uppercase
                         bg-spectra-ink/80 backdrop-blur-sm text-spectra-cream
                         px-3 py-1.5 rounded-md font-semibold">
          Play Demo
        </span>
      </div>
    </div>
  );
}

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
        <div className="grid grid-cols-12 gap-y-6 md:gap-8 mb-12 md:mb-24">
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

        {/* ── Video frame ── */}
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
              warden.app · dashboard · demo
            </div>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint hidden sm:inline">
              ◦ Demo
            </span>
          </div>

          <DashboardVideo />
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
