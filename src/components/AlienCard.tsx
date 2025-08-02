import { motion } from 'framer-motion';

interface AlienCardProps {
  alien: {
    name: string;
    category: string;
    description: string;
    videoSrc: string;
    icon: string;
  };
  index: number;
  onTransform: () => void;
  isSelected: boolean;
}

const AlienCard = ({ alien, index, onTransform, isSelected }: AlienCardProps) => {
  return (
    <motion.div
      className={`relative cursor-pointer p-6 rounded-2xl border transition-all duration-500 group ${
        isSelected
          ? 'bg-primary/20 border-primary/60 shadow-xl shadow-primary/30'
          : 'bg-black/40 border-white/20 hover:border-primary/50 hover:bg-primary/10'
      }`}
      onClick={onTransform}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: '0 0 30px rgba(0, 255, 65, 0.3)',
        borderColor: 'rgba(0, 255, 65, 0.8)'
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: '0 0 40px rgba(0, 255, 65, 0.2)'
        }}
      />

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          style={{
            boxShadow: '0 0 15px rgba(0, 255, 65, 0.8)'
          }}
        >
          <div className="w-full h-full flex items-center justify-center text-black text-xs">
            ✓
          </div>
        </motion.div>
      )}

      {/* Card content */}
      <div className="relative z-10">
        {/* Alien icon/image */}
        <motion.div
          className="text-6xl mb-4 text-center"
          whileHover={{ scale: 1.1, rotateY: 360 }}
          transition={{ duration: 0.6 }}
        >
          {alien.icon}
        </motion.div>

        {/* Alien name */}
        <motion.h3
          className={`text-2xl font-bold text-center mb-2 transition-all duration-300 ${
            isSelected ? 'text-primary' : 'text-white group-hover:text-primary'
          }`}
          style={{
            fontFamily: "'Orbitron', monospace",
            textShadow: isSelected ? '0 0 10px rgba(0, 255, 65, 0.5)' : 'none'
          }}
        >
          {alien.name}
        </motion.h3>

        {/* Category */}
        <p className="text-sm text-muted-foreground text-center mb-3 font-mono">
          {alien.category}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-300 text-center leading-relaxed">
          {alien.description}
        </p>

        {/* Transform indicator */}
        <motion.div
          className="mt-4 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-xs text-primary font-mono">
            CLICK TO TRANSFORM
          </span>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        </motion.div>
      </div>

      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/50 transition-all duration-300"
        style={{
          boxShadow: '0 0 0 rgba(0, 255, 65, 0)'
        }}
        whileHover={{
          boxShadow: '0 0 20px rgba(0, 255, 65, 0.4)'
        }}
      />
    </motion.div>
  );
};

export default AlienCard;
