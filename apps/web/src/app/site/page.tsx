import { AgenticIntelligence } from "@/components/site/main/marketing//agentic-intelligence";
import { Benefits } from "@/components/site/main/marketing//benefits";
import { CTA } from "@/components/site/main/marketing//cta";
import { DivideX } from "@/components/site/divide";
import { FAQs } from "@/components/site/main/company/faqs-section";
import { Hero } from "@/components/site/main/marketing//hero";
import { HeroImage } from "@/components/site/main/marketing//hero-image";
import { HowItWorks } from "@/components/site/main/marketing//how-it-works";
import { LogoCloud } from "@/components/site/main/marketing//logo-cloud";
import { Pricing } from "@/components/site/main/marketing//pricing";
import { Security } from "@/components/site/main/marketing//security";
import { Testimonials } from "@/components/site/main/marketing//testimonials";
import { UseCases } from "@/components/site/main/marketing//use-cases";
import { Navbar } from "@/components/site/navigation/navbar";
import { Footer } from "@/components/site/navigation/footer";

export default function Page() {
  return (
    <main>
      <Navbar />
      <DivideX />
      <Hero />
      <DivideX />
      <HeroImage />
      <DivideX />
      <LogoCloud />
      <DivideX />
      <HowItWorks />
      <DivideX />
      <AgenticIntelligence />
      <DivideX />
      <UseCases />
      <DivideX />
      <Benefits />
      <DivideX />
      <Testimonials />
      <DivideX />
      <Pricing />
      <DivideX />
      <Security />
      <DivideX />
      <FAQs />
      <DivideX />
      <CTA />
      <DivideX />
      <Footer />
    </main>
  );
}