import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AlienDetailsPageProps {
  alien: {
    name: string;
    category: string;
    description: string;
    videoSrc: string;
    icon: string;
  };
  onBack: () => void;
  onTransform: () => void;
}

const AlienDetailsPage = ({ alien, onBack, onTransform }: AlienDetailsPageProps) => {
  const [showMaterializationEffect, setShowMaterializationEffect] = useState(true);
  const [showTransformBackEffect, setShowTransformBackEffect] = useState(false);

  useEffect(() => {
    // Hide materialization effect after animation completes
    const timer = setTimeout(() => setShowMaterializationEffect(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleTransformBack = () => {
    // Play transform back sound immediately
    const transformBackSound = new Audio('/sounds/transform-back.mp3');
    transformBackSound.volume = 0.7;
    transformBackSound.play().catch(console.error);

    // Show transformation effect
    setShowTransformBackEffect(true);

    // Navigate back after transformation effect
    setTimeout(() => {
      onTransform();
    }, 1500); // Match the transformation effect duration
  };

  const handleLearnMore = () => {
    // Define the wiki URLs for each alien
    const wikiUrls: { [key: string]: string } = {
      'ghostfreak': 'https://ben10.fandom.com/wiki/Ghostfreak',
      'diamondhead': 'https://ben10.fandom.com/wiki/Diamondhead_(Classic)',
      'heatblast': 'https://ben10.fandom.com/wiki/Heatblast_(Classic)',
      'fourarms': 'https://ben10.fandom.com/wiki/Four_Arms_(Classic)',
      'humungousaur': 'https://ben10.fandom.com/wiki/Humungousaur_(Classic)'
    };

    // Get the alien name in lowercase for matching
    const alienNameKey = alien.name.toLowerCase();
    
    // Get the corresponding URL
    const wikiUrl = wikiUrls[alienNameKey];
    
    if (wikiUrl) {
      // Open the wiki page in a new tab
      window.open(wikiUrl, '_blank');
    } else {
      console.warn(`No wiki URL found for alien: ${alien.name}`);
    }
  };

  // Generate random stats for demo purposes
  const stats = {
    powerLevel: Math.floor(Math.random() * 40) + 60, // 60-100
    speed: Math.floor(Math.random() * 30) + 70, // 70-100
    strength: Math.floor(Math.random() * 40) + 60, // 60-100
    intelligence: Math.floor(Math.random() * 50) + 50, // 50-100
  };

  const abilities = [
    { name: 'Primary Power', icon: '⚡', description: alien.description },
    { name: 'Enhanced Durability', icon: '🛡️', description: 'Resistant to physical damage' },
    { name: 'Combat Skills', icon: '⚔️', description: 'Advanced fighting capabilities' },
    { name: 'Energy Projection', icon: '💥', description: 'Can project energy attacks' },
  ];

  return (
    <motion.div
      className="min-h-screen bg-black relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,255,65,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(0,255,65,0.08)_0%,transparent_50%)]" />
        
        {/* Energy Grid Lines */}
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: 'linear' 
          }}
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px),
              linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 6px rgba(0, 255, 65, 0.8)'
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Materialization Effect (carries over from transformation) */}
      {showMaterializationEffect && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          {/* Green pulse ripple effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 8, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div
              className="w-32 h-32 rounded-full border-2 border-primary"
              style={{
                boxShadow: `
                  0 0 20px #00ff41,
                  0 0 40px #00ff41,
                  0 0 60px #00ff41
                `
              }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Transform Back Effect */}
      <AnimatePresence>
        {showTransformBackEffect && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            {/* Background Flash */}
            <motion.div
              className="absolute inset-0 bg-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Central Energy Burst */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ 
                scale: [0, 2, 6],
                opacity: [1, 0.8, 0]
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div
                className="w-64 h-64 rounded-full bg-gradient-radial from-primary via-primary/60 to-transparent"
                style={{
                  boxShadow: `
                    0 0 100px #00ff41,
                    0 0 200px #00ff41,
                    0 0 300px #00ff41
                  `
                }}
              />
            </motion.div>

            {/* Energy Rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 1, rotate: 0 }}
                animate={{ 
                  scale: [0, 4 + i],
                  opacity: [1, 0],
                  rotate: [0, 180]
                }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeOut",
                  delay: i * 0.1
                }}
              >
                <div
                  className="w-32 h-32 rounded-full border-4 border-primary"
                  style={{
                    boxShadow: `0 0 40px #00ff41, 0 0 80px #00ff41`
                  }}
                />
              </motion.div>
            ))}

            {/* Energy Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-primary rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  boxShadow: '0 0 10px rgba(0, 255, 65, 0.8)'
                }}
                initial={{ 
                  scale: 0,
                  x: 0,
                  y: 0
                }}
                animate={{
                  scale: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 800],
                  y: [0, (Math.random() - 0.5) * 600],
                  opacity: [1, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: Math.random() * 0.5
                }}
              />
            ))}

            {/* Radial Burst Lines */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 origin-left"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                }}
                initial={{ scaleX: 0, opacity: 1 }}
                animate={{ 
                  scaleX: [0, 3, 0],
                  opacity: [1, 0.8, 0]
                }}
                transition={{ 
                  duration: 1.2, 
                  ease: "easeOut",
                  delay: 0.2 + (i * 0.05)
                }}
              >
                <div 
                  className="w-96 h-1 bg-gradient-to-r from-primary to-transparent"
                  style={{
                    boxShadow: '0 0 10px rgba(0, 255, 65, 0.8)'
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        className="relative z-10 p-6 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {/* Back Button with Omnitrix Icon */}
        <motion.button
          onClick={onBack}
          className="flex items-center space-x-3 bg-primary/20 rounded-full px-6 py-3 border border-primary/40 hover:bg-primary/30 transition-all duration-300"
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 65, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-black text-sm font-bold">⬅</span>
          </div>
          <span className="text-primary font-mono">OMNITRIX</span>
        </motion.button>

        {/* Status Indicator */}
        <motion.div
          className="flex items-center space-x-2 bg-black/50 rounded-full px-4 py-2 border border-primary/30"
          animate={{ 
            boxShadow: [
              '0 0 10px rgba(0, 255, 65, 0.3)',
              '0 0 20px rgba(0, 255, 65, 0.5)',
              '0 0 10px rgba(0, 255, 65, 0.3)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
          <span className="text-primary font-mono text-sm">ACTIVE</span>
        </motion.div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Alien Name Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h1 
            className="text-6xl md:text-8xl font-black text-primary mb-4"
            style={{
              fontFamily: "'Orbitron', monospace",
              textShadow: '0 0 30px rgba(0, 255, 65, 0.8), 0 0 60px rgba(0, 255, 65, 0.4)',
              letterSpacing: '0.1em'
            }}
          >
            {alien.name.toUpperCase()}
          </h1>
          <p className="text-xl text-muted-foreground font-mono">{alien.category}</p>
        </motion.div>

        {/* Hero Section - 3D Hologram */}
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {/* Holographic Video Player */}
          <div className="relative">
            {/* Holographic Base */}
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-80 h-4 bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-full"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0, 255, 65, 0.5)',
                  '0 0 40px rgba(0, 255, 65, 0.8)',
                  '0 0 20px rgba(0, 255, 65, 0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Video Container */}
            <motion.div
              className="relative aspect-square max-w-md mx-auto"
              animate={{ 
                y: [0, -15, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {/* Outer Energy Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }}
                style={{
                  filter: 'blur(1px)',
                  boxShadow: '0 0 20px rgba(0, 255, 65, 0.4)'
                }}
              />

              {/* Middle Energy Ring */}
              <motion.div
                className="absolute inset-2 rounded-full border border-primary/50"
                animate={{
                  rotate: [360, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
                  opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                }}
                style={{
                  boxShadow: '0 0 15px rgba(0, 255, 65, 0.5)'
                }}
              />

              {/* Inner Video Frame */}
              <motion.div 
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/80 z-10"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(0, 255, 65, 0.6), 0 0 60px rgba(0, 255, 65, 0.3), inset 0 0 30px rgba(0, 255, 65, 0.2)',
                    '0 0 50px rgba(0, 255, 65, 0.8), 0 0 80px rgba(0, 255, 65, 0.5), inset 0 0 50px rgba(0, 255, 65, 0.3)',
                    '0 0 30px rgba(0, 255, 65, 0.6), 0 0 60px rgba(0, 255, 65, 0.3), inset 0 0 30px rgba(0, 255, 65, 0.2)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={alien.videoSrc} type="video/mp4" />
                  {/* Fallback */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black to-primary/20">
                    <span className="text-8xl">{alien.icon}</span>
                  </div>
                </video>
              </motion.div>

              {/* Energy Particles around video */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: `${120 + Math.random() * 40}px center`
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [0.5, 1, 0.5],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    rotate: { duration: 8 + Math.random() * 4, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 2 + Math.random(), repeat: Infinity, ease: 'easeInOut' },
                    opacity: { duration: 2 + Math.random(), repeat: Infinity, ease: 'easeInOut' },
                    delay: i * 0.3
                  }}
                />
              ))}

              {/* Holographic Scan Lines */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-full overflow-hidden z-20"
                animate={{ y: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80 blur-sm" />
              </motion.div>

              {/* Additional scanning effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-full overflow-hidden z-20"
                animate={{ 
                  background: [
                    'radial-gradient(circle at 50% 20%, rgba(0,255,65,0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 50% 80%, rgba(0,255,65,0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 50% 20%, rgba(0,255,65,0.1) 0%, transparent 50%)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>

          {/* Stats and Info Panel */}
          <div className="space-y-8">
            {/* Power Level Bars */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary mb-4 font-orbitron">POWER METRICS</h3>
              
              {Object.entries(stats).map(([stat, value], index) => (
                <div key={stat}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-mono capitalize">{stat.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-primary font-mono">{value}%</span>
                  </div>
                  <div className="h-3 bg-black/50 rounded-full border border-primary/30 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ delay: 1.2 + index * 0.2, duration: 1, ease: 'easeOut' }}
                      style={{
                        boxShadow: '0 0 10px rgba(0, 255, 65, 0.6)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Abilities */}
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4 font-orbitron">ABILITIES</h3>
              <div className="grid grid-cols-2 gap-4">
                {abilities.map((ability, index) => (
                  <motion.div
                    key={ability.name}
                    className="bg-black/50 border border-primary/30 rounded-lg p-4 hover:border-primary/50 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 15px rgba(0, 255, 65, 0.3)'
                    }}
                  >
                    <div className="text-2xl mb-2">{ability.icon}</div>
                    <h4 className="text-primary font-bold text-sm mb-1">{ability.name}</h4>
                    <p className="text-muted-foreground text-xs">{ability.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex justify-center space-x-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <motion.button
            onClick={handleTransformBack}
            className="px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(0, 255, 65, 0.6)'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontFamily: "'Orbitron', monospace"
            }}
          >
            TRANSFORM BACK
          </motion.button>

          <motion.button
            onClick={handleLearnMore}
            className="px-8 py-4 bg-black/50 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 20px rgba(0, 255, 65, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontFamily: "'Orbitron', monospace"
            }}
          >
            LEARN MORE
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AlienDetailsPage;
