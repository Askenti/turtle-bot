import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Vertical glitch bars overlay - subtle and tasteful */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0"
            style={{
              left: `${(i * 4) + Math.random() * 2}%`,
              width: `${1 + Math.random() * 2}px`,
              backgroundColor: '#0a0a0a',
              opacity: 0.15 + Math.random() * 0.25,
              animation: `glitch-bar ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Cinematic robot image - asymmetric positioning, bleeding off right edge */}
      <div 
        className={`absolute right-0 top-1/2 -translate-y-1/2 w-[55vw] h-[90vh] transition-all duration-1000 ease-out ${
          mounted ? 'opacity-100 translate-x-[15%]' : 'opacity-0 translate-x-[25%]'
        }`}
        style={{ transitionDelay: '0.3s' }}
      >
        <img
          src="/hero-robot.jpg"
          alt="WARDEN Hotel Guardian Robot"
          className="w-full h-full object-cover object-center"
          style={{
            filter: 'grayscale(30%) contrast(1.1)',
            maskImage: 'linear-gradient(to left, transparent 0%, black 30%)',
            WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 30%)',
          }}
        />
        {/* Scan lines over image */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(201, 185, 154, 0.1) 2px, rgba(201, 185, 154, 0.1) 4px)',
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-30 w-full px-8 md:px-16 lg:px-24">
        <div className="max-w-[1400px]">
          
          {/* Oversized headline - distressed serif style */}
          <h1 
            className={`font-display font-black uppercase leading-[0.85] tracking-tight transition-all duration-1000 ease-out ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              color: '#c9b99a',
              fontSize: 'clamp(5rem, 18vw, 16rem)',
              textShadow: '0 0 80px rgba(201, 185, 154, 0.15)',
            }}
          >
            <span className="block animate-text-flicker">WAR</span>
            <span className="block -mt-4 md:-mt-8 lg:-mt-12">DEN</span>
          </h1>

          {/* Vertical accent bar with subtle pulse */}
          <div 
            className={`hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[35vh] transition-all duration-700 ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              backgroundColor: 'rgba(201, 185, 154, 0.4)',
              transitionDelay: '0.6s',
            }}
          />

          {/* Subtext */}
          <div 
            className={`mt-8 md:mt-12 max-w-md transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0.8s' }}
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
            className={`mt-12 transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '1s' }}
          >
            <a
              href="#solution"
              onClick={(e) => {
                e.preventDefault();
                const nav = (window as unknown as Record<string, unknown>).elevatorNavigate as ((id: string) => void) | undefined;
                nav ? nav('solution') : document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' });
              }}
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
