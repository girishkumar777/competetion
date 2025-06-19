
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const codeSnippets = [
  {
    filename: "portfolio.tsx",
    code: `const Portfolio = () => {
  const [isAwesome, setIsAwesome] = useState(true);
  
  useEffect(() => {
    console.log('Welcome to my portfolio! 🚀');
  }, []);

  return (
    <div className="developer">
      <h1>Passionate Full-Stack Engineer</h1>
      <Skills technologies={['React', 'Node.js', 'TypeScript']} />
      <Projects quality="premium" />
    </div>
  );
};`
  }
];

export const CodeEditor = () => {
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  
  const fullCode = codeSnippets[0].code;
  const lines = fullCode.split('\n');

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentLine < lines.length) {
        setDisplayedCode(prev => prev + (prev ? '\n' : '') + lines[currentLine]);
        setCurrentLine(prev => prev + 1);
      }
    }, 300);

    return () => clearInterval(timer);
  }, [currentLine, lines]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-2xl"
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-400 text-sm ml-4">{codeSnippets[0].filename}</span>
        </div>
        <div className="text-gray-500 text-xs flex items-center gap-2">
          <span>TypeScript React</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Code Content */}
      <div className="p-6 font-mono text-sm leading-relaxed bg-gray-900 min-h-96">
        <div className="flex">
          {/* Line Numbers */}
          <div className="text-gray-500 select-none mr-4 text-right">
            {displayedCode.split('\n').map((_, index) => (
              <div key={index} className="leading-relaxed code-line">
                {index + 1}
              </div>
            ))}
          </div>

          {/* Code */}
          <div className="flex-1">
            <pre className="text-gray-100">
              <code 
                className="code-line"
                dangerouslySetInnerHTML={{ 
                  __html: displayedCode
                    .replace(/const|let|var|function|return|useEffect|useState/g, '<span class="text-purple-400">$&</span>')
                    .replace(/Portfolio|Skills|Projects/g, '<span class="text-blue-400">$&</span>')
                    .replace(/'[^']*'/g, '<span class="text-green-400">$&</span>')
                    .replace(/\/\/.*$/gm, '<span class="text-gray-500">$&</span>')
                    .replace(/\{|\}|\(|\)|\[|\]/g, '<span class="text-yellow-400">$&</span>')
                }} 
              />
            </pre>
            {currentLine < lines.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-2 h-5 bg-blue-400 ml-1 terminal-cursor"
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
