import { useEffect, useState } from 'react';

/**
 * PageLoader — a hotel revolving door that spins while the page boots.
 *
 * Phases:
 *   loading (0–1800ms)   — door spins continuously
 *   opening (1800–2800ms) — door speeds up, zooms through
 *   done    (2800ms+)     — calls onComplete; parent unmounts the loader
 *
 * The 3D geometry is a classic 4-panel revolving door with proper perspective,
 * glass panels, and frame elements that create an immersive hotel entrance.
 */
export default function PageLoader({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<'loading' | 'opening' | 'done'>('loading');

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase('opening'), 1800);
    const t2 = window.setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 2800);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className={`page-loader-v2 ${phase}`} aria-hidden="true">
      {/* Background atmosphere */}
      <div className="loader-atmosphere" />
      
      {/* Floor reflection */}
      <div className="loader-floor-reflection" />

      {/* The revolving door assembly */}
      <div className="revolving-door-wrapper">
        {/* Outer frame / housing */}
        <div className="door-housing">
          {/* Left curved wall */}
          <div className="door-wall door-wall-left" />
          {/* Right curved wall */}
          <div className="door-wall door-wall-right" />
          {/* Top arc frame */}
          <div className="door-frame-top" />
        </div>

        {/* The spinning door rig */}
        <div className="revolving-door-rig">
          <div className="revolving-door-spinner">
            {/* Four glass panels */}
            <div className="revolving-panel panel-1">
              <div className="panel-glass">
                <div className="panel-frame" />
                <div className="panel-reflection" />
              </div>
            </div>
            <div className="revolving-panel panel-2">
              <div className="panel-glass">
                <div className="panel-frame" />
                <div className="panel-reflection" />
              </div>
            </div>
            <div className="revolving-panel panel-3">
              <div className="panel-glass">
                <div className="panel-frame" />
                <div className="panel-reflection" />
              </div>
            </div>
            <div className="revolving-panel panel-4">
              <div className="panel-glass">
                <div className="panel-frame" />
                <div className="panel-reflection" />
              </div>
            </div>
            {/* Center pole */}
            <div className="revolving-center-pole" />
          </div>
        </div>

        {/* Floor circle */}
        <div className="door-floor-circle" />
      </div>

      {/* Status readout */}
      <div className="loader-status-v2">
        <span className="status-indicator" />
        <span className="status-text">
          {phase === 'opening' ? 'Welcome' : 'Preparing Entry'}
        </span>
      </div>

      {/* Brand mark */}
      <div className="loader-brand-v2">WARDEN</div>
    </div>
  );
}
