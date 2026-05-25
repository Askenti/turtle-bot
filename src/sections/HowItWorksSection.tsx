import { useScrollReveal } from '../lib/useScrollReveal';

interface Step {
  index: string;
  title: string;
  description: string;
  /** Small SVG illustration for the step */
  visual: React.ReactNode;
}

// ── Step illustrations — minimal line art, ink + mist-deep accent ──

function NavGlyph() {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Room outline */}
      <rect x="8" y="14" width="64" height="52" rx="2" stroke="rgba(10,14,18,0.5)" strokeWidth="1" />
      {/* Furniture rectangles */}
      <rect x="14" y="20" width="14" height="8" stroke="rgba(10,14,18,0.25)" strokeWidth="0.8" />
      <rect x="52" y="20" width="14" height="14" stroke="rgba(10,14,18,0.25)" strokeWidth="0.8" />
      <rect x="14" y="48" width="20" height="12" stroke="rgba(10,14,18,0.25)" strokeWidth="0.8" />
      {/* Path */}
      <path d="M16 60 Q 30 50 40 40 T 64 22"
            stroke="#B4C6D2" strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
      {/* Robot dot */}
      <circle cx="64" cy="22" r="2.5" fill="#0A0E12" />
      <circle cx="64" cy="22" r="5" stroke="#0A0E12" strokeWidth="0.6" strokeOpacity="0.3" />
    </svg>
  );
}

function ScanGlyph() {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Center sensor */}
      <circle cx="40" cy="40" r="3" fill="#0A0E12" />
      {/* Scanning waves */}
      <circle cx="40" cy="40" r="10" stroke="#B4C6D2" strokeWidth="1" fill="none" />
      <circle cx="40" cy="40" r="18" stroke="rgba(180,198,210,0.6)" strokeWidth="1" fill="none" />
      <circle cx="40" cy="40" r="26" stroke="rgba(180,198,210,0.3)" strokeWidth="1" fill="none" />
      {/* Cross hairs */}
      <line x1="40" y1="10" x2="40" y2="70" stroke="rgba(10,14,18,0.15)" strokeWidth="0.6" />
      <line x1="10" y1="40" x2="70" y2="40" stroke="rgba(10,14,18,0.15)" strokeWidth="0.6" />
      {/* Detected blip */}
      <circle cx="55" cy="28" r="2" fill="#B4C6D2" />
    </svg>
  );
}

function AIGlyph() {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Bounding box */}
      <rect x="22" y="22" width="36" height="36" stroke="#0A0E12" strokeWidth="1" />
      {/* Corner brackets */}
      <path d="M22 28 V22 H28" stroke="#0A0E12" strokeWidth="1.5" />
      <path d="M58 28 V22 H52" stroke="#0A0E12" strokeWidth="1.5" />
      <path d="M22 52 V58 H28" stroke="#0A0E12" strokeWidth="1.5" />
      <path d="M58 52 V58 H52" stroke="#0A0E12" strokeWidth="1.5" />
      {/* Inner shape */}
      <circle cx="40" cy="40" r="6" fill="#B4C6D2" />
      {/* Confidence ticks */}
      <line x1="64" y1="22" x2="70" y2="22" stroke="rgba(10,14,18,0.4)" strokeWidth="1" />
      <line x1="64" y1="28" x2="70" y2="28" stroke="rgba(10,14,18,0.4)" strokeWidth="1" />
      <line x1="64" y1="34" x2="70" y2="34" stroke="rgba(10,14,18,0.25)" strokeWidth="1" />
      {/* Label dot */}
      <circle cx="14" cy="14" r="2" fill="#0A0E12" />
    </svg>
  );
}

function FusionGlyph() {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Three input nodes converging */}
      <circle cx="18" cy="20" r="3" stroke="#0A0E12" strokeWidth="1" fill="rgba(214,225,232,0.6)" />
      <circle cx="18" cy="40" r="3" stroke="#0A0E12" strokeWidth="1" fill="rgba(214,225,232,0.6)" />
      <circle cx="18" cy="60" r="3" stroke="#0A0E12" strokeWidth="1" fill="rgba(214,225,232,0.6)" />
      {/* Converging lines */}
      <path d="M21 20 Q 40 30 56 40" stroke="rgba(10,14,18,0.4)" strokeWidth="0.8" fill="none" />
      <path d="M21 40 L 56 40" stroke="rgba(10,14,18,0.4)" strokeWidth="0.8" fill="none" />
      <path d="M21 60 Q 40 50 56 40" stroke="rgba(10,14,18,0.4)" strokeWidth="0.8" fill="none" />
      {/* Output node */}
      <circle cx="60" cy="40" r="4" fill="#0A0E12" />
      <circle cx="60" cy="40" r="8" stroke="#0A0E12" strokeWidth="0.6" strokeOpacity="0.3" />
      {/* Verified check */}
      <path d="M67 38 L 70 41 L 75 35" stroke="#0A0E12" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReportGlyph() {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Dashboard frame */}
      <rect x="10" y="14" width="60" height="42" rx="2" stroke="#0A0E12" strokeWidth="1" fill="rgba(251,250,247,0.6)" />
      {/* Top bar */}
      <rect x="10" y="14" width="60" height="6" fill="rgba(10,14,18,0.06)" />
      <circle cx="14" cy="17" r="0.8" fill="#0A0E12" fillOpacity="0.25" />
      <circle cx="17" cy="17" r="0.8" fill="#0A0E12" fillOpacity="0.25" />
      {/* Bars */}
      <rect x="14" y="26" width="10" height="3" fill="#B4C6D2" />
      <rect x="14" y="32" width="18" height="3" fill="rgba(180,198,210,0.6)" />
      <rect x="14" y="38" width="14" height="3" fill="rgba(180,198,210,0.4)" />
      <rect x="14" y="44" width="22" height="3" fill="rgba(180,198,210,0.6)" />
      {/* Notification chip */}
      <rect x="44" y="26" width="22" height="22" rx="2" stroke="#0A0E12" strokeWidth="0.8" />
      <circle cx="55" cy="33" r="1.5" fill="#0A0E12" />
      <line x1="48" y1="40" x2="62" y2="40" stroke="rgba(10,14,18,0.3)" strokeWidth="0.6" />
      <line x1="48" y1="43" x2="58" y2="43" stroke="rgba(10,14,18,0.3)" strokeWidth="0.6" />
      {/* Floating alert */}
      <circle cx="68" cy="22" r="3" fill="#0A0E12" />
      <circle cx="68" cy="22" r="6" stroke="#0A0E12" strokeWidth="0.6" strokeOpacity="0.4" />
    </svg>
  );
}

const STEPS: Step[] = [
  {
    index: 'Step 01',
    title: 'Autonomous Navigation',
    description: 'WARDEN navigates hotel rooms using SLAM-based mapping and intelligent waypoint planning.',
    visual: <NavGlyph />,
  },
  {
    index: 'Step 02',
    title: 'Multi-Sensor Scanning',
    description: 'Optical, thermal, and RF sensors continuously inspect the environment for anomalies and suspicious devices.',
    visual: <ScanGlyph />,
  },
  {
    index: 'Step 03',
    title: 'AI Analysis',
    description: 'Computer vision and rule-based AI evaluate room conditions, detect objects, and classify operational risks in real time.',
    visual: <AIGlyph />,
  },
  {
    index: 'Step 04',
    title: 'Threat Verification',
    description: 'Multi-factor validation reduces false positives through layered sensor fusion and anomaly confirmation logic.',
    visual: <FusionGlyph />,
  },
  {
    index: 'Step 05',
    title: 'Real-Time Reporting',
    description: 'Inspection results are instantly synchronised with the centralised hotel dashboard for monitoring and response coordination.',
    visual: <ReportGlyph />,
  },
];

export default function HowItWorksSection() {
  const [ref, revealed] = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="how"
      data-revealed={revealed}
      className="relative bg-spectra-cream py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-0 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 h-px bg-spectra-hairline" />

      <div className="max-w-[1400px] mx-auto">

        {/* ── Header ── */}
        <div className="grid grid-cols-12 gap-8 mb-20 md:mb-28">
          <div className="col-span-12 lg:col-span-3">
            <div className="s-up flex items-center gap-3 mb-6 lg:mb-0">
              <span className="w-6 h-px bg-spectra-ink/40" />
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-spectra-ink-mute">
                03 · How It Works
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <h2 className="s-up s-d1 font-editorial font-light text-spectra-ink leading-[1.05] tracking-[-0.02em] mb-6"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}>
              An AI Pipeline<br />
              <span className="italic text-spectra-ink-soft">for Future Hotels.</span>
            </h2>
            <p className="s-up s-d2 max-w-2xl text-base md:text-[17px] leading-[1.7] text-spectra-ink-mute">
              WARDEN autonomously navigates hotel environments, analyses room
              conditions, detects anomalies, and delivers real-time operational insights.
            </p>
          </div>
        </div>

        {/* ── Stepper ── */}
        <div className="relative">
          {/* Connection rail — desktop only, sits behind the cards */}
          <div
            className="hidden lg:block absolute top-[88px] left-[6%] right-[6%] h-px pointer-events-none"
            aria-hidden="true"
          >
            <div className="relative h-full bg-spectra-ink/10">
              <div className="s-fade s-d3 absolute inset-0 origin-left"
                   style={{ background: 'linear-gradient(to right, rgba(10,14,18,0.4), rgba(180,198,210,0.6) 60%, rgba(10,14,18,0.05))' }} />
            </div>
          </div>

          {/* Steps grid */}
          <ol className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {STEPS.map((step, i) => (
              <li
                key={step.index}
                className={`s-up s-d${i + 3} relative`}
              >
                {/* Node dot — desktop only, sits on top of the rail */}
                <div className="hidden lg:flex absolute -top-[10px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full
                                bg-spectra-cream border border-spectra-ink/30 items-center justify-center z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-spectra-ink" />
                </div>

                {/* Card */}
                <article
                  className="group h-full bg-spectra-pearl rounded-2xl p-6 pt-10 lg:pt-12
                             border border-spectra-hairline
                             transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                             hover:-translate-y-1 hover:border-spectra-mist-deep/40
                             hover:shadow-[0_18px_40px_-12px_rgba(10,14,18,0.18),0_4px_10px_-4px_rgba(10,14,18,0.06)]"
                >
                  {/* Visual */}
                  <div className="w-20 h-20 mx-auto mb-6 opacity-90 group-hover:opacity-100 transition-opacity">
                    {step.visual}
                  </div>

                  {/* Index */}
                  <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-spectra-ink-faint text-center mb-3">
                    {step.index}
                  </p>

                  {/* Title */}
                  <h3 className="font-editorial text-[19px] leading-[1.2] text-spectra-ink text-center mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13.5px] leading-[1.6] text-spectra-ink-mute text-center">
                    {step.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Closing line ── */}
        <p className="s-fade s-d8 max-w-3xl mx-auto mt-20 text-center font-editorial italic text-spectra-ink-soft text-lg md:text-xl leading-[1.5]">
          From autonomous inspection to intelligent reporting — WARDEN transforms
          hotel operations into a connected AI-driven ecosystem.
        </p>
      </div>
    </section>
  );
}
