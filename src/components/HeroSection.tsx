import { motion } from 'framer-motion';
import VideoBackground from './VideoBackground';
import ScrollIndicator from './ScrollIndicator';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden pb-32">
      {/* Video Background */}
      <VideoBackground src="/omnitrix-reveal.mp4" />
      
      {/* Hero Content - Positioned at bottom */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hero-title text-5xl md:text-7xl lg:text-8xl mb-4 animate-text-glow"
        >
          THE OMNITRIX
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl lg:text-2xl text-foreground/90 font-mono font-light tracking-wide mb-6"
        >
          Unleash the Power Within
        </motion.p>
        
        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 1, ease: "easeOut" }}
          className="w-24 h-px bg-primary mx-auto mb-6 box-glow-subtle"
        />
        
        {/* Secondary Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="space-y-2"
        >
          <p className="text-sm md:text-base text-muted-foreground font-mono tracking-wider">
            [ ALIEN TECHNOLOGY ]
          </p>
          <p className="text-xs md:text-sm text-muted-foreground/70 font-mono">
            Transform • Adapt • Overcome
          </p>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <ScrollIndicator />
      
      {/* Background Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-primary rounded-full animate-glow-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary rounded-full animate-glow-pulse" style={{ animationDelay: '2s' }} />
      </motion.div>
    </section>
  );
};

export default HeroSection;