import Footer from "@/components/Footer";
import FounderStory from "@/components/FounderStory";
import Hero from "@/components/Hero";
import HowItHelps from "@/components/HowItHelps";
import MarqueeTicker from "@/components/MarqueeTicker";
import Navbar from "@/components/Navbar";
import SignalsSection from "@/components/SignalsSection";
import Testimonials from "@/components/Testimonials";
import WhyStuckSection from "@/components/WhyStuckSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
      <Navbar />

      <main>
        <Hero />
        <MarqueeTicker />
        {/* Pionowa "nić" spinająca dalszą część strony w jedną, ciągłą historię
            (widoczna tylko od lg — dekoracyjna, nie wpływa na treść/dostępność). */}
        <div className="relative">
          <div className="story-thread hidden lg:block" aria-hidden="true" />
          <FounderStory />
          <SignalsSection />
          <WhyStuckSection />
          <HowItHelps />
          <Testimonials />
        </div>
      </main>

      <Footer />
    </div>
  );
}
