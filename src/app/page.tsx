import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Stats from "@/components/home/Stats";
import ServicesPreview from "@/components/home/ServicesPreview";
import Testimonials from "@/components/home/Testimonials";
import DeviceSection from "@/components/home/DeviceSection";
import TechStack from "@/components/home/TechStack";
import PricingTeaser from "@/components/home/PricingTeaser";

// Home page — assembles all sections in order
// Section order: Hero → Marquee → Stats → Services → Testimonials
//                → Device 3D → TechStack → Pricing → Footer
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <ServicesPreview />
        <Testimonials />
        <DeviceSection />
        <TechStack />
        <PricingTeaser />
      </main>
      <Footer />
    </>
  );
}
