
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Zap, Timer, Cpu } from "lucide-react";

export const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState({
    fps: 60,
    loadTime: 2.4,
    memoryUsage: 45,
    codeLines: 2847
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        fps: Math.max(50, Math.min(60, prev.fps + (Math.random() - 0.5) * 5)),
        loadTime: Math.max(1.0, Math.min(5.0, prev.loadTime + (Math.random() - 0.5) * 0.5)),
        memoryUsage: Math.max(20, Math.min(80, prev.memoryUsage + (Math.random() - 0.5) * 10)),
        codeLines: prev.codeLines + Math.floor(Math.random() * 3)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const metricItems = [
    { icon: Activity, label: 'FPS', value: Math.round(metrics.fps), suffix: '' },
    { icon: Timer, label: 'Load Time', value: metrics.loadTime.toFixed(1), suffix: 's' },
    { icon: Cpu, label: 'Memory', value: Math.round(metrics.memoryUsage), suffix: '%' },
    { icon: Zap, label: 'Lines of Code', value: metrics.codeLines, suffix: '' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metricItems.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center"
        >
          <metric.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">
            {metric.value}{metric.suffix}
          </div>
          <div className="text-sm text-gray-400">{metric.label}</div>
        </motion.div>
      ))}
    </div>
  );
};
