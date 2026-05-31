import { useCallback, useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';
import { navigateToFloor } from '../data/floors';

const NAV_LINKS = [
  { label: 'Ecosystem',  targetId: 'ecosystem' },
  { label: 'Technology', targetId: 'how' },
  { label: 'Dashboard',  targetId: 'dashboard' },
  { label: 'Impact',     targetId: 'business' },
  { label: 'Demo',       targetId: 'contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelVisible, setPanelVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = useCallback((targetId: string) => {
    navigateToFloor(targetId);
  }, []);

  const togglePanel = useCallback(() => {
    setPanelVisible((v) => !v);
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('warden:floor-panel', { detail: panelVisible })
    );
  }, [panelVisible]);

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
            className="group flex flex-col items-start text-left transition-opacity duration-300 hover:opacity-70 active:opacity-50"
            aria-label="Back to top"
          >
            <span className="font-editorial text-spectra-ink text-2xl md:text-3xl tracking-tight uppercase leading-none">
              WARDEN
            </span>
            <span className="mt-1.5 font-mono text-[12px] md:text-[13px] tracking-[0.3em] uppercase text-spectra-ink-faint">
              Spectra : Smart Hospitality
            </span>
          </button>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 ml-auto mr-6 lg:mr-10" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <button
                key={l.targetId}
                onClick={() => goTo(l.targetId)}
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-spectra-ink-mute hover:text-spectra-ink transition-colors duration-300"
              >
                {l.label}
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

          {/* Desktop floor-panel toggle */}
          <button
            onClick={togglePanel}
            className="hidden md:flex w-11 h-11 -mr-2 flex-col items-center justify-center gap-[5px] rounded-full
                       text-spectra-ink hover:bg-spectra-ink/5 active:bg-spectra-ink/10 transition-colors"
            aria-label={panelVisible ? 'Hide floor panel' : 'Show floor panel'}
            aria-pressed={!panelVisible}
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
