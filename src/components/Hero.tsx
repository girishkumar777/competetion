
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "./CodeEditor";
import { ChevronDown } from "lucide-react";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-between px-6 lg:px-20 py-20">
      <div className="flex-1 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Full-Stack Engineer
            <br />
            <span className="text-white">& UI Designer</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
            Building digital experiences with clean code & creative design
          </p>

          <div className="flex flex-wrap gap-6 mb-10 text-sm">
            <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>5+ years experience</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>50+ projects delivered</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>React & Node.js specialist</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold"
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-gray-600 text-white hover:bg-gray-800 px-8 py-3 text-lg font-semibold"
            >
              Download Resume
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex-1 max-w-2xl hidden lg:block"
      >
        <CodeEditor />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
      </motion.div>
    </section>
  );
};
