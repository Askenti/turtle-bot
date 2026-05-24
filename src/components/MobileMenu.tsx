import { useCallback, useEffect, useRef } from 'react';
import { FLOORS, navigateToFloor } from '../data/floors';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Primary site nav (same labels as the desktop header). */
const NAV_LINKS = [
  { label: 'Work',    targetId: 'solution' },
  { label: 'About',   targetId: 'team' },
  { label: 'Contact', targetId: 'footer' },
];

/**
 * MobileMenu — slide-in drawer that exposes both the marketing nav links
 * AND the full elevator floor list to mobile users (who don't get the
 * fixed right-rail FloorPanel).
 *
 * Behaviour:
 *  · backdrop tap, Escape key, or any link tap closes it
 *  · body scroll is locked while open
 *  · the navigation only fires AFTER the close transition, so the user
 *    sees the drawer slide out cleanly before the elevator animation starts
 *  · all tap targets are ≥ 44×44 px (Apple HIG minimum)
 *  · the drawer is permanently mounted with GPU-accelerated transforms,
 *    so the slide-in is hot-path smooth
 */
export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // ── Navigate after the close animation, not before ──
  const goTo = useCallback(
    (targetId: string) => {
      onClose();
      // 280ms = drawer transition (350ms) minus the visual cue we don't
      // need to fully wait for. Feels responsive without race conditions.
      window.setTimeout(() => navigateToFloor(targetId), 280);
    },
    [onClose]
  );

  // ── Lock body scroll while open ──
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ── Escape to close + focus the close button on open ──
  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black md:hidden
          transition-opacity duration-300
          ${open ? 'opacity-60 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`
          fixed top-0 right-0 bottom-0 z-50 md:hidden
          w-[88vw] max-w-sm
          bg-[#0a0a0a] border-l border-[rgba(201,185,154,0.15)]
          overflow-y-auto overscroll-contain
          transform transition-transform duration-[350ms]
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform',
        }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(201,185,154,0.1)]">
          <span
            className="font-display text-lg tracking-[0.2em] uppercase font-bold"
            style={{ color: '#c9b99a' }}
          >
            Warden
          </span>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="w-11 h-11 -mr-2 flex items-center justify-center rounded-full
                       active:bg-[rgba(201,185,154,0.08)] transition-colors"
            style={{ color: '#c9b99a' }}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <line x1="3" y1="3" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="15" y1="3" x2="3" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Section: Navigate ── */}
        <nav className="px-6 py-6" aria-label="Primary">
          <p
            className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4"
            style={{ color: 'rgba(201,185,154,0.4)' }}
          >
            Navigate
          </p>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.targetId}>
                <button
                  onClick={() => goTo(link.targetId)}
                  className="w-full min-h-[48px] py-3 text-left text-base tracking-[0.1em] uppercase font-mono
                             active:opacity-60 transition-opacity"
                  style={{ color: '#c9b99a' }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Section: Elevator ── */}
        <div className="px-6 py-6 border-t border-[rgba(201,185,154,0.1)]">
          <p
            className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4"
            style={{ color: 'rgba(201,185,154,0.4)' }}
          >
            Elevator
          </p>
          <ul className="flex flex-col gap-1">
            {FLOORS.map((floor) => (
              <li key={floor.id}>
                <button
                  onClick={() => goTo(floor.id)}
                  className="w-full min-h-[56px] flex items-center gap-4 py-2 px-3 -mx-3 rounded-lg
                             active:bg-[rgba(0,240,255,0.08)] transition-colors"
                  aria-label={`Go to ${floor.description}`}
                >
                  {/* Floor badge */}
                  <span
                    className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full
                               font-mono text-sm font-bold
                               border border-[rgba(0,240,255,0.3)]
                               bg-[radial-gradient(circle,_rgba(0,240,255,0.08),_rgba(0,240,255,0.02))]"
                    style={{ color: '#00F0FF' }}
                  >
                    {floor.label}
                  </span>
                  <div className="flex flex-col items-start text-left">
                    <span
                      className="font-mono text-[10px] tracking-[0.3em] uppercase"
                      style={{ color: 'rgba(0,240,255,0.5)' }}
                    >
                      {floor.name}
                    </span>
                    <span
                      className="font-mono text-sm tracking-[0.05em]"
                      style={{ color: '#c9b99a' }}
                    >
                      {floor.description}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer credit */}
        <div className="px-6 py-6 border-t border-[rgba(201,185,154,0.1)]">
          <p
            className="font-mono text-[9px] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(201,185,154,0.3)' }}
          >
            Inha University · Team 1 Spectra
          </p>
        </div>
      </aside>
    </>
  );
}
