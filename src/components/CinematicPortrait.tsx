/**
 * CinematicPortrait — a NAV//X-style portrait card with a Cleo-inspired
 * "focus & blur" interaction.
 *
 * The interaction is driven by a parent. The parent holds a single
 * `hoveredIndex` state and passes each child one of three states:
 *
 *   - 'idle'    → no card is hovered; this card sits at rest
 *   - 'locked'  → THIS card is hovered; lift + glow + sweep line + uplink chip
 *   - 'dimmed'  → another card is hovered; blur + lower opacity + slight scale-down
 *
 * The visual treatment for each state is in `src/index.css` under the
 * `.cine-portrait[data-state="…"]` selectors, so this component just
 * forwards the state via the `data-state` attribute and Tailwind handles
 * the static layout.
 *
 * Why parent state instead of `:hover` siblings?
 *   CSS `:has(.sibling:hover)` would work in modern browsers, but parent
 *   state is more predictable: it composes with keyboard focus, touch
 *   taps, and external triggers (e.g. clicking a dot to "lock" a card).
 */
export type PortraitState = 'idle' | 'locked' | 'dimmed';

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageSrc?: string;
  isLeader?: boolean;
}

interface CinematicPortraitProps {
  member: TeamMember;
  index: number;
  state: PortraitState;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export default function CinematicPortrait({
  member,
  index,
  state,
  onHoverStart,
  onHoverEnd,
}: CinematicPortraitProps) {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article
      data-state={state}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      tabIndex={0}
      className="cine-portrait group relative cursor-pointer focus-visible:ring-2 focus-visible:ring-warden-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-warden-teal-deep"
    >
      {/* HUD bracket corners (light up + grow when locked) */}
      <span className="bracket tl" />
      <span className="bracket tr" />
      <span className="bracket bl" />
      <span className="bracket br" />

      {/* Portrait image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-warden-teal-deep">
        {member.imageSrc ? (
          <img
            src={member.imageSrc}
            alt={member.name}
            className="w-full h-full object-cover grayscale contrast-110"
            loading="lazy"
          />
        ) : (
          <div className="initials-placeholder w-full h-full flex items-center justify-center relative">
            <span
              className="font-display font-black text-warden-beige/15 select-none"
              style={{ fontSize: 'clamp(6rem, 18vw, 11rem)', letterSpacing: '0.04em' }}
            >
              {initials}
            </span>
            <span className="absolute bottom-6 right-6 font-mono text-[8px] tracking-[0.3em] uppercase text-warden-cyan/30">
              No image · {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        )}

        {/* Static scan-line texture (always on) */}
        <div className="scanlines" />

        {/* Animated cyan sweep — only visible when state="locked" */}
        <div className="sweep-line" />

        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-warden-teal-deep via-warden-teal-deep/50 to-transparent pointer-events-none" />

        {/* Leader chip */}
        {member.isLeader && (
          <div className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.3em] uppercase text-warden-cyan bg-warden-teal-deep/70 px-2 py-1 border border-warden-cyan/40 backdrop-blur-sm z-10">
            ◆ Lead
          </div>
        )}

        {/* Index marker */}
        <div className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.3em] uppercase text-warden-beige/40 z-10">
          {String(index + 1).padStart(2, '0')} / 09
        </div>
      </div>

      {/* Caption block */}
      <div className="pt-5 pb-2 px-1">
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-warden-cyan mb-2">
          &gt;&gt; {member.role}
        </p>
        <h3 className="font-display font-bold text-warden-beige uppercase leading-[1.05] mb-3 text-xl md:text-2xl">
          {member.name}
        </h3>
        <p className="text-warden-beige/55 text-xs leading-relaxed">
          {member.description}
        </p>
      </div>

      {/*
        Uplink status chip — animated data indicator at the bottom of the
        card. Hidden by default; slides up into view via CSS when this
        card is in state="locked". The pulsing dot uses Tailwind's
        animate-ping for the radar-pulse halo plus a solid cyan core.
      */}
      <div className="uplink-chip">
        <div className="flex items-center gap-2 px-3 py-1.5 border-t border-warden-cyan/70 bg-warden-teal-deep/90 backdrop-blur-sm">
          <span className="relative inline-flex">
            <span className="absolute inline-flex h-full w-full rounded-full bg-warden-cyan/60 animate-ping" />
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-warden-cyan shadow-[0_0_8px_rgba(0,240,255,0.9)]" />
          </span>
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-warden-cyan">
            Uplink Active
          </span>
          <span className="flex-1 h-px bg-warden-cyan/20" />
          <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-warden-cyan/60">
            ID:{String(index + 1).padStart(3, '0')}
          </span>
        </div>
      </div>
    </article>
  );
}
