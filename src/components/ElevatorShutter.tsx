import { useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';

interface ElevatorShutterProps {
  onTransitionStart?: () => void;
  onTransitionEnd?: () => void;
}

// Floor order for determining direction
const floorOrder = ['hero', 'problem', 'solution', 'team', 'market', 'marketing', 'roadmap'];

export default function ElevatorShutter({ onTransitionStart, onTransitionEnd }: ElevatorShutterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const floorLinesRef = useRef<HTMLDivElement>(null);
  const currentFloorRef = useRef<string>('hero');
  const isAnimating = useRef(false);

  const navigateToFloor = useCallback((targetId: string) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    onTransitionStart?.();

    const leftDoor = leftDoorRef.current;
    const rightDoor = rightDoorRef.current;
    const floorLines = floorLinesRef.current;
    const container = containerRef.current;
    
    if (!leftDoor || !rightDoor || !floorLines || !container) {
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
    
    // Update current floor
    currentFloorRef.current = targetId;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        onTransitionEnd?.();
      },
    });

    // Phase 1: Close doors (0ms - 600ms)
    tl.to(leftDoor, {
      x: '0%',
      duration: 0.6,
      ease: 'power3.inOut',
    }, 0);
    tl.to(rightDoor, {
      x: '0%',
      duration: 0.6,
      ease: 'power3.inOut',
    }, 0);

    // Phase 2: Show floor lines and animate vertical movement
    tl.to(floorLines, {
      opacity: 1,
      duration: 0.2,
    }, 0.5);

    // Animate floor lines moving (simulates elevator movement)
    const lineSpeed = isGoingUp ? 100 : -100;
    const travelDuration = 0.3 + (floorDistance * 0.15); // Longer travel for more floors
    
    tl.to(floorLines, {
      y: lineSpeed * floorDistance,
      duration: travelDuration,
      ease: 'power1.inOut',
    }, 0.6);

    // Phase 3: Instant scroll during travel
    tl.call(() => {
      target.scrollIntoView({ behavior: 'auto' });
    }, [], 0.6 + (travelDuration / 2));

    // Phase 4: Hide floor lines and reset
    tl.to(floorLines, {
      opacity: 0,
      duration: 0.2,
    }, 0.6 + travelDuration);
    
    tl.set(floorLines, {
      y: 0,
    }, 0.8 + travelDuration);

    // Phase 5: Open doors
    tl.to(leftDoor, {
      x: '-100%',
      duration: 0.6,
      ease: 'power3.inOut',
    }, 0.9 + travelDuration);
    tl.to(rightDoor, {
      x: '100%',
      duration: 0.6,
      ease: 'power3.inOut',
    }, 0.9 + travelDuration);
  }, [onTransitionStart, onTransitionEnd]);

  // Expose navigateToFloor globally
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as unknown as Record<string, unknown>).elevatorNavigate = navigateToFloor;
    }
  }, [navigateToFloor]);

  // Generate floor indicator lines
  const floorLineElements = Array.from({ length: 12 }, (_, i) => (
    <div 
      key={i} 
      className="h-[2px] bg-gradient-to-r from-transparent via-warden-cyan/40 to-transparent"
      style={{ 
        width: `${60 + Math.random() * 30}%`,
        marginLeft: `${Math.random() * 20}%`
      }}
    />
  ));

  return (
    <div
      ref={containerRef}
      id="elevator-shutter"
      className="fixed inset-0 z-50 pointer-events-none flex overflow-hidden"
      aria-hidden="true"
    >
      {/* Left Door */}
      <div
        ref={leftDoorRef}
        id="left-door"
        className="w-1/2 h-full bg-gradient-to-r from-[#041518] via-[#082528] to-[#0a2e33] relative"
        style={{ transform: 'translateX(-100%)' }}
      >
        {/* Door panel details */}
        <div className="absolute inset-0 border-r-2 border-[#00F0FF]/20" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#00F0FF]/5 to-transparent" />
        
        {/* Elevator cabin texture - horizontal lines */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 30 }, (_, i) => (
            <div 
              key={i} 
              className="h-px bg-[#00F0FF]/30"
              style={{ marginTop: `${3 + i * 3.3}%` }}
            />
          ))}
        </div>
        
        {/* Door handle */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-20 rounded-full bg-gradient-to-b from-[#00F0FF]/40 via-[#00F0FF]/20 to-[#00F0FF]/40" />
      </div>

      {/* Floor indicator lines (moving during transition) */}
      <div
        ref={floorLinesRef}
        className="absolute inset-0 flex flex-col justify-center gap-8 opacity-0 pointer-events-none z-10"
      >
        {floorLineElements}
      </div>

      {/* Right Door */}
      <div
        ref={rightDoorRef}
        id="right-door"
        className="w-1/2 h-full bg-gradient-to-l from-[#041518] via-[#082528] to-[#0a2e33] relative"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Door panel details */}
        <div className="absolute inset-0 border-l-2 border-[#00F0FF]/20" />
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#00F0FF]/5 to-transparent" />
        
        {/* Elevator cabin texture - horizontal lines */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 30 }, (_, i) => (
            <div 
              key={i} 
              className="h-px bg-[#00F0FF]/30"
              style={{ marginTop: `${3 + i * 3.3}%` }}
            />
          ))}
        </div>
        
        {/* Door handle */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1 h-20 rounded-full bg-gradient-to-b from-[#00F0FF]/40 via-[#00F0FF]/20 to-[#00F0FF]/40" />
      </div>
    </div>
  );
}
