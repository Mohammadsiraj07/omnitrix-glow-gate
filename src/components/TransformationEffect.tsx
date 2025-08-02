import { motion, AnimatePresence } from 'framer-motion';

interface TransformationEffectProps {
  isTransforming: boolean;
}

const TransformationEffect = ({ isTransforming }: TransformationEffectProps) => {
  return (
    <AnimatePresence>
      {isTransforming && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {/* Full-screen neon green overlay */}
          <motion.div
            className="absolute inset-0 bg-primary/30 backdrop-blur-2xl"
            style={{
              boxShadow: `
                0 0 50px 20px #00ff41 inset,
                0 0 100px 50px #00ff41
              `
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, times: [0, 0.1, 0.7, 1] }}
          />

          {/* Radial energy pulse */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 2, 8], opacity: [1, 0.8, 0] }}
            transition={{ duration: 0.8, ease: "easeOut", times: [0, 0.3, 1] }}
          >
            <div
              className="w-32 h-32 rounded-full border-4 border-primary"
              style={{
                boxShadow: `
                  0 0 20px #00ff41,
                  0 0 40px #00ff41,
                  0 0 60px #00ff41,
                  inset 0 0 20px #00ff41
                `
              }}
            />
          </motion.div>

          {/* Secondary energy rings */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: [0, 1.5, 6], opacity: [0.8, 0.6, 0] }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1, times: [0, 0.4, 1] }}
          >
            <div
              className="w-24 h-24 rounded-full border-2 border-primary/60"
              style={{
                boxShadow: `
                  0 0 15px #00ff41,
                  0 0 30px #00ff41
                `
              }}
            />
          </motion.div>

          {/* Third energy ring */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: [0, 1, 10], opacity: [0.6, 0.4, 0] }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2, times: [0, 0.2, 1] }}
          >
            <div
              className="w-16 h-16 rounded-full border border-primary/40"
              style={{
                boxShadow: `
                  0 0 10px #00ff41,
                  0 0 20px #00ff41
                `
              }}
            />
          </motion.div>

          {/* Central energy burst */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 3, 1.5], opacity: [1, 1, 0] }}
            transition={{ duration: 0.6, ease: "easeOut", times: [0, 0.1, 1] }}
          >
            <div
              className="w-8 h-8 rounded-full bg-primary"
              style={{
                boxShadow: `
                  0 0 30px #00ff41,
                  0 0 60px #00ff41,
                  0 0 90px #00ff41
                `
              }}
            />
          </motion.div>

          {/* Particle effects */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full"
              style={{
                boxShadow: '0 0 10px #00ff41'
              }}
              initial={{
                scale: 0,
                x: 0,
                y: 0,
                opacity: 1
              }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i * 30) * Math.PI / 180) * 200,
                y: Math.sin((i * 30) * Math.PI / 180) * 200,
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: i * 0.05
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransformationEffect;
