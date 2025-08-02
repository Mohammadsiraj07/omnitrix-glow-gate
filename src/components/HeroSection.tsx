import { motion, useScroll, useTransform } from 'framer-motion';
import VideoBackground from './VideoBackground';
import ScrollIndicator from './ScrollIndicator';
import { useRef } from 'react';

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Enhanced transform values for premium animations
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0.6, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [24, 60]);

  return (
    <section ref={ref} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-12 px-6 md:px-12 lg:px-16">
      {/* Central Container with dynamic geometric shape */}
      <motion.div 
        className="hero-container relative w-full max-w-7xl mx-auto overflow-hidden bg-black/15 backdrop-blur-lg shadow-2xl border border-white/20"
        style={{ 
          y,
          scale,
          rotate,
          filter: useTransform(blur, (value) => `blur(${value}px)`),
          borderRadius: useTransform(borderRadius, (value) => `${value}px`),
          clipPath: "polygon(0% 0%, 100% 0%, 95% 85%, 80% 100%, 20% 100%, 5% 85%)",
          minHeight: "85vh",
          background: `
            linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 255, 65, 0.05) 50%, rgba(0, 0, 0, 0.2) 100%),
            radial-gradient(circle at 30% 70%, rgba(0, 255, 65, 0.1) 0%, transparent 50%)
          `,
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.8),
            0 0 0 1px rgba(0, 255, 65, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `
        }}
      >
        {/* Video Background - contained within geometric shape */}
        <div className="absolute inset-0 overflow-hidden">
          <VideoBackground src="/omnitrix-reveal.mp4" />
          {/* Enhanced video overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
        
        {/* Floating geometric decorations */}
        <motion.div
          className="absolute top-8 right-8 w-16 h-16 border-2 border-primary/30 rotate-45"
          animate={{ 
            rotate: [45, 405],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div
          className="absolute bottom-12 left-12 w-8 h-8 bg-primary/20 rounded-full"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Hero Content - Premium spacing and animations */}
        <motion.div 
          className="relative z-10 text-center px-8 md:px-16 lg:px-24 xl:px-32 py-20 md:py-24 lg:py-28 min-h-[85vh] flex flex-col justify-center items-center"
          style={{ opacity }}
        >
          {/* Main Title - Premium typography with advanced animations */}
          <motion.div className="relative mb-12">
            {/* Background text effect */}
            <motion.h1
              className="absolute inset-0 text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight tracking-wider font-black text-primary/10 blur-sm"
              style={{
                fontFamily: "'Orbitron', 'Inter', monospace",
                fontWeight: 900,
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              THE OMNITRIX
            </motion.h1>
            
            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1] // Custom easing for premium feel
              }}
              className="relative text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight tracking-wider font-black text-primary"
              style={{
                fontFamily: "'Orbitron', 'Inter', monospace",
                fontWeight: 900,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility',
                y: useTransform(scrollYProgress, [0, 1], [0, -60]),
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              THE OMNITRIX
            </motion.h1>
          </motion.div>
          
          {/* Subtitle - Enhanced with staggered animation */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.3, 
              duration: 1, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white/95 font-light tracking-wide mb-20 max-w-5xl mx-auto leading-relaxed"
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -40]),
              fontFamily: "'Inter', sans-serif"
            }}
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Unleash
            </motion.span>
            {" "}
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              the
            </motion.span>
            {" "}
            <motion.span
              className="inline-block text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Power
            </motion.span>
            {" "}
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              Within
            </motion.span>
          </motion.p>
          
          {/* Enhanced Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.3, duration: 1.5, ease: "easeOut" }}
            className="relative w-48 h-px mx-auto mb-20"
            style={{
              scaleX: useTransform(scrollYProgress, [0, 1], [1, 0.3]),
              opacity: useTransform(scrollYProgress, [0, 0.8], [1, 0])
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
              animate={{
                opacity: [0, 1, 0],
                scaleX: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          {/* Enhanced Secondary Text with micro-animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="space-y-8 mb-20"
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -25]),
              opacity: useTransform(scrollYProgress, [0, 0.6], [1, 0])
            }}
          >
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground font-mono tracking-wider"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              [ ALIEN TECHNOLOGY ]
            </motion.p>
            <motion.div 
              className="flex items-center justify-center space-x-4 text-lg md:text-xl text-muted-foreground/80 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <motion.span
                whileHover={{ scale: 1.1, color: "#00ff41" }}
                transition={{ duration: 0.2 }}
              >
                Transform
              </motion.span>
              <motion.span 
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.span
                whileHover={{ scale: 1.1, color: "#00ff41" }}
                transition={{ duration: 0.2 }}
              >
                Adapt
              </motion.span>
              <motion.span 
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.span
                whileHover={{ scale: 1.1, color: "#00ff41" }}
                transition={{ duration: 0.2 }}
              >
                Overcome
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Enhanced Scroll Indicator with premium animation */}
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
            y: useTransform(scrollYProgress, [0, 1], [0, 60])
          }}
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ScrollIndicator />
        </motion.div>
        
        {/* Premium Background Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 2.5, duration: 2 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            rotate: useTransform(scrollYProgress, [0, 1], [0, 90]),
            opacity: useTransform(scrollYProgress, [0, 1], [0.15, 0])
          }}
        >
          <motion.div 
            className="absolute top-1/6 left-1/6 w-3 h-3 bg-primary/60 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-2/3 right-1/5 w-2 h-2 bg-primary/40 rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-2/5 w-2.5 h-2.5 bg-primary/50 rounded-full"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.5, 0.9, 0.5]
            }}
            transition={{ 
              duration: 3.5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;