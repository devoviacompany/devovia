import { LinkedInIcon } from "@/components/site/icons/general";
import { Badge } from "@/components/site/badge";
import { Container } from "@/components/site/container";
import { CTA } from "@/components/site/main/marketing/cta";
import { DivideX } from "@/components/site/divide";
import { Heading } from "@/components/site/heading";
import { InformationBlock } from "@/components/site/information-block";
import { ProgressiveBlur } from "@/components/site/progressive-blur";
import { SectionHeading } from "@/components/site/seciton-heading";
import { SubHeading } from "@/components/site/subheading";
import { Testimonials } from "@/components/site/main/marketing/testimonials";
import { founders } from "@/utils/constants";
import { careers } from "@/utils/constants/landing/careers";
import Link from "next/link";
import { Department } from "@/utils/constants/landing/careers";

// Define types
type Career = {
  id: string;
  title: string;
  department: Department;
  location: string;
  type: string;
  href: string;
  createdAt: string;
  description: string;
  shortDescription: string;
  requirements: string[];
};

type Founder = {
  name: string;
  title: string;
  src: string;
  url: string;
};

export function AboutUS() {
  return (
    <main>
      <DivideX />
      <Container className="border-divide flex flex-col items-center justify-center border-x px-4 pt-10 pb-10 md:px-8 md:pt-32 md:pb-20">
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
          <div className="flex flex-col items-start justify-start">
            <Badge text="About Us" />
            <Heading className="mt-4 text-left">
              We&apos;re building the future of AI‑powered development
            </Heading>
            <SubHeading className="mt-6 mr-auto text-left">
              Devovia is an AI-powered platform that helps teams plan, design, develop, test, and deploy complete web apps from one place. We unify frontend, backend, and AI so you can move from idea to production fast.
              <br /> <br />
              We started Devovia to remove the boilerplate and fragmentation in modern app development. Today, teams use Devovia to ship production UIs, APIs, and AI features with confidence.
            </SubHeading>
          </div>
          <div className="border-divide rounded-3xl border p-2">
            <img
              src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="About Us"
              className="h-full rounded-2xl object-cover"
            />
          </div>
        </div>
        <div className="mt-20 flex w-full flex-col items-center lg:flex-row">
          <h2 className="mb-4 min-w-40 text-center font-mono text-sm tracking-tight text-neutral-500 uppercase lg:mb-0 lg:text-left dark:text-neutral-400">
            As featured in
          </h2>
          <div className="grid w-full grid-cols-2 items-center gap-4 md:grid-cols-4">
            <img
              src="/logos/bloomberg.png"
              alt="Bloomberg"
              className="h-6 w-auto object-contain dark:invert dark:filter"
            />
            <img
              src="/logos/wired.png"
              alt="Wired"
              className="h-6 w-auto object-contain dark:invert dark:filter"
            />
            <img
              src="/logos/forbes.png"
              alt="Forbes"
              className="h-6 w-auto object-contain dark:invert dark:filter"
            />
            <img
              src="/logos/the-guardian.png"
              alt="The Guardian"
              className="h-6 w-auto object-contain dark:invert dark:filter"
            />
          </div>
        </div>
      </Container>
      <DivideX />
      <Container className="border-divide flex flex-col items-center border-x py-16">
        <Badge text="Our Team" />
        <SectionHeading className="mt-4">
          Team of Builders and Researchers
        </SectionHeading>
        <SubHeading className="mx-auto mt-6 max-w-lg px-4">
          We’re a product-obsessed team crafting tools that make developers dramatically faster. Great DX and responsible AI lead to better software.
        </SubHeading>
        <div className="mt-12 grid w-full grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {founders.map((founder: Founder) => (
            <div
              className="group relative h-60 overflow-hidden rounded-2xl md:h-100"
              key={founder.name + founder.title}
            >
              <img
                src={founder.src}
                alt={founder.name}
                className="h-full w-full object-cover object-top"
              />
              <ProgressiveBlur
                className="pointer-events-none absolute bottom-0 left-0 hidden h-[30%] w-full transition-all duration-200 group-hover:block"
                blurIntensity={2}
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl bg-black/80 px-4 py-2">
                <div>
                  <h3 className="text-sm font-medium text-white">
                    {founder.name}
                  </h3>
                  <p className="text-sm text-neutral-300">{founder.title}</p>
                </div>
                <a
                  href={founder.url}
                  target="_blank"
                  className="cursor-pointer"
                >
                  <LinkedInIcon className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-10 md:gap-20 lg:grid-cols-2 p-4 md:px-8 md:py-20">
          <div className="flex flex-col items-start justify-start">
            <Badge text="Journey and Values" />
            <SectionHeading className="mt-4 text-left">
              Our Journey and Values
            </SectionHeading>
            <SubHeading className="mt-6 mr-auto text-left">
              We’re building the operating system for AI‑powered apps: opinionated defaults, type‑safe APIs, and integrated evaluations so you can ship with confidence.
            </SubHeading>
            <div className="divide-divide mt-8 grid grid-cols-3 gap-6">
              <MetricBlock value="1.2M+" label="Projects shipped" />
              <MetricBlock value="6.4k" label="Community" />
              <MetricBlock value="1.2K" label="Customer reviews" />
            </div>
          </div>
          <InformationBlock />
        </div>
      </Container>
      <DivideX />
      <Testimonials />
      <DivideX />
      {/* <Container className="border-divide flex flex-col items-center border-x border-b pb-20">
        <div className="divide-divide border-divide grid grid-cols-1 border-b lg:grid-cols-2 lg:divide-x">
          <div className="flex flex-col items-start justify-start px-4 py-10 md:px-8 md:py-20">
            <Badge text="Careers" />
            <SectionHeading className="mt-4 text-left">
              Let&apos;s Change How Modern <br />
              Enterprise Teams Function
            </SectionHeading>
            <SubHeading className="mt-6 mr-auto max-w-md text-left">
              Building a generational company requires exceptional, hard-working
              people. We are tackling the complexities of commerce
              infrastructure that no one else has dared to.
            </SubHeading>
            <div className="mt-4 flex items-center gap-2">
              <p className="text-charcoal-700 text-base font-medium dark:text-neutral-100">
                Join the team
              </p>
              <div className="flex items-center">
                {founders.slice(0, 3).map((founder: Founder) => (
                  <img
                    key={founder.name + founder.title}
                    src={founder.src}
                    alt={founder.name}
                    className="-mr-3 size-10 rounded-full border border-white object-cover"
                  />
                ))}
                <div className="flex size-10 items-center justify-center rounded-full bg-gray-300">
                  <p className="text-charcoal-700 text-sm font-medium">
                    {founders.length - 3}+
                  </p>
                </div>
              </div>
            </div>
            <h2 className="mt-8 text-left font-mono text-sm tracking-tight text-neutral-500 uppercase dark:text-neutral-400">
              Our Investors
            </h2>
            <div className="mt-8 grid w-full grid-cols-3 items-center gap-10 md:grid-cols-3">
              <img
                src="/logos/y-combinator.png"
                alt="Investor 1"
                className="h-6 w-auto object-contain dark:invert dark:filter"
              />
              <img
                src="/logos/accel.png"
                alt="Investor 2"
                className="h-6 w-auto object-contain dark:invert dark:filter"
              />
              <img
                src="/logos/softbank.png"
                alt="Investor 3"
                className="h-6 w-auto object-contain dark:invert dark:filter"
              />
            </div>
          </div>
          <div className="divide-divide border-divide divide-y border-t lg:border-t-0">
            {careers.slice(0, 4).map((career: Career) => (
              <Link
                href={career.href}
                key={career.id}
                className="block cursor-pointer px-4 py-4 hover:bg-gray-100 md:px-8 dark:hover:bg-neutral-800"
              >
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                  <h3 className="text-brand font-medium">{career.title}</h3>
                  <div className="hidden size-1 rounded-full bg-gray-400 sm:block dark:bg-neutral-600"></div>
                  <p className="text-sm text-gray-600 dark:text-neutral-200">
                    {career.location}
                  </p>
                  <div className="hidden size-1 rounded-full bg-gray-400 sm:block dark:bg-neutral-600"></div>
                  <span className="text-xs font-medium text-gray-600 dark:text-neutral-400">
                    {Math.floor(
                      (new Date().getTime() -
                        new Date(career.createdAt).getTime()) /
                      (1000 * 60 * 60 * 24),
                    )}{" "}
                    days ago
                  </span>
                </div>
                <p className="mt-2 font-medium text-neutral-500 dark:text-neutral-200">
                  {career.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Container> */}
      <CTA />
      <DivideX />
    </main>
  );
}

const MetricBlock = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className="flex flex-col items-start justify-start">
      <h3 className="text-charcoal-700 text-3xl font-medium dark:text-neutral-100">
        {value}
      </h3>
      <p className="text-sm text-gray-600 dark:text-neutral-400">{label}</p>
    </div>
  );
};