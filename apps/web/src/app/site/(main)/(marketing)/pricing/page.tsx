import { SectionHeading } from "@/components/site/seciton-heading";
import { Container } from "@/components/site/container";
import { Pricing as PricingComponent } from "@/components/site/main/marketing/pricing";
import PricingTable from "@/components/site/main/marketing/pricing-table";
import { DivideX } from "@/components/site/divide";
import { CTA } from "@/components/site/main/marketing/cta";
import { FAQs } from "@/components/site/main/company/faqs-section";

export default function PricingPage() {
  return (
    <main>
      <DivideX />
      <Container className="border-divide border-x ">
        <PricingComponent />
        <DivideX />
        <PricingTable />
      </Container>
      <FAQs />
      <CTA />
      <DivideX />
    </main>
  );
}
