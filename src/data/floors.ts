/**
 * Single source of truth for the WARDEN elevator's floor list.
 * Used by FloorPanel (desktop right-rail) and MobileMenu (mobile drawer)
 * so the two stay in lockstep.
 */
export interface Floor {
  /** DOM id of the matching <section> */
  id: string;
  /** Single-character label shown on the round button */
  label: string;
  /** 6-character readout for the digital display */
  name: string;
  /** Human-readable name used by the mobile menu */
  description: string;
}

export const FLOORS: Floor[] = [
  { id: 'hero',      label: 'L', name: 'LOBBY',  description: 'Lobby' },
  { id: 'problem',   label: '1', name: 'FLR 1',  description: 'The Challenge' },
  { id: 'solution',  label: '2', name: 'FLR 2',  description: 'The Solution' },
  { id: 'team',      label: 'R', name: 'RCPTN',  description: 'Reception · Team' },
  { id: 'market',    label: '4', name: 'FLR 4',  description: 'Market' },
  { id: 'marketing', label: '5', name: 'FLR 5',  description: 'Go-to-Market' },
  { id: 'roadmap',   label: '★', name: 'FUTURE', description: 'Future · Roadmap' },
];

/**
 * Imperative navigation helper used by every "go to floor" button on the page.
 * Prefers the elevator-shutter animation registered on window; falls back to
 * a plain smooth scroll when the elevator isn't mounted yet.
 */
export function navigateToFloor(floorId: string) {
  const navigate = (window as unknown as Record<string, unknown>)
    .elevatorNavigate as ((id: string) => void) | undefined;

  if (navigate) {
    navigate(floorId);
  } else {
    document.getElementById(floorId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
