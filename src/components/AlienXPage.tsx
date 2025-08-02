import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface AlienXPageProps {
  onBack: () => void;
}

const AlienXPage = ({ onBack }: AlienXPageProps) => {
  const [showAccessingText, setShowAccessingText] = useState(true);
  const [showWhiteFlash, setShowWhiteFlash] = useState(true);
  const [showTransformEffect, setShowTransformEffect] = useState(false);
  const [accessingText, setAccessingText] = useState('');
  const fullAccessingText = 'ACCESSING CELESTIALSAPIEN FILES...';
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload transformation sound
    try {
      audioRef.current = new Audio('/sounds/transform.mp3');
      audioRef.current.volume = 0.8;
      audioRef.current.preload = 'auto';
      audioRef.current.load();
    } catch (error) {
      console.log('Audio preload failed:', error);
    }
  }, []);

  useEffect(() => {
    // Hide white flash after brief moment
    const flashTimer = setTimeout(() => setShowWhiteFlash(false), 300);

    // Start typing effect after flash
    const typingTimer = setTimeout(() => {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index <= fullAccessingText.length) {
          setAccessingText(fullAccessingText.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
          // Hide accessing text and show main content with transformation effect
          setTimeout(() => {
            setShowAccessingText(false);
            // Trigger transformation effect when main content appears
            setTimeout(() => {
              setShowTransformEffect(true);
              // Play transformation sound
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(console.error);
              }
              // Hide transformation effect after animation
              setTimeout(() => setShowTransformEffect(false), 1500);
            }, 500);
          }, 1000);
        }
      }, 80);

      return () => clearInterval(typeInterval);
    }, 500);

    return () => {
      clearTimeout(flashTimer);
      clearTimeout(typingTimer);
    };
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-black relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* White Flash Effect */}
      <AnimatePresence>
        {showWhiteFlash && (
          <motion.div
            className="fixed inset-0 z-50 bg-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Transformation Effect */}
      <AnimatePresence>
        {showTransformEffect && (
          <motion.div
            className="fixed inset-0 z-40 pointer-events-none"
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
                scale: [0, 3, 8],
                opacity: [1, 0.8, 0]
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div
                className="w-64 h-64 rounded-full bg-gradient-radial from-white via-primary/80 to-transparent"
                style={{
                  boxShadow: `
                    0 0 150px #ffffff,
                    0 0 300px #00ff41,
                    0 0 450px #ffffff
                  `
                }}
              />
            </motion.div>

            {/* Energy Rings */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 1, rotate: 0 }}
                animate={{ 
                  scale: [0, 5 + i * 1.5],
                  opacity: [1, 0],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeOut",
                  delay: i * 0.1
                }}
              >
                <div
                  className="w-32 h-32 rounded-full border-4"
                  style={{
                    borderColor: i % 2 === 0 ? '#00ff41' : '#ffffff',
                    boxShadow: `0 0 60px ${i % 2 === 0 ? '#00ff41' : '#ffffff'}`
                  }}
                />
              </motion.div>
            ))}

            {/* Cosmic Energy Particles */}
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  backgroundColor: i % 2 === 0 ? '#00ff41' : '#ffffff',
                  boxShadow: `0 0 15px ${i % 2 === 0 ? 'rgba(0, 255, 65, 0.8)' : 'rgba(255, 255, 255, 0.8)'}`
                }}
                initial={{ 
                  scale: 0,
                  x: 0,
                  y: 0
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  x: [0, (Math.random() - 0.5) * 1000],
                  y: [0, (Math.random() - 0.5) * 700],
                  opacity: [1, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: Math.random() * 0.5
                }}
              />
            ))}

            {/* Cosmic Burst Lines */}
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 origin-left"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)`,
                }}
                initial={{ scaleX: 0, opacity: 1 }}
                animate={{ 
                  scaleX: [0, 4, 0],
                  opacity: [1, 0.8, 0]
                }}
                transition={{ 
                  duration: 1.2, 
                  ease: "easeOut",
                  delay: 0.3 + (i * 0.03)
                }}
              >
                <div 
                  className="w-96 h-2 bg-gradient-to-r from-white via-primary to-transparent"
                  style={{
                    boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)'
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cosmic Background - Optimized */}
      <div className="fixed inset-0">
        {/* Star field - Reduced from 100 to 50 stars */}
        <div className="absolute inset-0 bg-black">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        {/* Nebula effects - Simplified */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-radial from-white/15 via-white/3 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Animated cosmic particles - Reduced from 30 to 15 */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 4px rgba(0, 255, 65, 0.6)'
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Accessing Files Screen */}
      <AnimatePresence>
        {showAccessingText && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <motion.div
                className="text-4xl md:text-6xl font-mono text-primary mb-8"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(0, 255, 65, 0.8)',
                    '0 0 40px rgba(0, 255, 65, 1)',
                    '0 0 20px rgba(0, 255, 65, 0.8)'
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {accessingText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  |
                </motion.span>
              </motion.div>

              {/* Loading bars */}
              <div className="space-y-4 max-w-md mx-auto">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-2 bg-black/50 rounded-full border border-primary/30 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ 
                        delay: i * 0.5 + 1, 
                        duration: 1.5, 
                        ease: 'easeOut' 
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Alien-X Content */}
      <AnimatePresence>
        {!showAccessingText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Header */}
            <motion.header
              className="relative z-10 p-6 flex items-center justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {/* Back Button */}
              <motion.button
                onClick={onBack}
                className="flex items-center space-x-3 bg-primary/20 rounded-full px-6 py-3 border border-primary/40 hover:bg-primary/30 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 65, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-black text-sm font-bold">⬅</span>
                </div>
                <span className="text-primary font-mono">BACK TO OMNITRIX</span>
              </motion.button>

              {/* Classification Status */}
              <motion.div
                className="flex items-center space-x-2 bg-red-500/20 rounded-full px-4 py-2 border border-red-500/50"
                animate={{ 
                  boxShadow: [
                    '0 0 10px rgba(239, 68, 68, 0.3)',
                    '0 0 20px rgba(239, 68, 68, 0.6)',
                    '0 0 10px rgba(239, 68, 68, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 font-mono text-sm">CLASSIFIED</span>
              </motion.div>
            </motion.header>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
              {/* Title */}
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <motion.h1 
                  className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary mb-6"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    letterSpacing: '0.1em',
                    filter: 'drop-shadow(0 0 20px rgba(0, 255, 65, 0.6))'
                  }}
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(0, 255, 65, 0.6)',
                      '0 0 40px rgba(0, 255, 65, 0.8)',
                      '0 0 20px rgba(0, 255, 65, 0.6)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  ALIEN-X
                </motion.h1>
                <motion.p 
                  className="text-2xl text-white/80 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                >
                  Celestialsapien - The Omnipotent Being
                </motion.p>
              </motion.div>

              {/* Main Grid */}
              <motion.div
                className="grid lg:grid-cols-2 gap-16 items-center mb-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                {/* 3D Hologram */}
                <div className="relative">
                  {/* Holographic Base */}
                  <motion.div
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-96 h-6 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
                    animate={{
                      boxShadow: [
                        '0 0 30px rgba(255, 255, 255, 0.5)',
                        '0 0 60px rgba(0, 255, 65, 0.8)',
                        '0 0 30px rgba(255, 255, 255, 0.5)'
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  {/* Cosmic Aura Container - Simplified */}
                  <motion.div
                    className="relative aspect-square max-w-lg mx-auto"
                    animate={{ 
                      y: [0, -10, 0]
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    {/* Single Cosmic Energy Ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border border-primary/40"
                      animate={{
                        rotate: [0, 360],
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                        opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                      }}
                      style={{
                        boxShadow: '0 0 20px rgba(0, 255, 65, 0.6)'
                      }}
                    />

                    {/* Central Video/Image Frame - Simplified */}
                    <motion.div 
                      className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary z-10 bg-gradient-to-br from-black via-primary/5 to-black"
                      animate={{
                        boxShadow: [
                          '0 0 30px rgba(0, 255, 65, 0.4)',
                          '0 0 50px rgba(0, 255, 65, 0.6)',
                          '0 0 30px rgba(0, 255, 65, 0.4)'
                        ]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      {/* Alien-X Image */}
                      <motion.div 
                        className="w-full h-full relative overflow-hidden rounded-full"
                      >
                        <img
                          src="/special_alien/Ailen-x.png"
                          alt="Alien-X"
                          className="w-full h-full object-cover"
                          style={{
                            objectPosition: 'center 20%',
                            filter: 'drop-shadow(0 0 20px rgba(0, 255, 65, 0.5))'
                          }}
                        />
                        
                        {/* Cosmic overlay effects */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-white/5"
                          animate={{
                            opacity: [0.2, 0.4, 0.2]
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                        />

                        {/* Simple scanning line effect */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none rounded-full overflow-hidden"
                          animate={{ y: ['-100%', '100%'] }}
                          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                        >
                          <div className="w-full h-2 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* Floating cosmic particles - Reduced from 12 to 6 */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        style={{
                          left: '50%',
                          top: '50%',
                          transformOrigin: `${150 + Math.random() * 40}px center`,
                          boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)'
                        }}
                        animate={{
                          rotate: [0, 360],
                          scale: [0.5, 1, 0.5],
                          opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                          rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
                          scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                          opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                          delay: i * 0.8
                        }}
                      />
                    ))}
                  </motion.div>
                </div>

                {/* Classified File Information */}
                <div className="space-y-8">
                  <motion.div
                    className="bg-black/60 border-2 border-primary/40 rounded-2xl p-8 backdrop-blur-lg"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                  >
                    <h3 className="text-3xl font-bold text-primary mb-6 font-orbitron">CLASSIFIED OMNITRIX FILE</h3>
                    
                    {/* Powers Section */}
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-white mb-4 font-mono">POWERS:</h4>
                      <ul className="space-y-2 text-gray-300">
                        <motion.li 
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 2.2, duration: 0.5 }}
                        >
                          <span className="text-primary">▪</span>
                          <span>Omnipotence - Unlimited power over reality</span>
                        </motion.li>
                        <motion.li 
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 2.4, duration: 0.5 }}
                        >
                          <span className="text-primary">▪</span>
                          <span>Reality Manipulation - Alter the fabric of existence</span>
                        </motion.li>
                        <motion.li 
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 2.6, duration: 0.5 }}
                        >
                          <span className="text-primary">▪</span>
                          <span>Universal Creation/Destruction</span>
                        </motion.li>
                      </ul>
                    </div>

                    {/* Weakness Section */}
                    <div>
                      <h4 className="text-xl font-bold text-red-400 mb-4 font-mono">WEAKNESS:</h4>
                      <motion.p 
                        className="text-gray-300 bg-red-500/10 border border-red-500/30 rounded-lg p-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.8, duration: 0.5 }}
                      >
                        Internal conflict between Serena and Bellicus personalities can prevent action and decision-making, rendering immense power useless.
                      </motion.p>
                    </div>

                    {/* Warning Badge */}
                    <motion.div
                      className="mt-6 flex items-center justify-center bg-red-500/20 border border-red-500/50 rounded-full px-6 py-3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        boxShadow: [
                          '0 0 20px rgba(239, 68, 68, 0.4)',
                          '0 0 40px rgba(239, 68, 68, 0.8)',
                          '0 0 20px rgba(239, 68, 68, 0.4)'
                        ]
                      }}
                      transition={{ 
                        opacity: { delay: 3, duration: 0.5 },
                        scale: { delay: 3, duration: 0.5 },
                        boxShadow: { duration: 2, repeat: Infinity }
                      }}
                    >
                      <span className="text-red-400 font-mono font-bold">⚠ EXTREME CAUTION ADVISED ⚠</span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AlienXPage;
