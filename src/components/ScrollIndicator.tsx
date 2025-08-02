import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ScrollIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="flex flex-col items-center cursor-pointer group"
        onClick={() => {
          window.scrollTo({ 
            top: window.innerHeight, 
            behavior: 'smooth' 
          });
        }}
      >
        <div className="text-primary text-sm font-mono mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
          SCROLL
        </div>
        <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center box-glow-subtle group-hover:box-glow transition-all duration-300">
          <ChevronDown className="w-4 h-4 text-primary animate-bounce-down" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;