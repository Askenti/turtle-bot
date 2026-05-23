/**
 * Glitch-bar parameters — randomized ONCE at module load, not on every
 * render. The previous version called Math.random() inside the JSX,
 * which violates react-hooks/purity and produces a different set of
 * bars on every re-render (visual jitter you can sometimes catch).
 */
const GLITCH_BARS = Array.from({ length: 25 }, (_, i) => ({
  left:     (i * 4) + Math.random() * 2,
  width:    1 + Math.random() * 2,
  opacity:  0.15 + Math.random() * 0.25,
  duration: 3 + Math.random() * 2,
  delay:    Math.random() * 3,
}));

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
      className="min-h-screen relative flex items-center overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Vertical glitch bars overlay - subtle and tasteful */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {GLITCH_BARS.map((bar, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0"
            style={{
              left: `${bar.left}%`,
              width: `${bar.width}px`,
              backgroundColor: '#0a0a0a',
              opacity: bar.opacity,
              animation: `glitch-bar ${bar.duration}s ease-in-out infinite`,
              animationDelay: `${bar.delay}s`,
            }}
          />
        ))}
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
