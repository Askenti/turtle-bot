import { useRef, useState, type ReactNode } from 'react';

interface WardenCardProps {
  children: ReactNode;
  label?: string;
  className?: string;
  featured?: boolean;
  scanInterval?: number; // ms between scans, 0 to disable
}

/**
 * Glassmorphic, HUD-styled card with:
 * - Frosted glass effect (low-opacity beige + backdrop blur)
 * - Rim lighting (brighter top/left, darker bottom/right)
 * - Noise/grain texture overlay
 * - Corner bracket reticles
 * - Optional scan line animation
 * - Hover glow in cyan
 */
export default function WardenCard({
  children,
  label,
  className = '',
  featured = false,
  scanInterval = 8000,
}: WardenCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        warden-card group relative rounded-xl overflow-hidden
        transition-all duration-300
        hover:-translate-y-1
        ${featured ? 'warden-card--featured' : ''}
        ${className}
      `}
      style={{
        // Glassmorphism: semi-transparent beige with blur
        background: 'rgba(237, 227, 208, 0.08)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        // Rim lighting via layered borders
        boxShadow: isHovered
          ? `
              inset 1px 1px 0 rgba(255, 255, 255, 0.12),
              inset -1px -1px 0 rgba(0, 0, 0, 0.15),
              0 0 30px rgba(0, 240, 255, 0.15),
              0 8px 32px rgba(0, 0, 0, 0.2)
            `
          : `
              inset 1px 1px 0 rgba(255, 255, 255, 0.08),
              inset -1px -1px 0 rgba(0, 0, 0, 0.1),
              0 4px 20px rgba(0, 0, 0, 0.15)
            `,
        border: isHovered
          ? '1px solid rgba(0, 240, 255, 0.35)'
          : '1px solid rgba(226, 215, 190, 0.15)',
      }}
    >
      {/* Noise/grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Scanline sweep effect */}
      {scanInterval > 0 && (
        <div
          className="absolute left-0 right-0 h-[2px] pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.6), transparent)',
            boxShadow: '0 0 8px rgba(0, 240, 255, 0.5)',
            animation: `wardenScan ${scanInterval}ms ease-in-out infinite`,
          }}
        />
      )}

      {/* Corner bracket reticles */}
      <CornerBracket position="tl" isHovered={isHovered} />
      <CornerBracket position="tr" isHovered={isHovered} />
      <CornerBracket position="bl" isHovered={isHovered} />
      <CornerBracket position="br" isHovered={isHovered} />

      {/* Optional technical label */}
      {label && (
        <span
          className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.15em] uppercase transition-colors duration-300"
          style={{
            color: isHovered ? 'rgba(0, 240, 255, 0.7)' : 'rgba(168, 154, 130, 0.5)',
          }}
        >
          [{label}]
        </span>
      )}

      {/* Featured accent bar */}
      {featured && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
          style={{
            background: isHovered
              ? 'linear-gradient(180deg, rgba(0, 240, 255, 0.9), rgba(0, 240, 255, 0.4))'
              : 'rgba(0, 240, 255, 0.6)',
            boxShadow: isHovered ? '0 0 12px rgba(0, 240, 255, 0.5)' : 'none',
          }}
        />
      )}

      {/* Card content */}
      <div className="relative z-10 p-8">{children}</div>
    </div>
  );
}

/** Corner bracket reticle */
function CornerBracket({
  position,
  isHovered,
}: {
  position: 'tl' | 'tr' | 'bl' | 'br';
  isHovered: boolean;
}) {
  const positionStyles: Record<string, React.CSSProperties> = {
    tl: { top: 6, left: 6, borderTop: '2px solid', borderLeft: '2px solid' },
    tr: { top: 6, right: 6, borderTop: '2px solid', borderRight: '2px solid' },
    bl: { bottom: 6, left: 6, borderBottom: '2px solid', borderLeft: '2px solid' },
    br: { bottom: 6, right: 6, borderBottom: '2px solid', borderRight: '2px solid' },
  };

  return (
    <div
      className="absolute w-4 h-4 pointer-events-none transition-all duration-300"
      style={{
        ...positionStyles[position],
        borderColor: isHovered ? 'rgba(0, 240, 255, 0.7)' : 'rgba(0, 240, 255, 0.25)',
        filter: isHovered ? 'drop-shadow(0 0 4px rgba(0, 240, 255, 0.5))' : 'none',
      }}
    />
  );
}
