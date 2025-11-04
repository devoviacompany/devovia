import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/seciton-heading";
import { Contact as ContactComponent } from "@/components/site/main/company/contact-us";

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Container className="border-divide border-x">
        <div className="py-20">
          <SectionHeading>Contact Us</SectionHeading>
          <div className="mt-8">
            <ContactComponent />
          </div>
        </div>
      </Container>
    </div>
  );
}
