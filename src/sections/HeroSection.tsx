export default function HeroSection() {
  const handleExplore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const nav = (window as unknown as Record<string, unknown>).elevatorNavigate as ((id: string) => void) | undefined;
    if (nav) {
      nav('solution');
    } else {
      document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="hero-shader min-h-screen relative flex items-center overflow-hidden"
    >
      {/* ── Wave shader background ──
          Three stacked SVG sine-waves drifting at different speeds.
          Each layer uses a wider-than-viewport path and translates
          horizontally; when the translation equals one period the
          loop is visually seamless. Different blur values give the
          layers a sense of depth, like looking through water. */}
      <div className="hero-waves absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <svg className="hero-wave hero-wave-1" viewBox="0 0 2880 320" preserveAspectRatio="none">
          <path d="M0,160 C240,80 480,240 720,160 C960,80 1200,240 1440,160 C1680,80 1920,240 2160,160 C2400,80 2640,240 2880,160 L2880,320 L0,320 Z" />
        </svg>
        <svg className="hero-wave hero-wave-2" viewBox="0 0 2880 320" preserveAspectRatio="none">
          <path d="M0,200 C240,120 480,280 720,200 C960,120 1200,280 1440,200 C1680,120 1920,280 2160,200 C2400,120 2640,280 2880,200 L2880,320 L0,320 Z" />
        </svg>
        <svg className="hero-wave hero-wave-3" viewBox="0 0 2880 320" preserveAspectRatio="none">
          <path d="M0,240 C240,180 480,300 720,240 C960,180 1200,300 1440,240 C1680,180 1920,300 2160,240 C2400,180 2640,300 2880,240 L2880,320 L0,320 Z" />
        </svg>
      </div>

      {/* Content container */}
      <div className="relative z-30 w-full px-8 md:px-16 lg:px-24">
        <div className="max-w-[1400px]">

          {/* Oversized headline - distressed serif style */}
          <h1
            className="hero-up font-display font-black uppercase leading-[0.85] tracking-tight"
            style={{
              color: '#c9b99a',
              fontSize: 'clamp(5rem, 18vw, 16rem)',
              textShadow: '0 0 80px rgba(201, 185, 154, 0.15)',
              animationDuration: '1s',
            }}
          >
            <span className="block animate-text-flicker">WAR</span>
            <span className="block -mt-4 md:-mt-8 lg:-mt-12">DEN</span>
          </h1>

          {/* Vertical accent bar with subtle pulse */}
          <div
            className="hero-fade hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[35vh]"
            style={{
              backgroundColor: 'rgba(201, 185, 154, 0.4)',
              animationDelay: '0.6s',
            }}
          />

          {/* Subtext */}
          <div
            className="hero-up mt-8 md:mt-12 max-w-md"
            style={{ animationDelay: '0.8s', animationDuration: '700ms' }}
          >
            <p
              className="text-sm md:text-base tracking-[0.3em] uppercase font-mono"
              style={{ color: '#c9b99a', opacity: 0.7 }}
            >
              Your Silent Hotel Guardian
            </p>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: 'rgba(201, 185, 154, 0.5)' }}
            >
              Autonomous AI-powered robotic ecosystem. Detects threats, monitors conditions, interacts with guests.
            </p>
          </div>

          {/* Minimal CTA */}
          <div
            className="hero-up mt-12"
            style={{ animationDelay: '1s', animationDuration: '700ms' }}
          >
            <a
              href="#solution"
              onClick={handleExplore}
              className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase font-mono group"
              style={{ color: '#c9b99a' }}
            >
              <span>Explore System</span>
              <span
                className="w-8 h-[1px] transition-all duration-300 group-hover:w-12"
                style={{ backgroundColor: '#c9b99a' }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ backgroundColor: 'rgba(201, 185, 154, 0.1)' }}
      />

      {/* Corner markers - minimal HUD aesthetic */}
      <div
        className="absolute bottom-8 right-8 md:right-16 text-xs font-mono tracking-widest"
        style={{ color: 'rgba(201, 185, 154, 0.3)' }}
      >
        01
      </div>
    </section>
  );
}
