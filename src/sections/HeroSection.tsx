import { useEffect, useRef, useState } from 'react';
import FluidShader from '../components/FluidShader';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const glitchRef = useRef<{ left: string; width: string; opacity: number; delay: string; duration: string }[]>([]);

  // Generate glitch bars only once to avoid hydration flicker
  if (glitchRef.current.length === 0) {
    glitchRef.current = Array.from({ length: 20 }).map((_, i) => ({
      left:     `${(i * 5) + 0.5}%`,
      width:    `${1 + ((i * 7) % 3)}px`,
      opacity:  0.04 + ((i * 13) % 10) * 0.006,
      delay:    `${((i * 17) % 30) / 10}s`,
      duration: `${4 + ((i * 11) % 4)}s`,
    }));
  }

  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center overflow-hidden"
    >
      {/* ── WebGL fluid background ── */}
      <FluidShader className="absolute inset-0 w-full h-full" />

      {/* ── Noise vignette — darkens edges so text pops ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 30% 50%, transparent 30%, rgba(4,16,16,0.65) 100%)',
        }}
      />

      {/* ── Scan-line overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,229,204,0.6) 0px, rgba(0,229,204,0.6) 1px, transparent 1px, transparent 4px)',
        }}
      />

      {/* ── Subtle vertical glitch bars ── */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {glitchRef.current.map((bar, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0"
            style={{
              left:            bar.left,
              width:           bar.width,
              backgroundColor: '#041e1e',
              opacity:         bar.opacity,
              animationName:   'glitch-bar',
              animationDuration: bar.duration,
              animationDelay:   bar.delay,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
            }}
          />
        ))}
      </div>

      {/* ── Robot image ── */}
      <div
        className={`absolute right-0 top-1/2 -translate-y-1/2 w-[55vw] h-[90vh] transition-all duration-1000 ease-out ${
          mounted ? 'opacity-100 translate-x-[15%]' : 'opacity-0 translate-x-[25%]'
        }`}
        style={{ transitionDelay: '0.3s', zIndex: 15 }}
      >
        <img
          src="/hero-robot.jpg"
          alt="WARDEN Hotel Guardian Robot"
          className="w-full h-full object-cover object-center"
          style={{
            filter: 'grayscale(20%) contrast(1.1) brightness(0.85)',
            maskImage:
              'linear-gradient(to left, transparent 0%, rgba(0,0,0,0.6) 20%, black 45%)',
            WebkitMaskImage:
              'linear-gradient(to left, transparent 0%, rgba(0,0,0,0.6) 20%, black 45%)',
          }}
        />
        {/* Cyan teal tint overlay on image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(0,60,60,0.25) 0%, transparent 60%)',
            mixBlendMode: 'multiply',
          }}
        />
        {/* Scan lines on robot */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.12]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,229,204,0.15) 3px, rgba(0,229,204,0.15) 4px)',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-30 w-full px-8 md:px-16 lg:px-24">
        <div className="max-w-[1400px]">

          {/* Floor/system tag */}
          <div
            className={`mb-6 transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            <span
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.4em] uppercase"
              style={{ color: 'rgba(0,229,204,0.7)' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{
                  backgroundColor: '#00e5cc',
                  boxShadow: '0 0 6px rgba(0,229,204,0.8)',
                }}
              />
              Autonomous Security System · v2.4
            </span>
          </div>

          {/* WARDEN wordmark */}
          <h1
            className={`font-display font-black uppercase leading-[0.85] tracking-tight transition-all duration-1000 ease-out ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              color:      '#c9b99a',
              fontSize:   'clamp(5rem, 18vw, 16rem)',
              textShadow: '0 0 120px rgba(201,185,154,0.12), 0 2px 4px rgba(0,0,0,0.6)',
              transitionDelay: '0.1s',
            }}
          >
            <span className="block animate-text-flicker">WAR</span>
            <span className="block -mt-4 md:-mt-8 lg:-mt-12">DEN</span>
          </h1>

          {/* Cyan divider */}
          <div
            className={`mt-6 w-16 h-[2px] transition-all duration-700 ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundColor: '#00e5cc',
              boxShadow: '0 0 10px rgba(0,229,204,0.6)',
              transitionDelay: '0.7s',
            }}
          />

          {/* Subtitle */}
          <div
            className={`mt-6 max-w-md transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0.8s' }}
          >
            <p
              className="text-sm md:text-base tracking-[0.3em] uppercase font-mono"
              style={{ color: '#00e5cc' }}
            >
              Your Silent Hotel Guardian
            </p>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: 'rgba(201,185,154,0.55)' }}
            >
              Autonomous AI-powered robotic ecosystem. Detects threats,
              monitors conditions, interacts with guests.
            </p>
          </div>

          {/* CTA */}
          <div
            className={`mt-10 transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '1s' }}
          >
            <a
              href="#solution"
              onClick={(e) => {
                e.preventDefault();
                const nav = (window as unknown as Record<string, unknown>).elevatorNavigate as
                  | ((id: string) => void)
                  | undefined;
                nav ? nav('solution') : document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase font-mono group"
              style={{ color: '#00e5cc' }}
            >
              <span>Explore System</span>
              <span
                className="h-[1px] transition-all duration-300 group-hover:w-12 w-8"
                style={{
                  backgroundColor: '#00e5cc',
                  boxShadow: '0 0 6px rgba(0,229,204,0.5)',
                }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom accent line ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] z-30"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(0,229,204,0.25) 30%, rgba(0,229,204,0.25) 70%, transparent)',
        }}
      />

      {/* ── Corner marker ── */}
      <div
        className="absolute bottom-8 right-8 md:right-16 text-xs font-mono tracking-widest z-30"
        style={{ color: 'rgba(0,229,204,0.3)' }}
      >
        01
      </div>
    </section>
  );
}
