/**
 * Single source of truth for the WARDEN site's section structure.
 * Used by FloorPanel (desktop right-rail) and MobileMenu (mobile drawer)
 * so the two stay in lockstep.
 *
 * The site narrative reads top-to-bottom as a hotel tour:
 *   L     Lobby / Hero
 *   01    The Problem  — why hotels need this
 *   02    Ecosystem    — what WARDEN is
 *   03    How it Works — the pipeline
 *   04    Detection    — multi-factor hidden-camera defense
 *   05    AI & Tech    — CV, SLAM, Edge AI
 *   06    Dashboard    — real-time reporting
 *   07    Security     — privacy-first architecture
 *   08    Business     — value + WARDEN Verified
 *   09    RaaS         — deployment model
 *   10    Roadmap      — what's next
 *   C     Contact      — demo + team
 */
export interface Floor {
  /** DOM id of the matching <section> */
  id: string;
  /** Short label shown on the round elevator button */
  label: string;
  /** ~6-char readout for the digital display */
  name: string;
  /** Human-readable name used by the mobile menu */
  description: string;
}

export const FLOORS: Floor[] = [
  { id: 'hero',       label: 'L',  name: 'LOBBY',  description: 'Lobby' },
  { id: 'problem',    label: '01', name: 'FLR 01', description: 'The Problem' },
  { id: 'ecosystem',  label: '02', name: 'FLR 02', description: 'Ecosystem' },
  { id: 'how',        label: '03', name: 'FLR 03', description: 'How It Works' },
  { id: 'detection',  label: '04', name: 'FLR 04', description: 'Detection' },
  { id: 'ai',         label: '05', name: 'FLR 05', description: 'AI & Technology' },
  { id: 'dashboard',  label: '06', name: 'FLR 06', description: 'Dashboard' },
  { id: 'security',   label: '07', name: 'FLR 07', description: 'Security' },
  { id: 'business',   label: '08', name: 'FLR 08', description: 'Business Value' },
  { id: 'raas',       label: '09', name: 'FLR 09', description: 'RaaS Model' },
  { id: 'roadmap',    label: '10', name: 'FLR 10', description: 'Roadmap' },
  { id: 'contact',    label: 'C',  name: 'CTACT',  description: 'Demo & Contact' },
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
