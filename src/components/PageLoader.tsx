import { useEffect, useState } from 'react';

/**
 * PageLoader — a hotel revolving door that spins while the page boots.
 *
 * Phases:
 *   loading (0–1500ms)   — door spins continuously
 *   opening (1500–2200ms) — door speeds up, fades out, status text dissolves
 *   done    (2200ms+)     — calls onComplete; parent unmounts the loader
 *
 * The 3D geometry lives in CSS (see .door-rig in index.css). Four glass
 * panels are arranged at 0°/90°/180°/270° around a center pole; the
 * whole rig rotates on the Y axis under perspective, so panels glide in
 * and out of view the way a real revolving door does.
 */
export default function PageLoader({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<'loading' | 'opening' | 'done'>('loading');

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase('opening'), 1500);
    const t2 = window.setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 2200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className={`page-loader ${phase}`} aria-hidden="true">
      {/* Subtle floor reflection halo */}
      <div className="loader-halo" />

      {/* The revolving door rig */}
      <div className="door-rig">
        <div className="door-spinner">
          <div className="door-panel"><span className="door-mullion" /></div>
          <div className="door-panel"><span className="door-mullion" /></div>
          <div className="door-panel"><span className="door-mullion" /></div>
          <div className="door-panel"><span className="door-mullion" /></div>
        </div>
        {/* Center pole behind the panels */}
        <div className="door-pole" />
        {/* Floor disk under the door */}
        <div className="door-floor" />
      </div>

      {/* Status readout */}
      <div className="loader-status">
        <span className="loader-dot" />
        <span className="loader-label">
          {phase === 'opening' ? 'Access Granted' : 'Securing Entry'}
        </span>
      </div>

      {/* Faint brand wordmark in the corner */}
      <div className="loader-brand">[ WARDEN ]</div>
    </div>
  );
}
