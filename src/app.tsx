import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import BackgroundAmbience from './components/BackgroundAmbience';
import Navigation from './components/Navigation';
import SectionDivider from './components/SectionDivider';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import ChatSection from './sections/ChatSection';
import MultimodalSection from './sections/MultimodalSection';
import ScenariosSection from './sections/ScenariosSection';
import PerformanceSection from './sections/PerformanceSection';
import VisionSection from './sections/VisionSection';
import CTASection from './sections/CTASection';
import ScrollStorySection from './sections/ScrollStorySection';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="relative min-h-screen bg-ai-dark text-white">
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <BackgroundAmbience />
      <Navigation />

      <main className="relative z-10">
        <HeroSection />
        <ChatSection />
        <MultimodalSection />
        <ScenariosSection />
        <ScrollStorySection />
        <SectionDivider />
        <PerformanceSection />
        <VisionSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
