import { useScrollReveal } from '../lib/useScrollReveal';

/**
 * DashboardSection — section 06 of the Spectra redesign.
 *
 * The centerpiece is a fake "WARDEN Operations Console" — a browser-style
 * frame with sidebar, stats row, alerts chart, floor-plan view, and a live
 * feed panel. When you have a real demo video, swap the entire
 * `<div data-video-slot>` block with a `<video>` element styled to fill it.
 */

interface Stat {
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
}

const STATS: Stat[] = [
  { label: 'Inspections Today', value: '128',  delta: '+12%', positive: true },
  { label: 'Active Robots',     value: '6',    delta: '6 / 6',   positive: true },
  { label: 'Flagged Anomalies', value: '3',    delta: '−2 vs avg', positive: true },
  { label: 'Avg Inspection',    value: '4m 18s', delta: '−14s',  positive: true },
];

interface FloorRoom {
  id: string;
  status: 'clear' | 'inspecting' | 'flagged';
}

const FLOOR_ROOMS: FloorRoom[] = [
  { id: '401', status: 'clear' },
  { id: '402', status: 'clear' },
  { id: '403', status: 'inspecting' },
  { id: '404', status: 'clear' },
  { id: '405', status: 'flagged' },
  { id: '406', status: 'clear' },
  { id: '407', status: 'clear' },
  { id: '408', status: 'clear' },
  { id: '409', status: 'inspecting' },
  { id: '410', status: 'clear' },
  { id: '411', status: 'clear' },
  { id: '412', status: 'clear' },
];

interface AlertItem {
  time: string;
  room: string;
  message: string;
  level: 'info' | 'verified' | 'critical';
}

const ALERTS: AlertItem[] = [
  { time: '12:48', room: '405', message: 'RF anomaly · investigating',     level: 'critical' },
  { time: '12:42', room: '403', message: 'Inspection in progress',          level: 'info' },
  { time: '12:35', room: '402', message: 'Verified · all clear',            level: 'verified' },
  { time: '12:28', room: '401', message: 'Verified · all clear',            level: 'verified' },
  { time: '12:21', room: '409', message: 'SLAM remap · navigation',         level: 'info' },
  { time: '12:14', room: '408', message: 'Verified · all clear',            level: 'verified' },
];

// ── Mini-chart: 30 ticks of "alerts over time" ──
function AlertSparkline() {
  // Deterministic curve — same on every render so it doesn't reshuffle
  const points = [
    8, 11, 9, 14, 10, 12, 7, 9, 12, 16,
    13, 11, 14, 18, 22, 19, 16, 14, 11, 9,
    13, 17, 20, 17, 14, 11, 9, 12, 15, 12,
  ];
  const max = Math.max(...points);
  const path = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 100 - (v / max) * 100;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
  // Filled area
  const areaPath = `${path} L 100 100 L 0 100 Z`;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-32" aria-hidden="true">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(180,198,210,0.55)" />
          <stop offset="100%" stopColor="rgba(180,198,210,0)" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#sparkFill)" />
      <path d={path} fill="none" stroke="#0A0E12" strokeWidth="0.5"
            strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      {/* End-dot pulse */}
      <circle cx="100" cy={100 - (points[points.length - 1] / max) * 100}
              r="1.2" fill="#0A0E12" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const statusBadgeClass: Record<FloorRoom['status'], string> = {
  clear:       'bg-spectra-pearl border-spectra-ink/15 text-spectra-ink-mute',
  inspecting:  'bg-spectra-mist/60 border-spectra-mist-deep text-spectra-ink',
  flagged:     'bg-spectra-ink text-spectra-cream border-spectra-ink',
};

const alertLevelClass: Record<AlertItem['level'], string> = {
  info:     'bg-spectra-ink/10 text-spectra-ink-mute',
  verified: 'bg-spectra-mist/60 text-spectra-ink',
  critical: 'bg-spectra-ink text-spectra-cream',
};

export default function DashboardSection() {
  const [ref, revealed] = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="dashboard"
      data-revealed={revealed}
      className="relative bg-spectra-cream-deep py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Soft mist halo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 25%, rgba(214,225,232,0.55) 0%, transparent 60%)',
        }}
      />
      <div className="absolute top-0 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 h-px bg-spectra-hairline" />

      <div className="relative max-w-[1400px] mx-auto">

        {/* ── Header ── */}
        <div className="grid grid-cols-12 gap-8 mb-20 md:mb-24">
          <div className="col-span-12 lg:col-span-3">
            <div className="s-up flex items-center gap-3 mb-6 lg:mb-0">
              <span className="w-6 h-px bg-spectra-ink/40" />
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-spectra-ink-mute">
                06 · Dashboard
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <h2 className="s-up s-d1 font-editorial font-light text-spectra-ink leading-[1.05] tracking-[-0.02em] mb-6"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}>
              Centralised Intelligence<br />
              <span className="italic text-spectra-ink-soft">for Hotel Operations.</span>
            </h2>
            <p className="s-up s-d2 max-w-2xl text-base md:text-[17px] leading-[1.7] text-spectra-ink-mute">
              WARDEN transforms inspection data into real-time operational insights
              through a centralised AI-powered monitoring dashboard.
            </p>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            DASHBOARD MOCKUP — replace the inner block with a <video> when
            the real demo footage is ready. The outer browser chrome stays.
            ───────────────────────────────────────────────────────────── */}
        <div className="s-up s-d3 relative rounded-3xl overflow-hidden border border-spectra-hairline bg-spectra-pearl
                        shadow-[0_40px_100px_-30px_rgba(10,14,18,0.25),0_12px_30px_-10px_rgba(10,14,18,0.10)]">

          {/* Browser chrome */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-spectra-hairline bg-spectra-cream/40 backdrop-blur-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-spectra-ink/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-spectra-ink/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-spectra-ink/15" />
            </div>
            <div className="flex-1 mx-4 max-w-xl mx-auto bg-spectra-pearl rounded-md border border-spectra-hairline px-3 py-1
                            font-mono text-[10px] tracking-[0.18em] text-spectra-ink-faint text-center">
              warden.app · operations · live
            </div>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint hidden sm:inline">
              ◦ Connected
            </span>
          </div>

          {/* ── Replace this whole div with <video … /> when ready ── */}
          <div data-video-slot className="grid grid-cols-12 gap-px bg-spectra-hairline">

            {/* Sidebar */}
            <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-spectra-cream px-4 py-5">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-spectra-ink" />
                <span className="font-editorial italic text-spectra-ink text-[15px] tracking-tight">Warden</span>
              </div>

              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint mb-3">Workspace</p>
              <ul className="space-y-1 mb-6">
                {[
                  { label: 'Overview',    active: true },
                  { label: 'Inspections', active: false },
                  { label: 'Floors',      active: false },
                  { label: 'Alerts',      active: false, count: 3 },
                  { label: 'Reports',     active: false },
                  { label: 'Robots',      active: false },
                ].map((item) => (
                  <li key={item.label}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-[12px]
                        ${item.active
                          ? 'bg-spectra-ink text-spectra-cream'
                          : 'text-spectra-ink-mute hover:bg-spectra-ink/5'
                        } transition-colors`}>
                    <span>{item.label}</span>
                    {item.count && (
                      <span className={`text-[9px] font-mono ${item.active ? 'text-spectra-cream' : 'text-spectra-ink-faint'}`}>
                        {item.count}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint mb-3">Floors</p>
              <ul className="space-y-1 text-[12px] text-spectra-ink-mute">
                <li className="px-2.5 py-1">Floor 04 · 12 rooms</li>
                <li className="px-2.5 py-1">Floor 05 · 12 rooms</li>
                <li className="px-2.5 py-1">Floor 06 · 12 rooms</li>
              </ul>
            </aside>

            {/* Main area */}
            <div className="col-span-12 md:col-span-9 lg:col-span-10 bg-spectra-cream p-5 md:p-7 lg:p-8">

              {/* Page title */}
              <div className="flex items-center justify-between mb-7">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint mb-1">
                    Operations Console
                  </p>
                  <h4 className="font-editorial text-2xl text-spectra-ink tracking-tight">Overview</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint">Live</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-spectra-ink animate-pulse" />
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {STATS.map((s) => (
                  <div key={s.label}
                       className="bg-spectra-pearl border border-spectra-hairline rounded-xl p-4">
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint mb-2">
                      {s.label}
                    </p>
                    <p className="font-editorial font-light text-spectra-ink text-[28px] leading-none tracking-tight mb-2">
                      {s.value}
                    </p>
                    <p className="font-mono text-[10px] text-spectra-ink-soft">
                      {s.delta}
                    </p>
                  </div>
                ))}
              </div>

              {/* Chart + Alerts feed */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6">

                {/* Chart card */}
                <div className="lg:col-span-2 bg-spectra-pearl border border-spectra-hairline rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint mb-1">
                        Alerts · 24h
                      </p>
                      <h5 className="font-editorial text-base text-spectra-ink tracking-tight">
                        Detection Activity
                      </h5>
                    </div>
                    <div className="flex gap-1">
                      {['24H', '7D', '30D'].map((p, i) => (
                        <span key={p}
                              className={`font-mono text-[9px] tracking-[0.2em] px-2 py-1 rounded
                                ${i === 0 ? 'bg-spectra-ink text-spectra-cream' : 'text-spectra-ink-faint'}`}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <AlertSparkline />
                  <div className="flex items-center justify-between mt-3 font-mono text-[9px] tracking-[0.2em] uppercase text-spectra-ink-faint">
                    <span>00:00</span>
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>NOW</span>
                  </div>
                </div>

                {/* Alerts feed */}
                <div className="bg-spectra-pearl border border-spectra-hairline rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint">
                      Live Feed
                    </p>
                    <span className="w-1.5 h-1.5 rounded-full bg-spectra-ink animate-pulse" />
                  </div>
                  <ul className="space-y-3">
                    {ALERTS.map((a) => (
                      <li key={a.time + a.room} className="flex items-start gap-3">
                        <span className="font-mono text-[9px] text-spectra-ink-faint pt-1 shrink-0 w-9">
                          {a.time}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] text-spectra-ink truncate">
                            <span className="font-mono text-[10px] text-spectra-ink-mute mr-2">
                              {a.room}
                            </span>
                            {a.message}
                          </p>
                        </div>
                        <span className={`text-[8px] tracking-[0.2em] uppercase font-mono px-1.5 py-0.5 rounded shrink-0
                                          ${alertLevelClass[a.level]}`}>
                          {a.level}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Floor plan view */}
              <div className="bg-spectra-pearl border border-spectra-hairline rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-spectra-ink-faint mb-1">
                      Floor 04
                    </p>
                    <h5 className="font-editorial text-base text-spectra-ink tracking-tight">
                      Room Status
                    </h5>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.15em] text-spectra-ink-faint">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-sm border border-spectra-ink/20 bg-spectra-pearl" /> Clear
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-sm bg-spectra-mist border border-spectra-mist-deep" /> Active
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-sm bg-spectra-ink" /> Flagged
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                  {FLOOR_ROOMS.map((r) => (
                    <div key={r.id}
                         className={`aspect-[4/3] rounded-md border flex flex-col items-center justify-center
                                     ${statusBadgeClass[r.status]} transition-colors`}>
                      <span className="font-mono text-[10px] tracking-[0.1em]">{r.id}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* ── End dashboard mockup ── */}
        </div>

        {/* Helper hint for swapping in the real video */}
        <p className="s-fade s-d5 mt-6 text-center font-mono text-[10px] tracking-[0.3em] uppercase text-spectra-ink-faint">
          ◦ Mockup preview — replace `[data-video-slot]` with the live demo video when ready
        </p>

        {/* Closing line */}
        <p className="s-fade s-d6 max-w-3xl mx-auto mt-16 text-center font-editorial italic text-spectra-ink-soft text-lg md:text-xl leading-[1.5]">
          One console for every inspection, every room, every floor —
          delivered in real time.
        </p>
      </div>
    </section>
  );
}
