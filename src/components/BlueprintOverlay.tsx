/**
 * BlueprintOverlay — faint cyan hotel-floor-plan SVG rendered at very low
 * opacity behind beige section content. Uses a fixed viewport so it tiles
 * naturally across any section height.
 *
 * The plan features:
 *  - Outer room perimeter with thick walls
 *  - Interior partition walls (bathroom, closet, entrance corridor)
 *  - Door swing arcs
 *  - Furniture outlines (bed, desk, chair, bath)
 *  - Dimension tick marks & leader lines
 *  - Small room labels in blueprint font
 */
export default function BlueprintOverlay({ opacity = 0.045 }: { opacity?: number }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 900"
    >
      <defs>
        <style>{`
          .bp { stroke:#00c4b4; fill:none; }
          .bp-fill { fill:#00c4b4; stroke:none; }
          .bp-label {
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            fill: #00c4b4;
            letter-spacing: 0.15em;
            text-transform: uppercase;
          }
          .bp-dim {
            font-family: 'JetBrains Mono', monospace;
            font-size: 9px;
            fill: #00c4b4;
          }
        `}</style>
      </defs>

      {/* ── Room 1 — Standard King (left) ─────────────────────────────── */}
      {/* Outer walls (thick) */}
      <rect x="60"  y="80"  width="340" height="260" strokeWidth="5" className="bp" />
      {/* Inner partition — bathroom right wall */}
      <line x1="310" y1="80"  x2="310" y2="260" strokeWidth="3" className="bp" />
      {/* Bathroom bottom */}
      <line x1="310" y1="260" x2="400" y2="260" strokeWidth="3" className="bp" />
      {/* Closet partition */}
      <line x1="60"  y1="260" x2="200" y2="260" strokeWidth="3" className="bp" />
      {/* Entry corridor */}
      <line x1="200" y1="260" x2="200" y2="340" strokeWidth="3" className="bp" />

      {/* Door — main entry (bottom) */}
      <line x1="200" y1="340" x2="260" y2="340" strokeWidth="3" className="bp" />
      <path d="M260,340 A60,60 0 0,0 200,280" strokeWidth="1.5" strokeDasharray="4 3" className="bp" />

      {/* Door — bathroom */}
      <line x1="310" y1="180" x2="310" y2="220" strokeWidth="1.5" className="bp" />
      <path d="M310,220 A40,40 0 0,1 350,180" strokeWidth="1" strokeDasharray="3 2" className="bp" />

      {/* Furniture — bed */}
      <rect x="90"  y="110" width="140" height="120" strokeWidth="1.5" className="bp" />
      <rect x="90"  y="110" width="140" height="28"  strokeWidth="1"   className="bp" />
      {/* Pillow outlines */}
      <rect x="98"  y="115" width="50"  height="16"  strokeWidth="0.8" className="bp" />
      <rect x="162" y="115" width="50"  height="16"  strokeWidth="0.8" className="bp" />

      {/* Furniture — desk */}
      <rect x="250" y="110" width="50"  height="30"  strokeWidth="1.5" className="bp" />
      {/* Desk chair */}
      <rect x="252" y="148" width="22"  height="22"  rx="4" strokeWidth="1" className="bp" />

      {/* Bathroom — toilet */}
      <rect x="320" y="210" width="28" height="42" rx="4" strokeWidth="1.5" className="bp" />
      <ellipse cx="334" cy="242" rx="12" ry="8" strokeWidth="1" className="bp" />
      {/* Bathtub */}
      <rect x="318" y="90" width="72" height="110" rx="6" strokeWidth="1.5" className="bp" />
      <rect x="325" y="97" width="58" height="96"  rx="4" strokeWidth="0.8" className="bp" />

      {/* Closet — hanger rail */}
      <line x1="70"  y1="270" x2="190" y2="270" strokeWidth="1"   strokeDasharray="5 3" className="bp" />
      <line x1="130" y1="265" x2="130" y2="335" strokeWidth="0.8" className="bp" />

      {/* Labels */}
      <text x="130" y="175" textAnchor="middle" className="bp-label">Bedroom</text>
      <text x="355" y="175" textAnchor="middle" className="bp-label">Bath</text>
      <text x="112" y="298" textAnchor="middle" className="bp-label" style={{fontSize:'9px'}}>Closet</text>

      {/* Dimension ticks — width */}
      <line x1="60"  y1="50"  x2="400" y2="50"  strokeWidth="0.8" className="bp" />
      <line x1="60"  y1="44"  x2="60"  y2="56"  strokeWidth="0.8" className="bp" />
      <line x1="400" y1="44"  x2="400" y2="56"  strokeWidth="0.8" className="bp" />
      <text x="230" y="45" textAnchor="middle" className="bp-dim">6 400mm</text>

      {/* ── Room 2 — Double (right of centre) ─────────────────────────── */}
      <rect x="480" y="80"  width="320" height="280" strokeWidth="5"  className="bp" />
      <line x1="690" y1="80"  x2="690" y2="240" strokeWidth="3"  className="bp" />
      <line x1="690" y1="240" x2="800" y2="240" strokeWidth="3"  className="bp" />
      <line x1="480" y1="240" x2="600" y2="240" strokeWidth="3"  className="bp" />
      <line x1="600" y1="240" x2="600" y2="360" strokeWidth="3"  className="bp" />

      {/* Door — main */}
      <line x1="600" y1="360" x2="660" y2="360" strokeWidth="3"  className="bp" />
      <path d="M660,360 A60,60 0 0,0 600,300" strokeWidth="1.5" strokeDasharray="4 3" className="bp" />

      {/* Twin beds */}
      <rect x="500" y="110" width="80"  height="100" strokeWidth="1.5" className="bp" />
      <rect x="500" y="110" width="80"  height="22"  strokeWidth="1"   className="bp" />
      <rect x="600" y="110" width="80"  height="100" strokeWidth="1.5" className="bp" />
      <rect x="600" y="110" width="80"  height="22"  strokeWidth="1"   className="bp" />

      {/* Night stand */}
      <rect x="586" y="120" width="12" height="28" strokeWidth="1"   className="bp" />

      {/* Bath room 2 */}
      <rect x="700" y="90"  width="68"  height="100" rx="5" strokeWidth="1.5" className="bp" />
      <rect x="707" y="97"  width="54"  height="86"  rx="3" strokeWidth="0.8" className="bp" />
      <rect x="700" y="200" width="26"  height="36"  rx="3" strokeWidth="1.5" className="bp" />
      <ellipse cx="713" cy="228" rx="10" ry="7" strokeWidth="1" className="bp" />

      <text x="595" y="190" textAnchor="middle" className="bp-label">Twin Room</text>
      <text x="734" y="155" textAnchor="middle" className="bp-label" style={{fontSize:'9px'}}>Bath</text>

      {/* Dimension */}
      <line x1="480" y1="50"  x2="800" y2="50"  strokeWidth="0.8" className="bp" />
      <line x1="480" y1="44"  x2="480" y2="56"  strokeWidth="0.8" className="bp" />
      <line x1="800" y1="44"  x2="800" y2="56"  strokeWidth="0.8" className="bp" />
      <text x="640" y="45"  textAnchor="middle" className="bp-dim">5 800mm</text>

      {/* ── Corridor ──────────────────────────────────────────────────────── */}
      <rect x="60"  y="360" width="760" height="80" strokeWidth="3" className="bp" />
      <line x1="420" y1="360" x2="420" y2="440" strokeWidth="1.5" strokeDasharray="8 4" className="bp" />
      <text x="240" y="406" textAnchor="middle" className="bp-label">Corridor</text>
      <text x="590" y="406" textAnchor="middle" className="bp-label">Corridor</text>

      {/* ── Suite — large room bottom ──────────────────────────────────── */}
      <rect x="60"  y="480" width="440" height="340" strokeWidth="5"  className="bp" />
      <line x1="370" y1="480" x2="370" y2="700" strokeWidth="3"  className="bp" />
      <line x1="370" y1="700" x2="500" y2="700" strokeWidth="3"  className="bp" />
      <line x1="60"  y1="700" x2="240" y2="700" strokeWidth="3"  className="bp" />
      <line x1="240" y1="700" x2="240" y2="820" strokeWidth="3"  className="bp" />

      {/* Door */}
      <line x1="240" y1="820" x2="320" y2="820" strokeWidth="3"  className="bp" />
      <path d="M320,820 A80,80 0 0,0 240,740" strokeWidth="1.5" strokeDasharray="4 3" className="bp" />

      {/* King bed */}
      <rect x="90"  y="510" width="160" height="150" strokeWidth="2" className="bp" />
      <rect x="90"  y="510" width="160" height="32"  strokeWidth="1" className="bp" />
      <rect x="96"  y="516" width="65"  height="20"  strokeWidth="0.8" className="bp" />
      <rect x="173" y="516" width="65"  height="20"  strokeWidth="0.8" className="bp" />

      {/* Sofa / living area */}
      <rect x="270" y="540" width="80"  height="42"  rx="6" strokeWidth="1.5" className="bp" />
      <rect x="275" y="548" width="70"  height="30"  rx="4" strokeWidth="0.8" className="bp" />
      {/* Coffee table */}
      <rect x="280" y="596" width="60"  height="34"  strokeWidth="1" className="bp" />

      {/* Suite bath */}
      <rect x="380" y="490" width="100" height="140" rx="5" strokeWidth="1.5" className="bp" />
      <rect x="387" y="497" width="86"  height="126" rx="3" strokeWidth="0.8" className="bp" />
      <rect x="382" y="642" width="32"  height="50"  rx="4" strokeWidth="1.5" className="bp" />
      <ellipse cx="398" cy="678" rx="13" ry="9" strokeWidth="1" className="bp" />

      {/* Closet suite */}
      <line x1="70"  y1="710" x2="230" y2="710" strokeWidth="1"   strokeDasharray="5 3" className="bp" />
      <line x1="150" y1="703" x2="150" y2="818" strokeWidth="0.8" className="bp" />

      <text x="170" y="620" textAnchor="middle" className="bp-label">Suite</text>
      <text x="430" y="565" textAnchor="middle" className="bp-label" style={{fontSize:'9px'}}>Bath</text>
      <text x="115" y="745" textAnchor="middle" className="bp-label" style={{fontSize:'9px'}}>Closet</text>

      {/* ── Elevator lobby (top right) ─────────────────────────────────── */}
      <rect x="880" y="80"  width="260" height="340" strokeWidth="3" className="bp" />
      {/* Elevator shafts */}
      <rect x="900" y="100" width="80"  height="100" strokeWidth="2" className="bp" />
      <rect x="1040" y="100" width="80"  height="100" strokeWidth="2" className="bp" />
      {/* Elevator doors */}
      <line x1="940" y1="100" x2="940" y2="200" strokeWidth="1.5" strokeDasharray="3 2" className="bp" />
      <line x1="1080" y1="100" x2="1080" y2="200" strokeWidth="1.5" strokeDasharray="3 2" className="bp" />
      {/* X on shafts */}
      <line x1="900"  y1="100" x2="980"  y2="200" strokeWidth="0.8" strokeDasharray="4 3" className="bp" />
      <line x1="980"  y1="100" x2="900"  y2="200" strokeWidth="0.8" strokeDasharray="4 3" className="bp" />
      <line x1="1040" y1="100" x2="1120" y2="200" strokeWidth="0.8" strokeDasharray="4 3" className="bp" />
      <line x1="1120" y1="100" x2="1040" y2="200" strokeWidth="0.8" strokeDasharray="4 3" className="bp" />

      {/* Lobby seating */}
      <rect x="900"  y="260" width="220" height="50"  rx="6" strokeWidth="1.5" className="bp" />
      <rect x="906"  y="268" width="208" height="36"  rx="4" strokeWidth="0.8" className="bp" />
      <rect x="940"  y="318" width="140" height="30"  strokeWidth="1" className="bp" />

      <text x="1010" y="160" textAnchor="middle" className="bp-label">Elevators</text>
      <text x="1010" y="294" textAnchor="middle" className="bp-label" style={{fontSize:'9px'}}>Seating</text>

      {/* ── Staircase ─────────────────────────────────────────────────────── */}
      <rect x="880" y="460" width="120" height="180" strokeWidth="3" className="bp" />
      {[0,1,2,3,4,5,6].map(i => (
        <line key={i} x1="880" y1={460 + i*26} x2="1000" y2={460 + i*26} strokeWidth="1" className="bp" />
      ))}
      <text x="940" y="558" textAnchor="middle" className="bp-label" style={{fontSize:'9px'}}>Stairs</text>

      {/* ── North arrow ───────────────────────────────────────────────────── */}
      <g transform="translate(1120,820)">
        <circle cx="0" cy="0" r="22" strokeWidth="1.5" className="bp" />
        <path d="M0,-18 L6,12 L0,6 L-6,12 Z" strokeWidth="1.5" className="bp" />
        <path d="M0,-18 L6,12 L0,6 L-6,12 Z" className="bp-fill" style={{opacity:0.3}} />
        <text x="0" y="-5" textAnchor="middle" className="bp-label" style={{fontSize:'10px'}}>N</text>
      </g>

      {/* ── Title block ───────────────────────────────────────────────────── */}
      <rect x="880" y="700" width="260" height="100" strokeWidth="1.5" className="bp" />
      <line x1="880" y1="722" x2="1140" y2="722" strokeWidth="0.8" className="bp" />
      <line x1="880" y1="752" x2="1140" y2="752" strokeWidth="0.8" className="bp" />
      <text x="1010" y="716" textAnchor="middle" className="bp-label" style={{fontSize:'10px'}}>WARDEN Hotel</text>
      <text x="1010" y="742" textAnchor="middle" className="bp-dim">Floor Plan · Level 3</text>
      <text x="1010" y="768" textAnchor="middle" className="bp-dim">Scale 1:100 · Drawing No. WH-03</text>
      <text x="1010" y="790" textAnchor="middle" className="bp-dim">2026</text>
    </svg>
  );
}
