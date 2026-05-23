import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'The Challenge', href: '#problem' },
  { label: 'Our Solution', href: '#solution' },
  { label: 'Our Team', href: '#team' },
  { label: 'Market', href: '#market' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
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
        fixed top-0 left-0 right-0 z-40 transition-all duration-500
        ${scrolled ? 'bg-warden-teal-deep/95 backdrop-blur-md border-b border-warden-cyan/20 shadow-[0_4px_20px_rgba(0,240,255,0.08)]' : 'bg-transparent border-b border-transparent'}
      `}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="font-serif text-2xl text-warden-beige tracking-wider font-bold">
          WARDEN <span className="text-xs font-mono text-warden-cyan uppercase tracking-normal ml-1 text-cyan-glow">Hotel</span>
        </div>

        {/* Nav links - desktop only */}
        <nav className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm text-warden-beige/80 hover:text-warden-cyan transition-colors duration-300 font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA button */}
        <button
          onClick={(e) => handleNavClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, '#hero')}
          className="hidden md:block px-5 py-2 border border-warden-cyan text-warden-cyan rounded hover:bg-warden-cyan hover:text-warden-teal-deep transition-all duration-300 text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(0,240,255,0.15)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)]"
        >
          Check-In Desk
        </button>
      </div>
    </header>
  );
}
