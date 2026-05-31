import { useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { FLOORS } from '../data/floors';

interface ElevatorShutterProps {
  onTransitionStart?: () => void;
  onTransitionEnd?: () => void;
}

// Floor order + label lookup, driven by the canonical FLOORS list so the
// indicator can never desync from the floor panel / mobile menu.
const floorOrder = FLOORS.map((f) => f.id);
const labelById = new Map(FLOORS.map((f) => [f.id, f.label]));

// Create elevator ping sound
const createPingSound = () => {
  if (typeof window === 'undefined' || !window.AudioContext) return null;
  try {
    const ctx = new AudioContext();
    return {
      play: () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      }
    };
  } catch {
    return null;
  }
};

export default function ElevatorShutter({ onTransitionStart, onTransitionEnd }: ElevatorShutterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const shaftRef = useRef<HTMLDivElement>(null);
  const floorIndicatorRef = useRef<HTMLDivElement>(null);
  const motionBlurRef = useRef<HTMLDivElement>(null);
  const currentFloorRef = useRef<string>('hero');
  const isAnimating = useRef(false);
  const pingSound = useRef<{ play: () => void } | null>(null);

  useEffect(() => {
    pingSound.current = createPingSound();
  }, []);

  const navigateToFloor = useCallback((targetId: string) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    onTransitionStart?.();

    const leftDoor = leftDoorRef.current;
    const rightDoor = rightDoorRef.current;
    const shaft = shaftRef.current;
    const floorIndicator = floorIndicatorRef.current;
    const motionBlur = motionBlurRef.current;
    const container = containerRef.current;
    
    if (!leftDoor || !rightDoor || !shaft || !floorIndicator || !motionBlur || !container) {
      isAnimating.current = false;
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) {
      isAnimating.current = false;
      return;
    }

    // Determine direction: up or down
    const currentIndex = floorOrder.indexOf(currentFloorRef.current);
    const targetIndex = floorOrder.indexOf(targetId);
    const isGoingUp = targetIndex < currentIndex;
    const floorDistance = Math.abs(targetIndex - currentIndex);
    
    // Update floor indicator text — pull straight from FLOORS so the
    // shutter shows the same label as the floor panel ("L", "01", … "C").
    const targetLabel = labelById.get(targetId) ?? '·';
    
    currentFloorRef.current = targetId;

    // Travel duration based on distance (physics-based feel)
    const baseTravelTime = 0.8;
    const travelDuration = baseTravelTime + (floorDistance * 0.25);
    
    // Shaft movement distance (parallax effect - shaft moves faster for depth)
    const shaftDistance = isGoingUp ? 150 : -150;
    const shaftDistanceMultiplied = shaftDistance * floorDistance;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        onTransitionEnd?.();
      },
    });

    // Phase 1: Close doors with physics easing
    tl.to(leftDoor, {
      x: '0%',
      duration: 0.7,
      ease: 'power2.inOut',
    }, 0);
    tl.to(rightDoor, {
      x: '0%',
      duration: 0.7,
      ease: 'power2.inOut',
    }, 0);

    // Phase 2: Show shaft walls and start elevator movement
    tl.to(shaft, {
      opacity: 1,
      duration: 0.3,
    }, 0.5);

    // Show motion blur effect during movement
    tl.to(motionBlur, {
      opacity: isGoingUp ? 0.4 : 0.4,
      duration: 0.2,
    }, 0.6);

    // Animate shaft walls moving (parallax - background moves faster)
    // This creates the illusion of depth and speed
    tl.to(shaft.querySelectorAll('.shaft-layer-back'), {
      y: shaftDistanceMultiplied * 1.5, // Back layer moves fastest
      duration: travelDuration,
      ease: 'power2.inOut', // Physics-based: slow start, fast middle, slow end
    }, 0.7);
    
    tl.to(shaft.querySelectorAll('.shaft-layer-mid'), {
      y: shaftDistanceMultiplied * 1.0, // Mid layer
      duration: travelDuration,
      ease: 'power2.inOut',
    }, 0.7);
    
    tl.to(shaft.querySelectorAll('.shaft-layer-front'), {
      y: shaftDistanceMultiplied * 0.6, // Front layer moves slowest (closer = slower parallax)
      duration: travelDuration,
      ease: 'power2.inOut',
    }, 0.7);

    // Update floor indicator with counting effect
    tl.to(floorIndicator, {
      opacity: 1,
      duration: 0.2,
    }, 0.6);
    
    // Flash indicator during travel
    tl.to(floorIndicator.querySelector('.indicator-text'), {
      textContent: isGoingUp ? '▲' : '▼',
      duration: 0.01,
    }, 0.7);
    
    tl.to(floorIndicator.querySelector('.indicator-text'), {
      textContent: targetLabel,
      duration: 0.01,
    }, 0.7 + travelDuration - 0.3);

    // Phase 3: Instant scroll at midpoint
    tl.call(() => {
      target.scrollIntoView({ behavior: 'auto' });
    }, [], 0.7 + (travelDuration / 2));

    // Phase 4: Deceleration - hide motion blur
    tl.to(motionBlur, {
      opacity: 0,
      duration: 0.3,
    }, 0.7 + travelDuration - 0.3);

    // Phase 5: Reset shaft and hide
    tl.to(shaft, {
      opacity: 0,
      duration: 0.2,
    }, 0.7 + travelDuration);
    
    tl.set(shaft.querySelectorAll('.shaft-layer-back, .shaft-layer-mid, .shaft-layer-front'), {
      y: 0,
    }, 0.9 + travelDuration);

    // Hide floor indicator
    tl.to(floorIndicator, {
      opacity: 0,
      duration: 0.2,
    }, 0.7 + travelDuration);

    // Phase 6: Play arrival ping
    tl.call(() => {
      pingSound.current?.play();
    }, [], 0.9 + travelDuration);

    // Phase 7: Open doors with physics easing
    tl.to(leftDoor, {
      x: '-100%',
      duration: 0.7,
      ease: 'power2.inOut',
    }, 1.0 + travelDuration);
    tl.to(rightDoor, {
      x: '100%',
      duration: 0.7,
      ease: 'power2.inOut',
    }, 1.0 + travelDuration);
  }, [onTransitionStart, onTransitionEnd]);

  // Expose navigateToFloor globally
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as unknown as Record<string, unknown>).elevatorNavigate = navigateToFloor;
    }
  }, [navigateToFloor]);

  return (
    <div
      ref={containerRef}
      id="elevator-shutter"
      className="fixed inset-0 z-50 pointer-events-none flex overflow-hidden"
      aria-hidden="true"
    >
      {/* Motion blur overlay */}
      <div
        ref={motionBlurRef}
        className="absolute inset-0 z-30 pointer-events-none opacity-0"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(180,180,180,0.02) 20%, rgba(180,180,180,0.04) 50%, rgba(180,180,180,0.02) 80%, transparent 100%)',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Elevator shaft with parallax layers */}
      <div
        ref={shaftRef}
        className="absolute inset-0 z-20 pointer-events-none opacity-0 overflow-hidden"
      >
        {/* Back layer - furthest, moves fastest */}
        <div className="shaft-layer-back absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={`back-${i}`}
              className="absolute left-0 right-0 h-[1px]"
              style={{
                top: `${i * 5}%`,
                background: 'linear-gradient(90deg, rgba(180,180,180,0.12) 0%, rgba(180,180,180,0.04) 20%, transparent 50%, rgba(180,180,180,0.04) 80%, rgba(180,180,180,0.12) 100%)',
              }}
            />
          ))}
        </div>

        {/* Mid layer */}
        <div className="shaft-layer-mid absolute inset-0">
          {/* Left shaft wall */}
          <div className="absolute left-0 top-0 bottom-0 w-20">
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={`mid-left-${i}`}
                className="absolute left-0 w-full h-[2px]"
                style={{
                  top: `${i * 7}%`,
                  background: 'linear-gradient(90deg, rgba(200,200,200,0.2) 0%, rgba(200,200,200,0.06) 60%, transparent 100%)',
                }}
              />
            ))}
          </div>
          {/* Right shaft wall */}
          <div className="absolute right-0 top-0 bottom-0 w-20">
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={`mid-right-${i}`}
                className="absolute right-0 w-full h-[2px]"
                style={{
                  top: `${i * 7}%`,
                  background: 'linear-gradient(270deg, rgba(200,200,200,0.2) 0%, rgba(200,200,200,0.06) 60%, transparent 100%)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Front layer - closest, moves slowest */}
        <div className="shaft-layer-front absolute inset-0">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={`front-${i}`}
              className="absolute left-1/4 right-1/4 h-[2px]"
              style={{
                top: `${10 + i * 12}%`,
                background: 'linear-gradient(90deg, transparent 0%, rgba(220,220,220,0.25) 30%, rgba(220,220,220,0.35) 50%, rgba(220,220,220,0.25) 70%, transparent 100%)',
                boxShadow: '0 0 8px rgba(200,200,200,0.15)',
              }}
            />
          ))}
        </div>

        {/* Vertical guide rails */}
        <div
          className="absolute left-8 top-0 bottom-0 w-[1px]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(200,200,200,0.15) 20%, rgba(200,200,200,0.15) 80%, transparent 100%)',
          }}
        />
        <div
          className="absolute right-8 top-0 bottom-0 w-[1px]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(200,200,200,0.15) 20%, rgba(200,200,200,0.15) 80%, transparent 100%)',
          }}
        />
      </div>

      {/* Floor indicator display */}
      <div
        ref={floorIndicatorRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 opacity-0"
      >
        <div className="relative">
          {/* Indicator frame — matte black with silver border */}
          <div className="w-20 h-20 rounded border border-[rgba(200,200,200,0.25)] bg-[#0f0f0f]/95 flex items-center justify-center backdrop-blur-sm">
            <span className="indicator-text font-mono text-3xl text-[rgba(220,220,220,0.9)] font-light tracking-wider">
              L
            </span>
          </div>
          {/* Subtle silver glow */}
          <div className="absolute inset-0 rounded" style={{
            boxShadow: '0 0 20px rgba(200,200,200,0.08), inset 0 0 12px rgba(200,200,200,0.04)',
          }} />
        </div>
      </div>

      {/* Left Door */}
      <div
        ref={leftDoorRef}
        id="left-door"
        className="w-1/2 h-full relative z-30"
        style={{ transform: 'translateX(-100%)' }}
      >
        {/* Main door panel — matte black */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#111111] to-[#141414]">
          {/* Brushed metal texture */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(200,200,200,0.015) 3px, rgba(200,200,200,0.015) 6px)',
          }} />
        </div>

        {/* Door edge highlight — silver */}
        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[rgba(200,200,200,0.35)] to-transparent" />

        {/* Interior panel lines */}
        <div className="absolute inset-4 border border-[rgba(200,200,200,0.08)] rounded-sm">
          <div className="absolute inset-3 border border-[rgba(200,200,200,0.04)] rounded-sm" />
        </div>

        {/* Door handle — brushed silver */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2">
          <div className="w-1 h-20 rounded-full bg-gradient-to-b from-[rgba(200,200,200,0.15)] via-[rgba(200,200,200,0.35)] to-[rgba(200,200,200,0.15)]" style={{ boxShadow: '0 0 6px rgba(200,200,200,0.12)' }} />
        </div>

        {/* Safety edge sensor */}
        <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-[rgba(200,200,200,0.18)] to-transparent" />
      </div>

      {/* Right Door */}
      <div
        ref={rightDoorRef}
        id="right-door"
        className="w-1/2 h-full relative z-30"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Main door panel — matte black */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-[#111111] to-[#141414]">
          {/* Brushed metal texture */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(200,200,200,0.015) 3px, rgba(200,200,200,0.015) 6px)',
          }} />
        </div>

        {/* Door edge highlight — silver */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[rgba(200,200,200,0.35)] to-transparent" />

        {/* Interior panel lines */}
        <div className="absolute inset-4 border border-[rgba(200,200,200,0.08)] rounded-sm">
          <div className="absolute inset-3 border border-[rgba(200,200,200,0.04)] rounded-sm" />
        </div>

        {/* Door handle — brushed silver */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2">
          <div className="w-1 h-20 rounded-full bg-gradient-to-b from-[rgba(200,200,200,0.15)] via-[rgba(200,200,200,0.35)] to-[rgba(200,200,200,0.15)]" style={{ boxShadow: '0 0 6px rgba(200,200,200,0.12)' }} />
        </div>

        {/* Safety edge sensor */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-[rgba(200,200,200,0.18)] to-transparent" />
      </div>
    </div>
  );
}
