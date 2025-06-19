
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const KonamiCode = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);
  
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newSequence = [...sequence, event.code].slice(-konamiCode.length);
      setSequence(newSequence);

      if (newSequence.join(',') === konamiCode.join(',')) {
        setShowEasterEgg(true);
        console.log('🎉 Konami Code activated! You found the developer easter egg!');
        setTimeout(() => setShowEasterEgg(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sequence]);

  return (
    <AnimatePresence>
      {showEasterEgg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="bg-black/90 border-2 border-green-400 rounded-lg p-8 text-center max-w-md">
            <h2 className="text-2xl font-bold text-green-400 mb-4">🎉 KONAMI CODE!</h2>
            <p className="text-white font-mono">
              You discovered the developer easter egg!<br/>
              <span className="text-green-400">Achievement Unlocked: Code Master</span>
            </p>
            <div className="mt-4 text-xs text-gray-400">
              ↑↑↓↓←→←→BA
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
