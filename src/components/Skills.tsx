
import { motion } from "framer-motion";
import { Code, Paintbrush, Server } from "lucide-react";

const skillCategories = [
  {
    icon: Code,
    title: "Frontend Development",
    skills: ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS", "GSAP"],
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: Server,
    title: "Backend Development", 
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL", "Docker"],
    color: "from-purple-500 to-pink-400"
  },
  {
    icon: Paintbrush,
    title: "UI/UX Design",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Wireframing", "Design Systems"],
    color: "from-green-500 to-teal-400"
  }
];

export const Skills = () => {
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
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Skills & Expertise
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Crafting exceptional digital experiences with a full-stack mindset
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-gray-600 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-6`}>
              <category.icon className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="text-xl font-semibold mb-6 text-white">
              {category.title}
            </h3>
            
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm font-medium">{skill}</span>
                    <span className="text-gray-400 text-xs font-mono">
                      {85 + Math.floor(Math.random() * 15)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2">
                    <div 
                      className={`skill-bar h-2 rounded-full bg-gradient-to-r ${category.color}`}
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
