// Omnitrix Hero Landing Page
import HeroSection from '@/components/HeroSection';

const Index = () => {
  return (
    <main className="relative">
      <HeroSection />
      
      {/* Additional content sections can be added here */}
      <section className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-orbitron text-primary mb-4">
            More Content Coming Soon
          </h2>
          <p className="text-muted-foreground font-mono">
            The journey continues...
          </p>
        </div>
      </section>
    </main>
  );
};

export default Index;
