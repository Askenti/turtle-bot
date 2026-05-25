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
          ${scrolled ? 'py-4 bg-spectra-cream/85 backdrop-blur-md border-b border-spectra-hairline' : 'py-6 md:py-8 bg-transparent'}
        `}
      >
        <div className="w-full px-6 md:px-12 lg:px-20 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => goTo('hero')}
            className="font-editorial text-spectra-ink text-xl md:text-2xl tracking-tight transition-opacity duration-300 hover:opacity-70 active:opacity-50"
            aria-label="Back to top"
          >
            Warden<span className="font-mono text-[10px] tracking-[0.3em] uppercase text-spectra-ink-faint ml-2 align-middle">Spectra</span>
          </button>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <button
                key={link.targetId}
                onClick={() => goTo(link.targetId)}
                className="text-xs tracking-[0.2em] uppercase font-mono text-spectra-ink-mute hover:text-spectra-ink transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden w-11 h-11 -mr-2 flex flex-col items-center justify-center gap-[5px] rounded-full
                       text-spectra-ink active:bg-spectra-ink/5 transition-colors"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="block w-5 h-px bg-current" />
            <span className="block w-5 h-px bg-current" />
            <span className="block w-5 h-px bg-current" />
          </button>
        </div>
      </header>

      {/* Mobile drawer (renders nothing meaningful on desktop) */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
