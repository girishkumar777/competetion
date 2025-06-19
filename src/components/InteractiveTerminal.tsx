
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp?: string;
}

export const InteractiveTerminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to Interactive Portfolio Terminal v1.0.0' },
    { type: 'output', content: 'Type "help" to see available commands' },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  about     - Learn about me',
      '  skills    - View my technical skills',
      '  projects  - List my featured projects',
      '  contact   - Get my contact information',
      '  clear     - Clear the terminal',
      '  whoami    - Display current user info',
      '  date      - Show current date and time',
      '  github    - Open my GitHub profile',
    ],
    about: () => [
      'Full-Stack Engineer & UI Designer',
      '5+ years of experience building scalable web applications',
      'Passionate about clean code and exceptional user experiences',
      'Specialized in React, Node.js, and modern web technologies',
    ],
    skills: () => [
      'Frontend: React, TypeScript, Next.js, Tailwind CSS',
      'Backend: Node.js, Python, PostgreSQL, MongoDB',
      'Tools: Docker, AWS, Git, Figma',
      'Currently learning: Rust, WebAssembly, Three.js',
    ],
    projects: () => [
      '1. E-Commerce Platform - React, Node.js, Stripe',
      '2. AI Chat Application - React, Socket.io, OpenAI',
      '3. Task Management System - Vue.js, Firebase',
      '4. Portfolio Website - React, TypeScript, GSAP',
    ],
    contact: () => [
      'Email: developer@example.com',
      'LinkedIn: /in/developer',
      'GitHub: /developer',
      'Portfolio: https://developer.dev',
    ],
    whoami: () => ['guest@portfolio:~$'],
    date: () => [new Date().toString()],
    clear: () => {
      setLines([]);
      return [];
    },
    github: () => {
      window.open('https://github.com', '_blank');
      return ['Opening GitHub profile...'];
    },
  };

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    const handler = commands[cmd as keyof typeof commands];
    
    if (handler) {
      const output = handler();
      return output;
    } else if (cmd === '') {
      return [];
    } else {
      return [`Command not found: ${cmd}. Type "help" for available commands.`];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    setIsTyping(true);
    
    // Add input line
    const inputLine: TerminalLine = {
      type: 'input',
      content: `guest@portfolio:~$ ${currentInput}`,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Process command
    const output = handleCommand(currentInput);
    const outputLines: TerminalLine[] = output.map(line => ({
      type: 'output',
      content: line,
    }));

    setTimeout(() => {
      setLines(prev => [...prev, inputLine, ...outputLines]);
      setCurrentInput('');
      setIsTyping(false);
    }, 300);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <section className="py-20 px-6 lg:px-20 bg-gray-900/50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
            Interactive Terminal
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Try some commands! Click in the terminal and type "help" to get started.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
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
              <span className="text-gray-400 text-sm ml-4">terminal — guest@portfolio</span>
            </div>
            <div className="text-gray-500 text-xs flex items-center gap-2">
              <span>Interactive Mode</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="p-6 font-mono text-sm bg-gray-900 h-96 overflow-y-auto"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Terminal Lines */}
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-1 ${
                  line.type === 'input' 
                    ? 'text-green-400' 
                    : line.type === 'error' 
                    ? 'text-red-400' 
                    : 'text-gray-300'
                }`}
              >
                {line.content}
              </motion.div>
            ))}

            {/* Current Input Line */}
            <div className="flex items-center text-green-400">
              <span className="mr-2">guest@portfolio:~$</span>
              <form onSubmit={handleSubmit} className="flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  className="bg-transparent outline-none text-white w-full"
                  disabled={isTyping}
                />
              </form>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="ml-1 text-white"
              >
                ▋
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
