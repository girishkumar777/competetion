
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const ASCIIArt = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  
  const asciiArt = [
    "    ┌─────────────────────────────────┐",
    "    │  ╔═══╗╔═══╗╔═══╗╔═══╗╔═══╗      │",
    "    │  ║   ║║   ║║   ║║   ║║   ║      │",
    "    │  ║   ║║   ║║   ║║   ║║   ║      │",
    "    │  ╚═══╝╚═══╝╚═══╝╚═══╝╚═══╝      │",
    "    │                                 │",
    "    │    FULL-STACK DEVELOPER         │",
    "    │      PORTFOLIO v2.0             │",
    "    └─────────────────────────────────┘"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      asciiArt.forEach((line, index) => {
        setTimeout(() => {
          setDisplayedLines(prev => [...prev, line]);
        }, index * 150);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-mono text-xs text-green-400 leading-tight mt-8"
    >
      {displayedLines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
};
