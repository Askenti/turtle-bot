import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Work', href: '#solution' },
  { label: 'About', href: '#team' },
  { label: 'Contact', href: '#footer' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const navigate = (window as unknown as Record<string, unknown>).elevatorNavigate as ((id: string) => void) | undefined;
    if (navigate) {
      navigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled ? 'py-4' : 'py-6 md:py-8'}
      `}
      style={{ 
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      <div className="w-full px-8 md:px-16 lg:px-24 flex justify-between items-center">
        {/* Logo - left side */}
        <a 
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="font-display text-lg md:text-xl tracking-[0.2em] uppercase font-bold transition-colors duration-300 hover:opacity-70"
          style={{ color: '#c9b99a' }}
        >
          Warden
        </a>

        {/* Nav links - right side, minimal */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs tracking-[0.2em] uppercase font-mono transition-all duration-300 hover:opacity-100"
              style={{ color: 'rgba(201, 185, 154, 0.6)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#c9b99a'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(201, 185, 154, 0.6)'; }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu indicator */}
        <button 
          className="md:hidden text-xs tracking-[0.2em] uppercase font-mono"
          style={{ color: 'rgba(201, 185, 154, 0.6)' }}
          aria-label="Menu"
        >
          Menu
        </button>
      </div>
    </header>
  );
}
