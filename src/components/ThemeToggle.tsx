
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check if dark class is already on document
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    // Apply the theme to the document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`fixed top-6 right-6 z-40 p-3 backdrop-blur-sm border rounded-full transition-all duration-300 ${
        isDark 
          ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600' 
          : 'bg-white/50 border-gray-300 hover:border-gray-400'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-blue-400" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
};
