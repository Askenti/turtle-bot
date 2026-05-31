import { useCallback, useState } from 'react';
import CursorGlow from '../components/CursorGlow';
import TextileBackground from '../components/TextileBackground';
import ElevatorShutter from '../components/ElevatorShutter';
import FloorPanel from '../components/FloorPanel';
import Header from '../components/Header';
import PageLoader from '../components/PageLoader';
import HeroSection from '../sections/HeroSection';
import ProblemSection from '../sections/ProblemSection';
import EcosystemSection from '../sections/EcosystemSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import DetectionSection from '../sections/DetectionSection';
import AITechSection from '../sections/AITechSection';
import DashboardSection from '../sections/DashboardSection';
import SecuritySection from '../sections/SecuritySection';
import BusinessSection from '../sections/BusinessSection';
import RoadmapSection from '../sections/RoadmapSection';
import ContactSection from '../sections/ContactSection';
import FooterSection from '../sections/FooterSection';

/**
 * Home — Spectra redesign.
 *
 *   L   Hero
 *   01  Problem
 *   02  Ecosystem
 *   03  How It Works
 *   04  Detection
 *   05  AI & Technology
 *   06  Dashboard
 *   07  Security
 *   08  Business
 *   09  RaaS
 *   10  Roadmap
 *   11  Contact + Team
 *       Footer
 */
export default function Home() {
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
          {/* Site-wide silk/textile layer that drifts and follows the cursor */}
          <TextileBackground />
          {/* Site-wide film-grain texture */}
          <div className="grain-overlay" aria-hidden="true" />
          <CursorGlow />
          <ElevatorShutter
            onTransitionStart={handleTransitionStart}
            onTransitionEnd={handleTransitionEnd}
          />

          <FloorPanel />
          <Header />

          <main>
            <HeroSection />
            <ProblemSection />
            <EcosystemSection />
            <HowItWorksSection />
            <DetectionSection />
            <AITechSection />
            <DashboardSection />
            <SecuritySection />
            <BusinessSection />
            <RoadmapSection />
            <ContactSection />

            <FooterSection />
          </main>
        </div>
      )}
    </>
  );
}
