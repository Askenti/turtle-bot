export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center justify-center text-warden-beige px-6 py-24 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 50% 40%, #103E42 0%, #0A2E33 50%, #051E22 100%)',
      }}
    >
      {/* Cyan grid */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,240,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,240,255,0.6) 0px, rgba(0,240,255,0.6) 1px, transparent 1px, transparent 4px)',
        }}
      />

      {/* Glow halos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-warden-cyan/[0.10] blur-3xl rounded-full pointer-events-none" />

      {/* Cinematic letterbox edges */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-warden-teal-deep to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-warden-teal-deep to-transparent pointer-events-none z-10" />

      {/* HUD reticle corners */}
      <div className="absolute top-24 left-6 md:left-12 w-4 h-4 border-t border-l border-warden-cyan/40 pointer-events-none" />
      <div className="absolute top-24 right-6 md:right-12 w-4 h-4 border-t border-r border-warden-cyan/40 pointer-events-none" />
      <div className="absolute bottom-32 left-6 md:left-12 w-4 h-4 border-b border-l border-warden-cyan/40 pointer-events-none" />
      <div className="absolute bottom-32 right-6 md:right-12 w-4 h-4 border-b border-r border-warden-cyan/40 pointer-events-none" />

      {/* Content */}
      <div className="max-w-[1000px] mx-auto w-full relative z-20 text-center">

        {/* ── Boot sequence ── */}
        <div className="inline-block text-left mb-10 font-mono text-[11px] md:text-[13px] tracking-wide leading-relaxed">
          <p className="boot-line text-warden-beige/50">
            // WARDEN_OS v2.6 — BOOT SEQUENCE INITIATED
          </p>
          <p className="boot-line text-warden-beige/50">
            // SENSOR_ARRAY: <span className="status-ok font-semibold">ONLINE</span>
          </p>
          <p className="boot-line text-warden-beige/50">
            // ANOMALY_DETECTION: <span className="status-ok font-semibold">ACTIVE</span>
          </p>
          <p className="boot-line text-warden-beige/50">
            // GUEST_PROTECTION: <span className="status-ok font-semibold">ENGAGED</span>
          </p>
        </div>

        {/* ── Wordmark — boot glow-in ── */}
        <h1
          className="boot-title font-display font-black text-warden-beige mb-3"
          style={{
            fontSize: 'clamp(4rem, 13vw, 9.5rem)',
            lineHeight: 1,
            letterSpacing: '0.06em',
            textShadow:
              '0 0 40px rgba(0,240,255,0.4), 0 0 90px rgba(0,240,255,0.18)',
          }}
        >
          WARDEN
        </h1>

        {/* ── Tagline ── */}
        <p
          className="boot-after-title delay-1 font-display text-warden-cyan tracking-[0.5em] uppercase mb-10"
          style={{ fontSize: 'clamp(0.7rem, 1.6vw, 1rem)', textShadow: '0 0 12px rgba(0,240,255,0.5)' }}
        >
          Your Silent Hotel Guardian
        </p>

        {/* ── Description ── */}
        <p className="boot-after-title delay-2 max-w-2xl mx-auto text-warden-beige/70 text-sm md:text-base leading-relaxed mb-8">
          An autonomous AI-powered robotic ecosystem that detects hidden threats,
          monitors room conditions, and interacts with guests — all within a unified
          hotel management platform.
        </p>

        {/* ── Mode badges ── */}
        <div className="boot-after-title delay-3 flex flex-wrap justify-center gap-3 mb-10">
          {['INSPECTOR_MODE', 'ASSISTANT_MODE', 'RESPONSE_MODE'].map((mode) => (
            <span
              key={mode}
              className="font-mono text-[10px] tracking-[0.25em] uppercase text-warden-cyan border border-warden-cyan-dim/60 px-3 py-1.5 rounded-sm bg-warden-teal-deep/40"
            >
              ■ {mode}
            </span>
          ))}
        </div>

        {/* ── Dual CTAs ── */}
        <div className="boot-after-title delay-4 flex flex-wrap justify-center gap-4">
          <a
            href="#solution"
            onClick={(e) => {
              e.preventDefault();
              const nav = (window as unknown as Record<string, unknown>).elevatorNavigate as ((id: string) => void) | undefined;
              nav ? nav('solution') : document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-mono text-xs tracking-[0.2em] uppercase px-6 py-3 bg-warden-cyan text-warden-teal-deep font-semibold hover:bg-warden-cyan-bright transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)]"
          >
            Explore System →
          </a>
          <a
            href="#problem"
            onClick={(e) => {
              e.preventDefault();
              const nav = (window as unknown as Record<string, unknown>).elevatorNavigate as ((id: string) => void) | undefined;
              nav ? nav('problem') : document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-mono text-xs tracking-[0.2em] uppercase px-6 py-3 border border-warden-cyan-dim/70 text-warden-cyan hover:border-warden-cyan hover:bg-warden-cyan/5 transition-all duration-300"
          >
            View Threat Brief
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] tracking-[0.4em] uppercase text-warden-cyan/60 scroll-pulse">
        ▼ Scroll to Initialize ▼
      </div>
    </section>
  );
}
