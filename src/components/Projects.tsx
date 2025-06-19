
import { motion } from "framer-motion";
import { InteractiveProjectCard } from "./InteractiveProjectCard";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include real-time inventory, user authentication, and admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    gradient: "from-blue-500 to-purple-600",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/ecommerce",
    codeSnippet: `const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    setLoading(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: '/success'
      }
    });
    setLoading(false);
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
};`,
    stats: { stars: 247, forks: 89, commits: 342 }
  },
  {
    title: "AI Chat Application",
    description: "Real-time chat application with AI integration using OpenAI API. Built with React, Socket.io, and modern UI components.",
    tech: ["React", "Socket.io", "OpenAI", "TypeScript"],
    image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&h=600&fit=crop",
    gradient: "from-green-500 to-teal-600",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/ai-chat",
    codeSnippet: `const useChat = () => {
  const [messages, setMessages] = useState([]);
  
  const sendMessage = async (text) => {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }]
    });
    
    return response.choices[0].message.content;
  };
  
  return { messages, sendMessage };
};`,
    stats: { stars: 156, forks: 43, commits: 198 }
  },
  {
    title: "Task Management System",
    description: "Collaborative task management platform with drag-and-drop functionality, team collaboration, and progress tracking.",
    tech: ["Vue.js", "Firebase", "Tailwind", "Vuex"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    gradient: "from-purple-500 to-pink-600",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/task-manager",
    codeSnippet: `const useDragDrop = () => {
  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
  };
  
  const handleDrop = (e, columnId) => {
    const task = JSON.parse(e.dataTransfer.getData('task'));
    updateTaskColumn(task.id, columnId);
  };
  
  return { handleDragStart, handleDrop };
};`,
    stats: { stars: 89, forks: 23, commits: 156 }
  }
];

export const Projects = () => {
  return (
    <section className="py-20 px-6 lg:px-20 bg-gray-800/20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Interactive Projects
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Hover to see live previews, tech stacks, and code snippets
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <InteractiveProjectCard
            key={project.title}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};
