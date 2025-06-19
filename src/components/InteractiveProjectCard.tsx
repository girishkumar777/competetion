
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  gradient: string;
  liveUrl?: string;
  githubUrl?: string;
  codeSnippet?: string;
  stats?: {
    stars: number;
    forks: number;
    commits: number;
  };
}

interface InteractiveProjectCardProps {
  project: Project;
  index: number;
}

export const InteractiveProjectCard = ({ project, index }: InteractiveProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    setIsHovered(false);
  };

  const copyCodeSnippet = async () => {
    if (project.codeSnippet) {
      await navigator.clipboard.writeText(project.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="project-card relative group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
    >
      <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
        <div className="relative">
          {/* Project Image with Overlay */}
          <div className="relative overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
            
            {/* Live Preview Iframe on Hover */}
            {isHovered && project.liveUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-4 bg-white rounded-lg overflow-hidden shadow-2xl"
              >
                <iframe
                  src={project.liveUrl}
                  className="w-full h-full border-0"
                  title={`${project.title} preview`}
                />
              </motion.div>
            )}
            
            {/* Tech Stack Overlay */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              className="absolute bottom-4 left-4 right-4"
            >
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 bg-gradient-to-r ${project.gradient} bg-opacity-90 text-white rounded-full text-xs font-medium backdrop-blur-sm`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            
            {/* GitHub Stats */}
            {project.stats && (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                    <Github className="w-4 h-4" />
                    <span>{project.stats.stars}</span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-64 bg-gray-800 border-gray-700">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Stars:</span>
                      <span className="text-white">{project.stats.stars}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Forks:</span>
                      <span className="text-white">{project.stats.forks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Commits:</span>
                      <span className="text-white">{project.stats.commits}</span>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Code Snippet Preview */}
          {project.codeSnippet && (
            <div className="mb-6 bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 font-mono">Code Preview</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyCodeSnippet}
                  className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
              <pre className="text-xs text-gray-300 font-mono overflow-x-auto">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>
          )}

          <div className="flex gap-3">
            {project.liveUrl && (
              <Button className="bg-white text-gray-900 hover:bg-gray-100 flex-1">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 flex-1">
                <Github className="w-4 h-4 mr-2" />
                View Code
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
