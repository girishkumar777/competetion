
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimations = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Smooth locomotive-style scrolling
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero code editor typing animation
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
      gsap.fromTo(line, 
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.6,
          delay: index * 0.3,
          ease: "power2.out"
        }
      );
    });

    // Terminal cursor blinking
    gsap.to('.terminal-cursor', {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Skills bars animation on scroll
    gsap.utils.toArray('.skill-bar').forEach((bar: any) => {
      gsap.fromTo(bar, 
        { width: '0%' },
        {
          width: '100%',
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Project cards stagger animation
    gsap.utils.toArray('.project-card').forEach((card: any, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 100, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Tech stack icons bounce animation
    gsap.utils.toArray('.tech-icon').forEach((icon: any, index) => {
      gsap.fromTo(icon,
        { opacity: 0, scale: 0, rotation: 180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: icon,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Console log messages on scroll
    const consoleMessages = [
      "console.log('Welcome to my portfolio! 🚀');",
      "console.log('Scrolling through awesome projects...');",
      "console.log('Loading developer skills... ⚡');",
      "console.log('Contact form ready for deployment!');",
    ];

    gsap.utils.toArray('.console-trigger').forEach((trigger: any, index) => {
      ScrollTrigger.create({
        trigger: trigger,
        start: "top 70%",
        onEnter: () => {
          if (consoleMessages[index]) {
            console.log(consoleMessages[index]);
          }
        }
      });
    });

    // Progress bar animation
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
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

    // Git commit timeline animation
    gsap.utils.toArray('.commit-item').forEach((item: any, index) => {
      gsap.fromTo(item,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};
