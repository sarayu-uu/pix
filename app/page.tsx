import HeroSection from "@/components/HeroSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import WhyLinkedInSection from "@/components/WhyLinkedInSection";
import ServicesPricingSection from "@/components/ServicesPricingSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import HowWeDoItSection from "@/components/HowWeDoItSection";
import CallToActionSection from "@/components/CallToActionSection";

export default function Page() {
  return (
    <main>
      <div id="hero">
        <HeroSection />
      </div>
      <div id="about">
        <ProblemSolutionSection />
      </div>
      <div id="why">
        <WhyLinkedInSection />
      </div>
      <div id="services">
        <ServicesPricingSection />
      </div>
      <div id="case-studies">
        <CaseStudiesSection />
      </div>
      <div id="contact">
        <HowWeDoItSection />
        <CallToActionSection />
      </div>
    </main>
  );
}
