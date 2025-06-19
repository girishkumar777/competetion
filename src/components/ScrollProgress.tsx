
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ScrollProgress = () => {
  useEffect(() => {
    const progressBar = document.querySelector('.scroll-progress-bar');
    
    if (progressBar) {
      gsap.set(progressBar, { scaleX: 0 });
      
      gsap.to(progressBar, {
        scaleX: 1,
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
      <div 
        className="scroll-progress-bar h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400"
        style={{ transformOrigin: 'left center', transform: 'scaleX(0)' }}
      />
      <div className="absolute top-1 right-4 text-xs text-gray-400 font-mono">
        <span className="animate-pulse">git status: scrolling...</span>
      </div>
    </div>
  );
};
