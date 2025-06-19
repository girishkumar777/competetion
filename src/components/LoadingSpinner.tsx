
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const loadingMessages = [
  "Compiling awesome code... ⚡",
  "npm install happiness... 📦",
  "Debugging life choices... 🐛",
  "Pushing to production... 🚀",
  "Downloading more RAM... 💾",
  "Teaching AI to code... 🤖",
  "Refactoring the universe... 🌌",
  "Fixing merge conflicts... 🔀"
];

interface LoadingSpinnerProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export const LoadingSpinner = ({ isVisible, onComplete }: LoadingSpinnerProps) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          onComplete?.();
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="text-center max-w-md">
        {/* Terminal-style loading */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 font-mono">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 text-sm ml-4">portfolio.dev</span>
          </div>

          {/* Spinning code brackets */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl text-blue-400 mb-6"
          >
            {'{ }'}
          </motion.div>

          {/* Loading message */}
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-400 mb-4"
          >
            {loadingMessages[messageIndex]}
          </motion.p>

          {/* Progress bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <p className="text-gray-400 text-sm">
            {Math.round(Math.min(progress, 100))}% complete
          </p>
        </div>
      </div>
    </motion.div>
  );
};
