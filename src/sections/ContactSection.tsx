import { useScrollReveal } from '../lib/useScrollReveal';
import { navigateToFloor } from '../data/floors';

interface Member {
  name: string;
  role: string;
  isLead?: boolean;
}

const TEAM: Member[] = [
  { name: 'Pivevar Darya',        role: 'Team Leader',              isLead: true },
  { name: 'Saydullayeva Aziza',   role: 'AI Systems Engineer' },
  { name: 'Nurillaeva Zarina',    role: 'UI · Dashboard' },
  { name: 'Tologoneva Batkaiym',  role: 'Robotics & Mechanical' },
  { name: 'Hakimova Hadicha',     role: 'Business & Market' },
  { name: 'Kodirova Zahrokhon',   role: 'System Integrator' },
  { name: 'Norov Mirsaid',        role: 'Navigation Engineer' },
  { name: 'Nimatilaev Javokhir',  role: 'Computer Vision' },
  { name: 'Amaan',                role: 'QA & Integration' },
];

function initialsOf(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

// ── Single portrait card — bracket-cornered, cream + ink ──────────────────────
function MemberCard({ member, index }: { member: Member; index: number }) {
  const initials = initialsOf(member.name);

  return (
    <article
      className={`group relative bg-spectra-pearl rounded-2xl p-6 border border-spectra-hairline
                  transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                  hover:-translate-y-1 hover:border-spectra-mist-deep/40
                  hover:shadow-[0_22px_50px_-15px_rgba(10,14,18,0.18),0_6px_15px_-5px_rgba(10,14,18,0.08)]
                  ${member.isLead ? 'ring-1 ring-spectra-ink/12' : ''}`}
    >
      {/* HUD bracket corners */}
      <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-spectra-ink/40" />
      <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-spectra-ink/40" />
      <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-spectra-ink/40" />
      <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-spectra-ink/40" />

      {/* Top row */}
      <div className="flex items-center justify-between mb-6 pt-2 px-1">
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-spectra-ink-faint">
          {String(index + 1).padStart(2, '0')} / 09
        </span>
        {member.isLead && (
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-spectra-ink bg-spectra-mist/60 px-2 py-1 rounded">
            ◆ Lead
          </span>
        )}
      </div>

      {/* Portrait initials disc */}
      <div className="flex flex-col items-center text-center">
        <div
          className={`relative w-24 h-24 rounded-full mb-5 flex items-center justify-center
                      bg-gradient-to-br from-spectra-cream to-spectra-mist/50
                      border border-spectra-ink/15
                      transition-all duration-500
                      ${member.isLead ? 'ring-2 ring-offset-2 ring-offset-spectra-pearl ring-spectra-ink/20' : ''}`}
        >
          <span className="font-editorial italic text-spectra-ink text-[26px] tracking-tight"
                style={{ fontVariationSettings: '"SOFT" 40' }}>
            {initials}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-editorial text-[15.5px] text-spectra-ink tracking-tight leading-tight mb-2 max-w-[180px]">
          {member.name}
        </h3>

        {/* Role */}
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint">
          {member.role}
        </p>
      </div>
    </article>
  );
}

export default function ContactSection() {
  const [ref, revealed] = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="contact"
      data-revealed={revealed}
      className="relative bg-spectra-cream py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Centred radial light — closing-act spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(214,225,232,0.55) 0%, transparent 60%)',
        }}
      />
      <div className="absolute top-0 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 h-px bg-spectra-hairline" />

      <div className="relative max-w-[1400px] mx-auto">

        {/* ── Closer header ── */}
        <div className="text-center mb-20 md:mb-24 max-w-3xl mx-auto">
          <div className="s-up inline-flex items-center gap-3 mb-8">
            <span className="w-6 h-px bg-spectra-ink/40" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-spectra-ink-mute">
              11 · Demo & Contact
            </span>
            <span className="w-6 h-px bg-spectra-ink/40" />
          </div>

          <h2 className="s-up s-d1 font-editorial font-light text-spectra-ink leading-[1.05] tracking-[-0.02em] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}>
            The Future of Trusted Hospitality<br />
            <span className="italic text-spectra-ink-soft">Starts Here.</span>
          </h2>

          <p className="s-up s-d2 max-w-2xl mx-auto text-base md:text-[17px] leading-[1.7] text-spectra-ink-mute mb-10">
            Explore the WARDEN ecosystem and experience the next generation of
            AI-powered hospitality operations.
          </p>

          {/* CTAs */}
          <div className="s-up s-d3 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact-team"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact-team')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-3 px-6 py-3.5
                         bg-spectra-ink text-spectra-cream rounded-full
                         text-sm tracking-[0.15em] uppercase font-mono
                         transition-all duration-300
                         hover:bg-spectra-ink-soft hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(10,14,18,0.18)]"
            >
              <span>Get in Touch</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                   className="transition-transform group-hover:translate-x-0.5">
                <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.2"
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <button
              onClick={() => navigateToFloor('dashboard')}
              className="inline-flex items-center gap-3 px-6 py-3.5
                         border border-spectra-ink/20 rounded-full
                         text-sm tracking-[0.15em] uppercase font-mono text-spectra-ink
                         transition-all duration-300
                         hover:border-spectra-ink hover:-translate-y-0.5"
            >
              Watch Demo
            </button>
          </div>
        </div>

        {/* ── Video placeholder (browser-framed, [data-video-slot]) ── */}
        <div className="s-up s-d4 relative rounded-3xl overflow-hidden border border-spectra-hairline bg-spectra-pearl
                        shadow-[0_40px_100px_-30px_rgba(10,14,18,0.25),0_12px_30px_-10px_rgba(10,14,18,0.10)]
                        mb-24 md:mb-32">

          {/* Browser chrome */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-spectra-hairline bg-spectra-cream/40 backdrop-blur-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-spectra-ink/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-spectra-ink/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-spectra-ink/15" />
            </div>
            <div className="flex-1 mx-4 max-w-xl mx-auto bg-spectra-pearl rounded-md border border-spectra-hairline px-3 py-1
                            font-mono text-[10px] tracking-[0.18em] text-spectra-ink-faint text-center">
              warden.app · demo · 03 min 24 sec
            </div>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint hidden sm:inline">
              ◦ Demo
            </span>
          </div>

          {/* Swap the entire div below with <video src=… autoPlay muted loop playsInline /> when ready */}
          <div data-video-slot
               className="relative aspect-video bg-gradient-to-br from-spectra-pearl via-spectra-mist/30 to-spectra-cream-deep
                          flex items-center justify-center">

            {/* Diagonal soft accent lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30" aria-hidden="true">
              <line x1="0" y1="100%" x2="50%" y2="0" stroke="rgba(10,14,18,0.1)" strokeWidth="0.5" />
              <line x1="50%" y1="100%" x2="100%" y2="0" stroke="rgba(10,14,18,0.1)" strokeWidth="0.5" />
            </svg>

            {/* Play button */}
            <button
              type="button"
              className="group relative z-10 flex flex-col items-center gap-4 px-8 py-6 rounded-2xl
                         hover:scale-105 transition-transform duration-300"
              aria-label="Play demo video"
            >
              <span className="w-20 h-20 rounded-full bg-spectra-ink text-spectra-cream
                               flex items-center justify-center
                               shadow-[0_18px_40px_-10px_rgba(10,14,18,0.35)]
                               group-hover:shadow-[0_22px_55px_-10px_rgba(10,14,18,0.50)]
                               transition-shadow duration-300">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M7 4 L 18 11 L 7 18 Z" fill="currentColor" />
                </svg>
              </span>
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-spectra-ink-mute">
                Play Demo · 3:24
              </span>
            </button>

            {/* Helper hint at the bottom */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint">
              ◦ Replace [data-video-slot] with the real footage when ready
            </p>
          </div>
        </div>

        {/* ── Team ── */}
        <div id="contact-team" className="mb-20 md:mb-24 scroll-mt-32">

          <div className="grid grid-cols-12 gap-8 mb-12 md:mb-16">
            <div className="col-span-12 lg:col-span-3">
              <div className="s-up flex items-center gap-3 mb-6 lg:mb-0">
                <span className="w-6 h-px bg-spectra-ink/40" />
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-spectra-ink-mute">
                  Team 1 · Spectra
                </span>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-9">
              <h3 className="s-up s-d1 font-editorial font-light text-spectra-ink leading-[1.1] tracking-[-0.02em] mb-4"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
                The people <span className="italic text-spectra-ink-soft">behind WARDEN.</span>
              </h3>
              <p className="s-up s-d2 max-w-xl text-[14.5px] leading-[1.7] text-spectra-ink-mute">
                Nine engineers and designers from Inha University's School of Global
                Convergence Studies — building the autonomous hospitality standard.
              </p>
            </div>
          </div>

          {/* 3×3 grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
            {TEAM.map((m, i) => (
              <div key={m.name} className={`s-up s-d${Math.min(i + 3, 8)}`}>
                <MemberCard member={m} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Contact info block ── */}
        <div className="s-up s-d6 relative rounded-3xl overflow-hidden border border-spectra-hairline"
             style={{ background: 'linear-gradient(180deg, #FBFAF7 0%, #EAF1F6 100%)' }}>

          <div className="px-6 md:px-10 lg:px-16 py-14 md:py-18">

            <div className="grid grid-cols-12 gap-10 items-center">

              {/* Address */}
              <div className="col-span-12 md:col-span-7">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-px bg-spectra-ink/30" />
                  <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-spectra-ink-mute">
                    Contact
                  </span>
                </div>

                <p className="font-editorial italic text-spectra-ink leading-[1.3] tracking-tight mb-4"
                   style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>
                  Inha University · SGCS Office
                </p>

                <p className="text-[14px] leading-[1.7] text-spectra-ink-mute max-w-md mb-4">
                  Center for Continuing Education Building, Rm 323<br />
                  100 Inha-ro, Michuhol-gu, Incheon 22212<br />
                  South Korea
                </p>

                <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-spectra-ink">
                  TEL · +82 32 860 8112
                </p>
              </div>

              {/* Badges */}
              <div className="col-span-12 md:col-span-5 flex flex-col gap-3 md:items-end">
                <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full
                                 bg-spectra-ink text-spectra-cream
                                 font-mono text-[10px] tracking-[0.3em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-spectra-cream" />
                  WARDEN Verified · Partner Program
                </span>

                <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full
                                 border border-spectra-ink/25 text-spectra-ink
                                 font-mono text-[10px] tracking-[0.3em] uppercase
                                 bg-spectra-pearl">
                  <span className="w-1.5 h-1.5 rounded-full bg-spectra-mist-deep" />
                  B2B Inquiries · Open
                </span>

                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint mt-2">
                  2026 · IBT / ISE Capstone Design
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Closing tagline */}
        <p className="s-fade s-d8 max-w-3xl mx-auto mt-20 text-center font-editorial italic text-spectra-ink-soft text-lg md:text-xl leading-[1.5]">
          WARDEN — smart hotel ecosystem,
          quietly running in the background.
        </p>
      </div>
    </section>
  );
}
