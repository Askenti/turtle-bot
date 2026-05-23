import { useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';

interface ElevatorShutterProps {
  onTransitionStart?: () => void;
  onTransitionEnd?: () => void;
}

export default function ElevatorShutter({ onTransitionStart, onTransitionEnd }: ElevatorShutterProps) {
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const navigateToFloor = useCallback((targetId: string) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    onTransitionStart?.();

    const leftDoor = leftDoorRef.current;
    const rightDoor = rightDoorRef.current;
    if (!leftDoor || !rightDoor) {
      isAnimating.current = false;
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) {
      isAnimating.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        onTransitionEnd?.();
      },
    });

    // Phase 1: Close doors (0ms - 800ms)
    tl.to(leftDoor, {
      x: '0%',
      duration: 0.8,
      ease: 'power4.inOut',
    }, 0);
    tl.to(rightDoor, {
      x: '0%',
      duration: 0.8,
      ease: 'power4.inOut',
    }, 0);

    // Phase 2: Instant scroll at 800ms
    tl.call(() => {
      target.scrollIntoView({ behavior: 'auto' });
    }, [], 0.8);

    // Phase 3: Open doors at 1400ms
    tl.to(leftDoor, {
      x: '-100%',
      duration: 0.8,
      ease: 'power4.inOut',
    }, 1.4);
    tl.to(rightDoor, {
      x: '100%',
      duration: 0.8,
      ease: 'power4.inOut',
    }, 1.4);
  }, [onTransitionStart, onTransitionEnd]);

  // Expose navigateToFloor globally
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as unknown as Record<string, unknown>).elevatorNavigate = navigateToFloor;
    }
  }, [navigateToFloor]);

  return (
    <div
      id="elevator-shutter"
      className="fixed inset-0 z-50 pointer-events-none flex"
      aria-hidden="true"
    >
      {/* Left Door */}
      <div
        ref={leftDoorRef}
        id="left-door"
        className="w-1/2 h-full bg-gradient-to-r from-warden-teal-deep via-warden-teal-dark to-warden-teal border-r border-warden-cyan/40 relative flex items-center justify-end"
        style={{ transform: 'translateX(-100%)' }}
      >
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-warden-cyan/20 font-serif text-9xl select-none">
          G
        </div>
      </div>

      {/* Right Door */}
      <div
        ref={rightDoorRef}
        id="right-door"
        className="w-1/2 h-full bg-gradient-to-l from-warden-teal-deep via-warden-teal-dark to-warden-teal border-l border-warden-cyan/40 relative flex items-center justify-start"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-warden-cyan/20 font-serif text-9xl select-none">
          I
        </div>
      </div>
    </div>
  );
}
