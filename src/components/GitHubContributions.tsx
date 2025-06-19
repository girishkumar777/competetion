
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const GitHubContributions = () => {
  const [contributions, setContributions] = useState<number[][]>([]);

  useEffect(() => {
    // Generate mock contribution data
    const weeks = 52;
    const days = 7;
    const mockData = [];
    
    for (let week = 0; week < weeks; week++) {
      const weekData = [];
      for (let day = 0; day < days; day++) {
        weekData.push(Math.floor(Math.random() * 5));
      }
      mockData.push(weekData);
    }
    
    setContributions(mockData);
  }, []);

  const getIntensityColor = (level: number) => {
    const colors = [
      'bg-gray-800',
      'bg-green-900',
      'bg-green-700',
      'bg-green-500',
      'bg-green-300'
    ];
    return colors[level] || colors[0];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6"
    >
      <h3 className="text-xl font-bold text-white mb-4">GitHub Contributions</h3>
      <div className="grid grid-cols-52 gap-1 mb-4">
        {contributions.map((week, weekIndex) =>
          week.map((day, dayIndex) => (
            <motion.div
              key={`${weekIndex}-${dayIndex}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: (weekIndex * 7 + dayIndex) * 0.001,
                duration: 0.3 
              }}
              className={`w-3 h-3 rounded-sm ${getIntensityColor(day)}`}
              title={`${day} contributions`}
            />
          ))
        )}
      </div>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map(level => (
            <div key={level} className={`w-3 h-3 rounded-sm ${getIntensityColor(level)}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </motion.div>
  );
};
