
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  char: string;
}

export const ParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const chars = ['{', '}', '<', '>', '(', ')', '[', ']', ';', '='];

    const createParticle = (x: number, y: number) => {
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1,
        char: chars[Math.floor(Math.random() * chars.length)]
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        particles.push(createParticle(e.clientX, e.clientY));
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.02;

        ctx.fillStyle = `rgba(34, 197, 94, ${particle.life})`;
        ctx.font = '16px monospace';
        ctx.fillText(particle.char, particle.x, particle.y);

        if (particle.life <= 0) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-60"
    />
  );
};
