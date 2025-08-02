// Omnitrix Hero Landing Page
import HeroSection from '@/components/HeroSection';
import TransformationEffect from '@/components/TransformationEffect';
import AlienCard from '@/components/AlienCard';
import AlienDetailsPage from '@/components/AlienDetailsPage';
import AlienXPage from '@/components/AlienXPage';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const Index = () => {
  const [selectedAlien, setSelectedAlien] = useState(0);
  const [isTransforming, setIsTransforming] = useState(false);
  const [showAlienDetails, setShowAlienDetails] = useState(false);
  const [showAlienX, setShowAlienX] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const alienSectionRef = useRef(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  // Scroll tracking for the alien section - MOVED UP
  const { scrollYProgress } = useScroll({
    target: alienSectionRef,
    offset: ["start center", "end center"]
  });

  // Alien data - MOVED UP before useEffects that use it
  const aliens = [
    {
      name: "Four Arms",
      category: "Strength Enhancement",
      description: "Superhuman strength and combat prowess",
      videoSrc: "/videos/fourarms.mp4", // Replace with actual video path
      icon: "💪"
    },
    {
      name: "Heatblast",
      category: "Pyrokinetic",
      description: "Fire generation and thermal manipulation",
      videoSrc: "/videos/heatblast.mp4", // Replace with actual video path
      icon: "🔥"
    },
    {
      name: "Humungousaur",
      category: "Size Manipulation",
      description: "Massive size and incredible strength",
      videoSrc: "/videos/humangasour.mp4",
      icon: "🦕"
    },
    {
      name: "Diamondhead",
      category: "Crystal Manipulation",
      description: "Diamond-hard body and crystal projectiles",
      videoSrc: "/videos/diamondhead.mp4", // Replace with actual video path
      icon: "💎"
    },
    {
      name: "Ghostfreak",
      category: "Spectral Abilities",
      description: "Intangibility and possession powers",
      videoSrc: "/videos/ghostfreak.mp4", // Replace with actual video path
      icon: "👻"
    }
  ];
  
  // Preload transformation sound for instant playback
  useEffect(() => {
    try {
      audioRef.current = new Audio('/sounds/transform.mp3');
      audioRef.current.volume = 0.7;
      audioRef.current.preload = 'auto';
      // Load the audio file
      audioRef.current.load();
    } catch (error) {
      console.log('Audio preload failed:', error);
    }
  }, []);

  // Scroll-based alien selection
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Map scroll progress to alien index
      const alienIndex = Math.min(Math.floor(latest * aliens.length), aliens.length - 1);
      
      // Only update if different from current selection to avoid unnecessary re-renders
      if (alienIndex !== selectedAlien && latest > 0.01) {
        setSelectedAlien(alienIndex);
        
        // Force video reload when alien changes
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play().catch(console.error);
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, selectedAlien, aliens.length]);
  
  // Transformation effect with sound
  const handleTransformation = (alienIndex: number) => {
    setSelectedAlien(alienIndex);
    
    // Start transformation effect immediately
    setIsTransforming(true);
    
    // Play transformation sound immediately using preloaded audio
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0; // Reset to beginning
        audioRef.current.play().catch(error => {
          console.log('Audio play failed:', error);
        });
      }
    } catch (error) {
      console.log('Audio not available:', error);
    }
    
    // After transformation effect completes, navigate to alien details
    setTimeout(() => {
      setIsTransforming(false);
      setShowAlienDetails(true);
    }, 800);
  };

  // Handle navigation back to alien selection
  const handleBackToSelection = () => {
    setShowAlienDetails(false);
  };

  // Handle transform back (same as back to selection but with effect)
  const handleTransformBack = () => {
    setShowAlienDetails(false);
  };

  // Handle special Alien-X page
  const handleAlienXAccess = () => {
    // Start flash effect
    setIsFlashing(true);
    
    // After flash, navigate to Alien-X page
    setTimeout(() => {
      setIsFlashing(false);
      setShowAlienX(true);
    }, 600);
  };

  // Handle back from Alien-X page
  const handleBackFromAlienX = () => {
    setShowAlienX(false);
  };

  // Automatic alien selection based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      // Adjust progress calculation to ensure proper alien selection
      // Start with first alien (index 0) and transition smoothly
      let alienIndex;
      
      if (progress <= 0.1) {
        // Stay on first alien until 10% scroll
        alienIndex = 0;
      } else if (progress >= 0.9) {
        // Stay on last alien after 90% scroll
        alienIndex = aliens.length - 1;
      } else {
        // Calculate index for middle section (10% to 90%)
        const adjustedProgress = (progress - 0.1) / 0.8; // Normalize to 0-1
        alienIndex = Math.floor(adjustedProgress * aliens.length);
      }
      
      const clampedIndex = Math.min(Math.max(alienIndex, 0), aliens.length - 1);
      
      if (clampedIndex !== selectedAlien) {
        setSelectedAlien(clampedIndex);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, selectedAlien, aliens.length]);

  // Handle video switching when selectedAlien changes
  useEffect(() => {
    if (videoRef.current) {
      // Force video reload when alien changes
      videoRef.current.load();
      // Ensure autoplay after load
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Video autoplay failed:', error);
        });
      }
    }
  }, [selectedAlien]);

  return (
    <main className="relative">
      <AnimatePresence mode="wait">
        {showAlienX ? (
          <AlienXPage
            key="alien-x"
            onBack={handleBackFromAlienX}
          />
        ) : showAlienDetails ? (
          <AlienDetailsPage
            key="alien-details"
            alien={aliens[selectedAlien]}
            onBack={handleBackToSelection}
            onTransform={handleTransformBack}
          />
        ) : (
          <motion.div
            key="alien-selection"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSection />
            
            {/* Transformation Effect Overlay */}
            <TransformationEffect isTransforming={isTransforming} />
            
            {/* Alien Showcase Section */}
      <section 
        ref={alienSectionRef}
        className="min-h-[200vh] bg-gradient-to-br from-background via-background/95 to-background flex items-center justify-center py-20 px-6 md:px-12 lg:px-16"
      >
        <div className="w-full max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 bg-background/50 backdrop-blur-lg rounded-3xl p-8 border border-primary/20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-6 font-orbitron">
              ALIEN FORMS
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto mb-4">
              Transform into powerful alien beings, each with unique abilities and strengths
            </p>
            {/* Scroll progress indicator */}
            <div className="flex items-center justify-center space-x-2 mt-6">
              <span className="text-sm text-muted-foreground font-mono">Scroll to explore</span>
              <motion.div 
                className="w-32 h-2 bg-black/30 rounded-full overflow-hidden border border-primary/30"
              >
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                  style={{
                    scaleX: scrollYProgress,
                    originX: 0
                  }}
                />
              </motion.div>
              <motion.span 
                className="text-sm text-primary font-mono"
                animate={{
                  textShadow: ['0 0 5px rgba(0, 255, 65, 0.5)', '0 0 15px rgba(0, 255, 65, 0.8)', '0 0 5px rgba(0, 255, 65, 0.5)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {aliens[selectedAlien].name}
              </motion.span>
            </div>
          </motion.div>

          {/* Main Content Grid - Updated with enhanced alien cards */}
          <div className="grid lg:grid-cols-5 gap-16 items-start max-w-6xl mx-auto">
            
            {/* Left Section - Enhanced Alien Cards */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="space-y-6">
                {aliens.map((alien, index) => (
                  <AlienCard
                    key={alien.name} // Use name instead of index for better performance
                    alien={alien}
                    index={index}
                    onTransform={() => handleTransformation(index)}
                    isSelected={selectedAlien === index}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right Section - Enhanced Video Player (Sticky) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-3 sticky top-20 self-start"
            >
              <div className="relative w-full">
                {/* Enhanced glowing background effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/25 to-primary/10 rounded-3xl blur-3xl scale-105"
                  animate={{
                    opacity: isTransforming ? [0.5, 1, 0.5] : [0.3, 0.6, 0.3],
                    scale: isTransforming ? [1.05, 1.3, 1.05] : [1.05, 1.1, 1.05]
                  }}
                  transition={{
                    duration: isTransforming ? 0.8 : 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Main video container with transformation effect */}
                <motion.div 
                  className="relative bg-black/50 backdrop-blur-lg rounded-3xl border border-primary/40 overflow-hidden shadow-2xl shadow-primary/20"
                  key={selectedAlien} // Re-animate when alien changes
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ 
                    scale: isTransforming ? [0.9, 1.1, 1] : 1, 
                    opacity: 1,
                    boxShadow: isTransforming 
                      ? '0 0 60px rgba(0, 255, 65, 0.8)' 
                      : '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Video player - actual video element */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10 z-10 pointer-events-none">
                      <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,65,0.3)_0%,transparent_50%)]" />
                    </div>
                    
                    {/* Video element */}
                    <video
                      ref={videoRef}
                      key={`video-${selectedAlien}-${aliens[selectedAlien].name}`} // More specific key for better re-rendering
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      onLoadStart={() => console.log(`Loading video: ${aliens[selectedAlien].name}`)}
                      onLoadedData={() => console.log(`Video loaded: ${aliens[selectedAlien].name}`)}
                      onError={(e) => console.error(`Video error for ${aliens[selectedAlien].name}:`, e)}
                    >
                      <source src={aliens[selectedAlien].videoSrc} type="video/mp4" />
                      {/* Fallback content if video fails to load */}
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black/80 to-black/60">
                        <div className="text-center p-12 relative z-10">
                          <motion.div 
                            className="text-8xl mb-6"
                            animate={{ 
                              scale: [1, 1.1, 1],
                              rotateY: [0, 360]
                            }}
                            transition={{ 
                              duration: 4, 
                              repeat: Infinity,
                              ease: "easeInOut" 
                            }}
                          >
                            {aliens[selectedAlien].icon}
                          </motion.div>
                          <h3 className="text-4xl font-black text-primary mb-4 font-orbitron">
                            {aliens[selectedAlien].name}
                          </h3>
                          <p className="text-xl text-muted-foreground mb-6">
                            Video not available
                          </p>
                        </div>
                      </div>
                    </video>
                    
                    {/* Video overlay for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-20" />
                  </div>
                  
                  {/* Enhanced video info overlay */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-8 z-30"
                    key={`overlay-${selectedAlien}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <motion.h4 
                          className="text-2xl font-bold text-white mb-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3, duration: 0.4 }}
                        >
                          {aliens[selectedAlien].name}
                        </motion.h4>
                        <motion.p 
                          className="text-lg text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4, duration: 0.4 }}
                        >
                          {aliens[selectedAlien].description}
                        </motion.p>
                      </div>
                      <motion.div
                        className="bg-primary/20 rounded-full p-4 border border-primary/30 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: isTransforming ? [0.8, 1.3, 1] : 1,
                          boxShadow: isTransforming 
                            ? '0 0 25px rgba(0, 255, 65, 1)' 
                            : '0 0 10px rgba(0, 255, 65, 0.3)'
                        }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        onClick={() => handleTransformation(selectedAlien)}
                      >
                        <motion.div 
                          className="w-6 h-6 bg-primary rounded-full"
                          animate={{ 
                            boxShadow: isTransforming ? [
                              '0 0 15px rgba(0, 255, 65, 0.8)',
                              '0 0 30px rgba(0, 255, 65, 1)',
                              '0 0 15px rgba(0, 255, 65, 0.8)'
                            ] : [
                              '0 0 10px rgba(0, 255, 65, 0.5)',
                              '0 0 20px rgba(0, 255, 65, 0.8)',
                              '0 0 10px rgba(0, 255, 65, 0.5)'
                            ],
                            scale: isTransforming ? [1, 1.5, 1] : [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: isTransforming ? 0.3 : 2, 
                            repeat: Infinity 
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  {/* Corner accent elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/50 rounded-tr-lg z-30" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/50 rounded-bl-lg z-30" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flash Effect for Alien-X Transition */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            className="fixed inset-0 z-50 bg-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Footer - ARE YOU READY FOR THIS Button */}
      <footer className="relative py-20 bg-gradient-to-t from-black via-background to-background">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.button
            onClick={handleAlienXAccess}
            className="relative group px-16 py-8 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-2xl border-2 border-primary/50 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                '0 0 30px rgba(0, 255, 65, 0.4)',
                '0 0 60px rgba(0, 255, 65, 0.8)',
                '0 0 30px rgba(0, 255, 65, 0.4)'
              ]
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }}
          >
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10"
              animate={{
                x: ['-100%', '100%'],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            
            {/* Button text */}
            <motion.span
              className="relative z-10 text-3xl md:text-4xl font-black text-primary font-orbitron tracking-wider"
              animate={{
                textShadow: [
                  '0 0 10px rgba(0, 255, 65, 0.8)',
                  '0 0 20px rgba(0, 255, 65, 1)',
                  '0 0 10px rgba(0, 255, 65, 0.8)'
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              ARE YOU READY FOR THIS?
            </motion.span>

            {/* Corner accents */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-primary/70 rounded-tl-lg" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-primary/70 rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-primary/70 rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-primary/70 rounded-br-lg" />
          </motion.button>
        </motion.div>
      </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Index;
