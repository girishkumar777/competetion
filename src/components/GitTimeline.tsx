
import { motion } from "framer-motion";
import { GitCommit, GitBranch, Clock } from "lucide-react";

const commits = [
  {
    hash: "a3f2c1d",
    message: "feat: added premium portfolio design ✨",
    time: "2024-01-15",
    branch: "main"
  },
  {
    hash: "b8e9d4f",
    message: "refactor: optimized component architecture 🏗️",
    time: "2024-01-14",
    branch: "develop"
  },
  {
    hash: "c7f3a2e",
    message: "fix: improved mobile responsiveness 📱",
    time: "2024-01-13",
    branch: "feature/mobile"
  },
  {
    hash: "d2a8b5c",
    message: "docs: updated project documentation 📚",
    time: "2024-01-12",
    branch: "main"
  }
];

export const GitTimeline = () => {
  return (
    <section className="py-20 px-6 lg:px-20 bg-gray-900/50 console-trigger">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Development Timeline
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-mono">
          git log --oneline --graph --all
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Git branch line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 to-blue-500"></div>
          
          {commits.map((commit, index) => (
            <div key={commit.hash} className={`commit-item flex items-center gap-6 mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="relative">
                <div className="w-16 h-16 bg-gray-800 border-2 border-green-400 rounded-full flex items-center justify-center">
                  <GitCommit className="w-6 h-6 text-green-400" />
                </div>
              </div>
              
              <div className={`flex-1 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 ${index % 2 === 0 ? 'ml-8' : 'mr-8'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-green-400 font-mono text-sm">{commit.hash}</span>
                  <GitBranch className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">{commit.branch}</span>
                </div>
                
                <p className="text-white font-medium mb-2">{commit.message}</p>
                
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{commit.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
