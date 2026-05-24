import { useCallback, useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';
import { navigateToFloor } from '../data/floors';

const navLinks = [
  { label: 'Work',    targetId: 'solution' },
  { label: 'About',   targetId: 'team' },
  { label: 'Contact', targetId: 'footer' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = useCallback((targetId: string) => {
    navigateToFloor(targetId);
  }, []);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-30 transition-all duration-500
          ${scrolled ? 'py-4' : 'py-6 md:py-8'}
        `}
        style={{
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
        }}
      >
        <div className="w-full px-6 md:px-16 lg:px-24 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => goTo('hero')}
            className="font-display text-lg md:text-xl tracking-[0.2em] uppercase font-bold transition-opacity duration-300 hover:opacity-70 active:opacity-50"
            style={{ color: '#c9b99a' }}
            aria-label="Back to top"
          >
            Warden
          </button>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.targetId}
                onClick={() => goTo(link.targetId)}
                className="text-xs tracking-[0.2em] uppercase font-mono transition-colors duration-300"
                style={{ color: 'rgba(201, 185, 154, 0.6)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#c9b99a'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(201, 185, 154, 0.6)'; }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden w-11 h-11 -mr-2 flex flex-col items-center justify-center gap-[5px] rounded-full
                       active:bg-[rgba(201,185,154,0.08)] transition-colors"
            style={{ color: '#c9b99a' }}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="block w-5 h-px" style={{ backgroundColor: 'currentColor' }} />
            <span className="block w-5 h-px" style={{ backgroundColor: 'currentColor' }} />
            <span className="block w-5 h-px" style={{ backgroundColor: 'currentColor' }} />
          </button>
        </div>
      </header>

      {/* Mobile drawer (renders nothing meaningful on desktop) */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
