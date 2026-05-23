import { useState } from 'react';

interface FlipPortraitCardProps {
  portraitLabel: string;
  roleBadge: string;
  name: string;
  role: string;
  backTitle: string;
  backDescription: string;
  tags: string[];
  imageSrc?: string;
  initials?: string;
  isLeader?: boolean;
}

export default function FlipPortraitCard({
  portraitLabel,
  roleBadge,
  name,
  role,
  backTitle,
  backDescription,
  tags,
  imageSrc,
  initials,
  isLeader,
}: FlipPortraitCardProps) {
  const [imgError, setImgError] = useState(false);
  const showInitials = !imageSrc || imgError;
  const derivedInitials =
    initials || name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="luxury-frame-wrap h-[360px] w-full cursor-pointer">
      {/* Picture hanger nail */}
      <div className="flex flex-col items-center -mb-0.5">
        <div className={`w-2 h-2 rounded-full shadow ${isLeader ? 'bg-warden-cyan shadow-[0_0_8px_rgba(0,240,255,0.6)]' : 'bg-warden-cyan-dim'}`} />
        <div className="w-20 h-4 border-t border-x border-warden-cyan-dim/40 opacity-70" />
      </div>

      <div className="swing-target card-3d w-full h-full relative">
        {/* ── FRONT (beige card / hotel portrait) ── */}
        <div
          className={`card-front flex flex-col shadow-2xl overflow-hidden rounded-sm
            ${isLeader
              ? 'bg-warden-beige border-[8px] border-warden-cyan-dim ring-2 ring-warden-cyan/50 shadow-[0_0_25px_rgba(0,240,255,0.15)]'
              : 'bg-warden-beige border-[8px] border-warden-teal-dark ring-1 ring-warden-cyan/15'
            }`}
        >
          {/* Top bar */}
          <div className="flex justify-between items-start px-4 pt-3 pb-1">
            <span className="font-serif italic text-[10px] text-warden-ink-mute">
              {portraitLabel}
            </span>
            <span
              className={`font-mono text-[8px] tracking-wider px-2 py-0.5 rounded border uppercase ${
                isLeader
                  ? 'text-warden-cyan-dim bg-warden-cyan/10 border-warden-cyan/40'
                  : 'text-warden-ink-mute bg-warden-beige-warm border-warden-beige-soft'
              }`}
            >
              {roleBadge}
            </span>
          </div>

          {/* Portrait */}
          <div className="flex-1 flex items-center justify-center px-4">
            {showInitials ? (
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center font-serif text-xl font-bold select-none border-4 ${
                  isLeader
                    ? 'bg-gradient-to-br from-warden-teal to-warden-teal-deep text-warden-cyan border-warden-cyan/60 shadow-[0_0_18px_rgba(0,240,255,0.35)]'
                    : 'bg-gradient-to-br from-warden-teal-dark to-warden-teal-deep text-warden-cyan-soft border-warden-teal'
                }`}
              >
                {derivedInitials}
              </div>
            ) : (
              <div className={`w-20 h-20 rounded-full overflow-hidden border-4 ${isLeader ? 'border-warden-cyan/60 shadow-[0_0_15px_rgba(0,240,255,0.25)]' : 'border-warden-teal-dark/40'}`}>
                <img
                  src={imageSrc}
                  alt={name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={() => setImgError(true)}
                />
              </div>
            )}
          </div>

          {/* Name & role */}
          <div className="px-4 pb-1 text-center space-y-0.5">
            <h3 className="font-serif text-base leading-tight tracking-tight text-warden-ink">
              {name}
            </h3>
            <p className={`font-mono text-[8px] uppercase tracking-widest ${isLeader ? 'text-warden-cyan-dim' : 'text-warden-ink-mute'}`}>
              {role}
            </p>
          </div>

          {/* Hover hint */}
          <div className="mx-4 border-t border-warden-beige-soft pt-2 pb-3 text-[9px] italic font-serif text-center text-warden-ink-mute/70">
            Hover to reveal
          </div>
        </div>

        {/* ── BACK (deep teal / robotic console) ── */}
        <div className="card-back bg-warden-teal-deep border-4 border-warden-teal p-5 rounded-sm flex flex-col justify-between shadow-2xl">
          <div className="font-mono text-xs space-y-3">
            <div className="font-bold border-b border-warden-teal pb-2 tracking-wider uppercase text-[10px] text-warden-cyan">
              {backTitle}
            </div>
            <p className="text-warden-beige/80 font-sans text-[11px] leading-relaxed">
              {backDescription}
            </p>
            <div className="pt-1 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] px-2 py-0.5 rounded border bg-warden-teal-dark text-warden-cyan-soft border-warden-cyan-dim/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="border-t border-warden-teal pt-3 mt-2">
            <p className="font-serif text-sm italic text-warden-cyan-soft">{name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
