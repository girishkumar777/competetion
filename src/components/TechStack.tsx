
import { motion } from "framer-motion";

const technologies = [
  {
    category: "Frontend",
    tools: [
      { name: "React", logo: "⚛️" },
      { name: "TypeScript", logo: "🔷" },
      { name: "Next.js", logo: "▲" },
      { name: "Tailwind", logo: "🎨" },
      { name: "GSAP", logo: "🎭" }
    ]
  },
  {
    category: "Backend",
    tools: [
      { name: "Node.js", logo: "🟢" },
      { name: "Python", logo: "🐍" },
      { name: "PostgreSQL", logo: "🐘" },
      { name: "MongoDB", logo: "🍃" },
      { name: "GraphQL", logo: "📊" }
    ]
  },
  {
    category: "Tools & Design",
    tools: [
      { name: "Docker", logo: "🐳" },
      { name: "AWS", logo: "☁️" },
      { name: "Figma", logo: "🎨" },
      { name: "Git", logo: "🔗" },
      { name: "VS Code", logo: "💻" }
    ]
  }
];

export const TechStack = () => {
  return (
    <section className="py-20 px-6 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Tech Stack & Tools
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Technologies I use to bring ideas to life
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {technologies.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8"
          >
            <h3 className="text-xl font-semibold mb-6 text-center text-white">
              {category.category}
            </h3>
            
            <div className="space-y-4">
              {category.tools.map((tool, toolIndex) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: (categoryIndex * 0.2) + (toolIndex * 0.1) }}
                  viewport={{ once: true }}
                  className="tech-icon flex items-center gap-4 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors duration-200"
                >
                  <span className="text-2xl">{tool.logo}</span>
                  <span className="text-gray-300 font-medium">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
