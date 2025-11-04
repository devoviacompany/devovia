import { Container } from "@/components/site/container";
import { Logo } from "@/components/global/logo";
import { Heading } from "@/components/site/heading";
import { SubHeading } from "@/components/site/subheading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Illustration } from "@/components/site/illustration";
import { Textarea } from "@/components/ui/textarea";

export const Contact = () => {
  return (
    <Container className="min-h-[calc(100vh-8rem)] py-10 md:py-20">
      <div className="grid grid-cols-1 gap-10 px-4 md:grid-cols-2 md:px-8 lg:gap-40">
        <div>
          <Logo />
          <Heading className="mt-4 text-left lg:text-4xl">Contact us</Heading>
          <SubHeading as="p" className="mt-4 max-w-xl text-left">
            We empower developers and technical teams to create, simulate, and
            manage AI-driven workflows visually
          </SubHeading>
          <form className="mt-6 flex flex-col gap-8">
            <div className="h-full w-full rounded-2xl">
              <Label>Name</Label>
              <Input
                type="text"
                className="mt-4 border-none focus:ring-gray-300"
                placeholder="Manu Arora"
              />
            </div>
            <div className="h-full w-full rounded-2xl">
              <Label>Email</Label>
              <Input
                type="email"
                className="mt-4 border-none focus:ring-gray-300"
                placeholder="youremail@yourdomain.com"
              />
            </div>
            <div className="h-full w-full rounded-2xl">
              <Label>Message</Label>
              <Textarea
                className="mt-4 border-none focus:ring-gray-300"
                placeholder="Your message"
                rows={15}
              />
            </div>
            <Button>Send Message</Button>
          </form>
        </div>
        <Illustration />
      </div>
    </Container>
  );
};
