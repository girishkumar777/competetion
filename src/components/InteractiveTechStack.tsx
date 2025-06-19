
import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TechItem {
  name: string;
  logo: string;
  level: number;
  category: string;
  color: string;
}

const technologies: TechItem[] = [
  { name: "React", logo: "⚛️", level: 95, category: "Frontend", color: "from-blue-500 to-cyan-400" },
  { name: "TypeScript", logo: "🔷", level: 90, category: "Frontend", color: "from-blue-600 to-blue-400" },
  { name: "Next.js", logo: "▲", level: 88, category: "Frontend", color: "from-gray-600 to-gray-400" },
  { name: "Node.js", logo: "🟢", level: 85, category: "Backend", color: "from-green-600 to-green-400" },
  { name: "Python", logo: "🐍", level: 80, category: "Backend", color: "from-yellow-600 to-yellow-400" },
  { name: "PostgreSQL", logo: "🐘", level: 75, category: "Backend", color: "from-blue-700 to-blue-500" },
  { name: "Docker", logo: "🐳", level: 70, category: "Tools", color: "from-blue-500 to-cyan-300" },
  { name: "AWS", logo: "☁️", level: 78, category: "Tools", color: "from-orange-500 to-yellow-400" },
  { name: "Figma", logo: "🎨", level: 85, category: "Design", color: "from-purple-500 to-pink-400" },
];

export const InteractiveTechStack = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const categories = ["All", ...Array.from(new Set(technologies.map(tech => tech.category)))];
  
  const filteredTech = selectedCategory === "All" 
    ? technologies 
    : technologies.filter(tech => tech.category === selectedCategory);

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
            Interactive Tech Stack
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Hover to see skill levels and filter by category
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white" 
                : "border-gray-600 text-gray-300 hover:bg-gray-800"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredTech.map((tech, index) => (
            <motion.div
              key={tech.name}
              layout
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="tech-item relative group"
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-500 transition-all duration-300 hover:scale-105">
                {/* Tech Logo */}
                <motion.div
                  animate={{ 
                    rotate: hoveredTech === tech.name ? 360 : 0,
                    scale: hoveredTech === tech.name ? 1.2 : 1
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl mb-4 text-center"
                >
                  {tech.logo}
                </motion.div>

                {/* Tech Name */}
                <h3 className="text-white font-semibold text-center mb-4">{tech.name}</h3>

                {/* Skill Level Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Skill Level</span>
                    <span className="text-xs text-gray-300 font-mono">{tech.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: hoveredTech === tech.name ? `${tech.level}%` : '0%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-2 rounded-full bg-gradient-to-r ${tech.color}`}
                    />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mt-4 text-center">
                  <Badge 
                    variant="outline" 
                    className={`border-gray-600 text-xs bg-gradient-to-r ${tech.color} bg-opacity-20`}
                  >
                    {tech.category}
                  </Badge>
                </div>

                {/* Animated Background */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredTech === tech.name ? 0.1 : 0 }}
                  className={`absolute inset-0 bg-gradient-to-r ${tech.color} rounded-xl -z-10 blur-xl`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
