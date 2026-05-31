import { useScrollReveal } from '../lib/useScrollReveal';

// ── Subsection 1 visual: Computer Vision frame ────────────────────────────────
function ComputerVisionVisual() {
  return (
    <svg viewBox="0 0 400 280" fill="none" aria-hidden="true" className="w-full h-auto">
      {/* Outer frame */}
      <rect x="10" y="10" width="380" height="260" rx="6"
            stroke="rgba(10,14,18,0.3)" strokeWidth="1" fill="rgba(251,250,247,0.7)" />

      {/* Camera viewfinder grid */}
      <line x1="10" y1="100" x2="390" y2="100" stroke="rgba(10,14,18,0.06)" strokeWidth="0.5" />
      <line x1="10" y1="180" x2="390" y2="180" stroke="rgba(10,14,18,0.06)" strokeWidth="0.5" />
      <line x1="140" y1="10" x2="140" y2="270" stroke="rgba(10,14,18,0.06)" strokeWidth="0.5" />
      <line x1="260" y1="10" x2="260" y2="270" stroke="rgba(10,14,18,0.06)" strokeWidth="0.5" />

      {/* Detection bounding boxes */}
      <rect x="50" y="60" width="110" height="80" stroke="#0A0E12" strokeWidth="1.4" fill="none" />
      <rect x="50" y="48" width="48" height="11" fill="#0A0E12" />
      <text x="55" y="56" fontSize="7" fill="#FBFAF7" fontFamily="monospace" letterSpacing="0.5">CAMERA · 0.92</text>

      <rect x="200" y="110" width="80" height="60" stroke="#0A0E12" strokeWidth="1.4" fill="none" />
      <rect x="200" y="98" width="58" height="11" fill="#0A0E12" />
      <text x="205" y="106" fontSize="7" fill="#FBFAF7" fontFamily="monospace" letterSpacing="0.5">ANOMALY · 0.86</text>

      <rect className="dashed-flow" x="290" y="180" width="70" height="50" stroke="rgba(180,198,210,0.9)" strokeWidth="1.2" fill="none" strokeDasharray="3 2" />
      <text x="295" y="178" fontSize="7" fill="rgba(10,14,18,0.6)" fontFamily="monospace" letterSpacing="0.4">CANDIDATE · 0.51</text>

      {/* Corner reticle marks */}
      <path d="M18 18 L 18 26 M 18 18 L 26 18" stroke="#0A0E12" strokeWidth="1" />
      <path d="M382 18 L 382 26 M 382 18 L 374 18" stroke="#0A0E12" strokeWidth="1" />
      <path d="M18 262 L 18 254 M 18 262 L 26 262" stroke="#0A0E12" strokeWidth="1" />
      <path d="M382 262 L 382 254 M 382 262 L 374 262" stroke="#0A0E12" strokeWidth="1" />

      {/* Status chip top right */}
      <rect x="320" y="20" width="62" height="18" rx="3" fill="#0A0E12" />
      <circle cx="328" cy="29" r="2" fill="#B4C6D2" />
      <text x="334" y="32" fontSize="7" fill="#FBFAF7" fontFamily="monospace" letterSpacing="0.5">LIVE · YOLOv8</text>
    </svg>
  );
}

// ── Subsection 2 visual: SLAM Navigation map ──────────────────────────────────
function SLAMNavVisual() {
  return (
    <svg viewBox="0 0 400 280" fill="none" aria-hidden="true" className="w-full h-auto">
      {/* Floor plan outline */}
      <rect x="10" y="10" width="380" height="260" rx="4"
            stroke="rgba(10,14,18,0.3)" strokeWidth="1" fill="rgba(251,250,247,0.7)" />

      {/* Inner room dividers */}
      <line x1="150" y1="10" x2="150" y2="160" stroke="rgba(10,14,18,0.25)" strokeWidth="1" />
      <line x1="10" y1="160" x2="280" y2="160" stroke="rgba(10,14,18,0.25)" strokeWidth="1" />
      <line x1="280" y1="10" x2="280" y2="270" stroke="rgba(10,14,18,0.25)" strokeWidth="1" />

      {/* Furniture rectangles */}
      <rect x="22" y="24" width="50" height="22" stroke="rgba(10,14,18,0.18)" strokeWidth="0.7" />
      <rect x="86" y="24" width="40" height="22" stroke="rgba(10,14,18,0.18)" strokeWidth="0.7" />
      <rect x="170" y="40" width="90" height="30" stroke="rgba(10,14,18,0.18)" strokeWidth="0.7" />
      <rect x="170" y="100" width="50" height="40" stroke="rgba(10,14,18,0.18)" strokeWidth="0.7" />
      <rect x="22" y="186" width="80" height="50" stroke="rgba(10,14,18,0.18)" strokeWidth="0.7" />
      <rect x="300" y="40" width="70" height="50" stroke="rgba(10,14,18,0.18)" strokeWidth="0.7" />
      <rect x="300" y="160" width="70" height="90" stroke="rgba(10,14,18,0.18)" strokeWidth="0.7" />

      {/* SLAM grid dots */}
      {Array.from({ length: 10 }).map((_, x) =>
        Array.from({ length: 7 }).map((_, y) => (
          <circle key={`${x}-${y}`}
                  cx={40 + x * 36}
                  cy={30 + y * 32}
                  r="0.6"
                  fill="rgba(10,14,18,0.15)" />
        ))
      )}

      {/* Path */}
      <path className="dashed-flow" d="M30 250 Q 80 220 130 200 T 230 150 Q 280 130 320 90 T 360 40"
            stroke="rgba(180,198,210,0.95)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />

      {/* Waypoints */}
      <circle cx="30" cy="250" r="3" fill="#0A0E12" />
      <circle cx="130" cy="200" r="2" stroke="#0A0E12" strokeWidth="1" fill="rgba(214,225,232,0.8)" />
      <circle cx="230" cy="150" r="2" stroke="#0A0E12" strokeWidth="1" fill="rgba(214,225,232,0.8)" />
      <circle cx="320" cy="90" r="2" stroke="#0A0E12" strokeWidth="1" fill="rgba(214,225,232,0.8)" />

      {/* Current position — robot */}
      <circle cx="360" cy="40" r="4" fill="#0A0E12" />
      <circle cx="360" cy="40" r="9" stroke="#0A0E12" strokeWidth="0.6" strokeOpacity="0.3" />
      <circle cx="360" cy="40" r="14" stroke="#0A0E12" strokeWidth="0.4" strokeOpacity="0.15" />

      {/* Compass */}
      <circle cx="370" cy="262" r="9" stroke="rgba(10,14,18,0.4)" strokeWidth="0.8" fill="rgba(251,250,247,0.9)" />
      <path d="M370 256 L 372 262 L 370 268 L 368 262 Z" fill="#0A0E12" />
      <text x="366" y="252" fontSize="6" fill="rgba(10,14,18,0.5)" fontFamily="monospace">N</text>

      {/* Status chip */}
      <rect x="18" y="20" width="76" height="16" rx="3" fill="#0A0E12" />
      <circle cx="26" cy="28" r="2" fill="#B4C6D2" />
      <text x="32" y="31" fontSize="7" fill="#FBFAF7" fontFamily="monospace" letterSpacing="0.5">SLAM · ACTIVE</text>
    </svg>
  );
}

// ── Subsection 3 visual: Edge AI architecture ─────────────────────────────────
function EdgeAIVisual() {
  return (
    <svg viewBox="0 0 400 280" fill="none" aria-hidden="true" className="w-full h-auto">
      {/* Frame */}
      <rect x="10" y="10" width="380" height="260" rx="4"
            stroke="rgba(10,14,18,0.3)" strokeWidth="1" fill="rgba(251,250,247,0.7)" />

      {/* Sensor layer (bottom) */}
      <rect x="40" y="220" width="60" height="34" rx="3" stroke="rgba(10,14,18,0.6)" strokeWidth="0.8" fill="rgba(251,250,247,0.95)" />
      <text x="48" y="240" fontSize="8" fill="rgba(10,14,18,0.7)" fontFamily="monospace" letterSpacing="0.5">SENSOR</text>
      <text x="56" y="250" fontSize="6" fill="rgba(10,14,18,0.45)" fontFamily="monospace">CAM · IR</text>

      <rect x="170" y="220" width="60" height="34" rx="3" stroke="rgba(10,14,18,0.6)" strokeWidth="0.8" fill="rgba(251,250,247,0.95)" />
      <text x="178" y="240" fontSize="8" fill="rgba(10,14,18,0.7)" fontFamily="monospace" letterSpacing="0.5">SENSOR</text>
      <text x="187" y="250" fontSize="6" fill="rgba(10,14,18,0.45)" fontFamily="monospace">THERMAL</text>

      <rect x="300" y="220" width="60" height="34" rx="3" stroke="rgba(10,14,18,0.6)" strokeWidth="0.8" fill="rgba(251,250,247,0.95)" />
      <text x="308" y="240" fontSize="8" fill="rgba(10,14,18,0.7)" fontFamily="monospace" letterSpacing="0.5">SENSOR</text>
      <text x="320" y="250" fontSize="6" fill="rgba(10,14,18,0.45)" fontFamily="monospace">RF</text>

      {/* Edge layer (middle) */}
      <rect x="120" y="130" width="160" height="55" rx="6" fill="rgba(214,225,232,0.5)" stroke="#0A0E12" strokeWidth="1.2" />
      <text x="155" y="150" fontSize="10" fill="#0A0E12" fontFamily="serif" fontStyle="italic">Edge AI Core</text>
      <text x="138" y="166" fontSize="7" fill="rgba(10,14,18,0.6)" fontFamily="monospace" letterSpacing="0.5">RPi · LOCAL INFERENCE</text>
      <text x="148" y="177" fontSize="6" fill="rgba(10,14,18,0.45)" fontFamily="monospace" letterSpacing="0.5">MQTT · API GATEWAY</text>

      {/* Cloud layer (top) */}
      <path d="M140 50 Q 130 38 145 32 Q 150 22 165 26 Q 178 18 192 26 Q 210 22 215 36 Q 230 38 225 52 Q 235 58 220 65 L 145 65 Q 130 60 140 50 Z"
            fill="rgba(251,250,247,0.9)" stroke="rgba(10,14,18,0.55)" strokeWidth="1" />
      <text x="160" y="50" fontSize="9" fill="#0A0E12" fontFamily="serif" fontStyle="italic">Cloud</text>

      {/* Dashboard layer (top right) */}
      <rect x="260" y="32" width="100" height="44" rx="4" stroke="rgba(10,14,18,0.55)" strokeWidth="1" fill="rgba(251,250,247,0.9)" />
      <rect x="260" y="32" width="100" height="9" fill="rgba(10,14,18,0.07)" />
      <circle cx="266" cy="36.5" r="1" fill="rgba(10,14,18,0.3)" />
      <circle cx="270" cy="36.5" r="1" fill="rgba(10,14,18,0.3)" />
      <rect x="268" y="48" width="22" height="3" fill="#B4C6D2" />
      <rect x="268" y="54" width="34" height="3" fill="rgba(180,198,210,0.6)" />
      <rect x="268" y="60" width="18" height="3" fill="rgba(180,198,210,0.5)" />
      <rect x="295" y="48" width="22" height="22" rx="2" fill="rgba(10,14,18,0.06)" />
      <text x="297" y="72" fontSize="6" fill="rgba(10,14,18,0.45)" fontFamily="monospace" letterSpacing="0.5">DASHBOARD</text>

      {/* Connection lines */}
      {/* sensor → edge */}
      <path d="M70 220 L 130 185" stroke="rgba(10,14,18,0.45)" strokeWidth="0.8" fill="none" />
      <path d="M200 220 L 200 185" stroke="rgba(10,14,18,0.45)" strokeWidth="0.8" fill="none" />
      <path d="M330 220 L 270 185" stroke="rgba(10,14,18,0.45)" strokeWidth="0.8" fill="none" />
      {/* edge → cloud */}
      <path className="dashed-flow" d="M155 130 Q 130 100 175 70" stroke="rgba(10,14,18,0.45)" strokeWidth="0.8" fill="none" strokeDasharray="3 2" />
      {/* edge → dashboard */}
      <path className="dashed-flow" d="M245 130 Q 270 100 290 76" stroke="rgba(10,14,18,0.45)" strokeWidth="0.8" fill="none" strokeDasharray="3 2" />
      {/* cloud → dashboard */}
      <path className="dashed-flow" d="M225 50 L 260 50" stroke="rgba(10,14,18,0.35)" strokeWidth="0.8" fill="none" strokeDasharray="3 2" />

      {/* Tier labels */}
      <text x="18" y="22" fontSize="6" fill="rgba(10,14,18,0.4)" fontFamily="monospace" letterSpacing="0.4">CLOUD / DASHBOARD</text>
      <text x="18" y="125" fontSize="6" fill="rgba(10,14,18,0.4)" fontFamily="monospace" letterSpacing="0.4">EDGE INFERENCE</text>
      <text x="18" y="215" fontSize="6" fill="rgba(10,14,18,0.4)" fontFamily="monospace" letterSpacing="0.4">SENSOR ARRAY</text>
    </svg>
  );
}

interface Chapter {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  flow?: string[];
  visual: React.ReactNode;
  /** 'left' = visual on the left, text on the right */
  visualSide: 'left' | 'right';
}

const CHAPTERS: Chapter[] = [
  {
    number: '05.1',
    eyebrow: 'Computer Vision',
    title: 'Seeing the Room as the AI Sees It.',
    description:
      'WARDEN uses AI-powered computer vision to analyse hotel environments, detect anomalies, and support autonomous inspection workflows in real time.',
    features: [
      'YOLOv8 object detection',
      'OpenCV image preprocessing',
      'Confidence-based filtering',
      'Real-time anomaly analysis',
      'Rule-based evaluation logic',
    ],
    flow: ['Capture', 'Preprocess', 'Detect', 'Evaluate', 'Report'],
    visual: <ComputerVisionVisual />,
    visualSide: 'left',
  },
  {
    number: '05.2',
    eyebrow: 'SLAM Navigation',
    title: 'Autonomous Mapping, Continuously.',
    description:
      'Using ROS2-based SLAM, WARDEN maps hotel environments, plans efficient routes, and dynamically avoids obstacles during inspection operations.',
    features: [
      'Real-time mapping',
      'Autonomous waypoint navigation',
      'Localisation & path planning',
      'Obstacle avoidance',
      'Dynamic movement control',
    ],
    visual: <SLAMNavVisual />,
    visualSide: 'right',
  },
  {
    number: '05.3',
    eyebrow: 'Edge AI Architecture',
    title: 'Privacy-First by Design.',
    description:
      'WARDEN processes operational data through a privacy-first edge AI architecture engineered for low-latency autonomous decisions and scalable hotel deployment.',
    features: [
      'Raspberry Pi edge inference',
      'Local AI processing',
      'MQTT communication',
      'Cloud synchronisation',
      'Dashboard telemetry integration',
      'Secure API infrastructure',
    ],
    visual: <EdgeAIVisual />,
    visualSide: 'left',
  },
];

export default function AITechSection() {
  const [ref, revealed] = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="ai"
      data-revealed={revealed}
      className="relative bg-spectra-cream py-16 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-0 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 h-px bg-spectra-hairline" />

      <div className="max-w-[1400px] mx-auto">

        {/* ── Section header ── */}
        <div className="grid grid-cols-12 gap-8 mb-14 md:mb-32">
          <div className="col-span-12 lg:col-span-3">
            <div className="s-up flex items-center gap-3 mb-6 lg:mb-0">
              <span className="w-6 h-px bg-spectra-ink/40" />
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase bg-spectra-ink text-spectra-cream px-3 py-1.5 rounded-md font-semibold">
                05 · AI & Technology
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <h2 className="s-up s-d1 font-editorial font-light text-spectra-ink leading-[1.05] tracking-[-0.02em] mb-6"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 4rem)' }}>
              Engineering Intelligence<br />
              <span className="italic text-spectra-ink-soft">Behind WARDEN.</span>
            </h2>
            <p className="s-up s-d2 max-w-2xl text-base md:text-[17px] leading-[1.7] text-spectra-ink-mute">
              WARDEN combines computer vision, autonomous robotics, and edge AI
              infrastructure to deliver intelligent real-time hospitality operations.
            </p>
          </div>
        </div>

        {/* ── Chapters ── */}
        <div className="space-y-28 md:space-y-40">
          {CHAPTERS.map((ch) => {
            const visualFirst = ch.visualSide === 'left';
            return (
              <article
                key={ch.number}
                className="grid grid-cols-12 gap-8 md:gap-12 items-center"
              >
                {/* Visual panel */}
                <div
                  className={`s-up col-span-12 lg:col-span-6 ${
                    visualFirst ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative rounded-2xl border border-spectra-hairline bg-spectra-pearl
                                  p-6 md:p-8 shadow-[0_18px_50px_-15px_rgba(10,14,18,0.12)]">
                    {/* Tiny chrome dot */}
                    <div className="flex items-center gap-1.5 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-spectra-ink/15" />
                      <span className="w-1.5 h-1.5 rounded-full bg-spectra-ink/15" />
                      <span className="w-1.5 h-1.5 rounded-full bg-spectra-ink/15" />
                      <span className="ml-auto font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint">
                        {ch.number}
                      </span>
                    </div>
                    {ch.visual}
                  </div>
                </div>

                {/* Text panel */}
                <div
                  className={`s-up s-d2 col-span-12 lg:col-span-6 ${
                    visualFirst ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  {/* Eyebrow */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-spectra-ink-faint">
                      {ch.number}
                    </span>
                    <span className="w-6 h-px bg-spectra-ink/30" />
                    <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-spectra-ink-mute">
                      {ch.eyebrow}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-editorial font-light text-spectra-ink leading-[1.1] tracking-[-0.015em] mb-5"
                      style={{ fontSize: 'clamp(1.3rem, 3vw, 2.25rem)' }}>
                    {ch.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[15px] leading-[1.7] text-spectra-ink-mute mb-7 max-w-lg">
                    {ch.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-2.5 mb-7">
                    {ch.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[14px] text-spectra-ink-soft">
                        <span className="mt-[8px] w-1 h-1 rounded-full bg-spectra-mist-deep shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Flow ribbon — only if defined */}
                  {ch.flow && (
                    <div className="flex items-center flex-wrap gap-2 pt-5 border-t border-spectra-hairline">
                      {ch.flow.map((step, i) => (
                        <div key={step} className="flex items-center gap-2">
                          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-spectra-ink-soft">
                            {step}
                          </span>
                          {i < ch.flow!.length - 1 && (
                            <span className="text-spectra-ink-faint text-xs">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
