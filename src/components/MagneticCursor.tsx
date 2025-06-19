
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const MagneticCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [isVisible, setIsVisible] = useState(false);

  const codeSymbols = ['<', '>', '{', '}', '(', ')', ';', '=', '+', '-'];

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Add trail
      const newTrail = { x: e.clientX, y: e.clientY, id: Date.now() };
      setTrails(prev => [...prev.slice(-5), newTrail]);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Clean up old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => prev.slice(-3));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 mix-blend-difference">
      {/* Main cursor */}
      <motion.div
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
        className="absolute w-5 h-5 bg-cyan-400 rounded-full opacity-80"
      />

      {/* Outer ring */}
      <motion.div
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
        }}
        className="absolute w-10 h-10 border-2 border-cyan-400 rounded-full opacity-60"
      />

      {/* Code symbol trails */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          initial={{
            x: trail.x,
            y: trail.y,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: trail.x + (Math.random() - 0.5) * 50,
            y: trail.y + (Math.random() - 0.5) * 50,
            opacity: 0,
            scale: 0.5,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="absolute text-cyan-400 font-mono text-sm pointer-events-none"
        >
          {codeSymbols[Math.floor(Math.random() * codeSymbols.length)]}
        </motion.div>
      ))}
    </div>
  );
};
