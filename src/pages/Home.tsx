import { useCallback, useState } from 'react';
import ElevatorShutter from '../components/ElevatorShutter';
import FloorPanel from '../components/FloorPanel';
import Header from '../components/Header';
import PageLoader from '../components/PageLoader';
import HeroSection from '../sections/HeroSection';
import ProblemSection from '../sections/ProblemSection';
import SolutionSection from '../sections/SolutionSection';
import TeamSection from '../sections/TeamSection';
import MarketSection from '../sections/MarketSection';
import MarketingSection from '../sections/MarketingSection';
import RoadmapSection from '../sections/RoadmapSection';
import FooterSection from '../sections/FooterSection';

export default function Home() {
  // The page content only mounts after the revolving door finishes,
  // so the hero's boot-sequence animations start fresh on reveal.
  const [booted, setBooted] = useState(false);

  const handleTransitionStart = useCallback(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const handleTransitionEnd = useCallback(() => {
    document.body.style.overflow = '';
  }, []);

  return (
    <>
      {!booted && <PageLoader onComplete={() => setBooted(true)} />}

      {booted && (
        <div className="page-reveal">
          {/* Elevator shutter overlay */}
          <ElevatorShutter
            onTransitionStart={handleTransitionStart}
            onTransitionEnd={handleTransitionEnd}
          />

          {/* Fixed floor navigation panel */}
          <FloorPanel />

          {/* Fixed header */}
          <Header />

          {/* Page sections */}
          <main>
            <HeroSection />
            <ProblemSection />
            <SolutionSection />
            <TeamSection />
            <MarketSection />
            <MarketingSection />
            <RoadmapSection />
            <FooterSection />
          </main>
        </div>
      )}
    </>
  );
}
