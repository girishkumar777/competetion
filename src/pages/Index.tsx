
import { useState, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { InteractiveTechStack } from "@/components/InteractiveTechStack";
import { Contact } from "@/components/Contact";
import { GitTimeline } from "@/components/GitTimeline";
import { ScrollProgress } from "@/components/ScrollProgress";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { MagneticCursor } from "@/components/MagneticCursor";
import { MatrixBackground } from "@/components/MatrixBackground";
import { KonamiCode } from "@/components/KonamiCode";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ASCIIArt } from "@/components/ASCIIArt";
import { ParticleSystem } from "@/components/ParticleSystem";
import { GitHubContributions } from "@/components/GitHubContributions";
import { PerformanceMetrics } from "@/components/PerformanceMetrics";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useGSAPAnimations();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingSpinner 
        isVisible={isLoading} 
        onComplete={() => setIsLoading(false)} 
      />
      
      <ScrollProgress />
      <MagneticCursor />
      <MatrixBackground />
      <ParticleSystem />
      <KonamiCode />
      <ThemeToggle />
      
      <div className="min-h-screen bg-gray-900 text-white relative z-20 font-inter">
        <div className="console-trigger">
          <Hero />
          <div className="flex justify-center">
            <ASCIIArt />
          </div>
        </div>
        
        <div className="console-trigger">
          <Skills />
        </div>
        
        <div className="console-trigger">
          <Projects />
        </div>
        
        <div className="console-trigger">
          <InteractiveTechStack />
        </div>
        
        <section className="py-20 px-6 lg:px-20 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Performance Metrics
              </span>
            </h2>
            <PerformanceMetrics />
          </div>
        </section>
        
        <section className="py-20 px-6 lg:px-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Development Activity
              </span>
            </h2>
            <GitHubContributions />
          </div>
        </section>
        
        <GitTimeline />
        
        <div className="console-trigger">
          <Contact />
        </div>
      </div>
    </>
  );
};

export default Index;
