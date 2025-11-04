import { Container } from "@/components/site/container";
import { Badge } from "@/components/site/badge";
import { SectionHeading } from "@/components/site/section-heading";
import { SubHeading } from "@/components/site/subheading";
import { DivideX } from "@/components/site/divide";
import { ScalesContainer } from "@/components/site/scales-container";
import { cn } from "@/utils/functions";
import {
  ScreenCogIcon,
  GraphIcon,
  ShieldIcon,
  ReuseBrainIcon,
  DatabaseIcon,
  BellIcon,
  DevopsIcon,
  WalletIcon,
} from "@/components/site/icons/card-icons";
import { RealtimeSyncIcon, SDKIcon } from "@/components/site/icons/bento-icons";
import { CTA } from "@/components/site/main/marketing/cta";
import { FAQs } from "@/components/site/main/company/faqs-section";

export function FeaturesSection() {
  const featuresA = [
    {
      title: "Visual builder",
      description:
        "Design pages and flows visually with shadcn/ui + Tailwind. Drag, snap, and configure props with instant preview.",
      icon: <ScreenCogIcon className="text-brand size-6" />,
    },
    {
      title: "Component library",
      description:
        "Production‑ready components, patterns, and layouts so you can ship polished UIs without reinventing the basics.",
      icon: <ReuseBrainIcon className="text-brand size-6" />,
    },
    {
      title: "Type‑safe APIs",
      description:
        "Scaffold routes and handlers with validation, schemas, and auto‑typed clients for end‑to‑end safety.",
      icon: <ShieldIcon className="text-brand size-6" />,
    },
  ];

  const featuresB = [
    {
      title: "Database & ORM",
      description:
        "Model your domain with Prisma, generate types, run safe migrations, and seed data per environment.",
      icon: <DatabaseIcon className="text-brand size-6" />,
    },
    {
      title: "Auth & sessions",
      description:
        "Add secure sign‑in and session management via Clerk or NextAuth with role‑based access.",
      icon: <ShieldIcon className="text-brand size-6" />,
    },
    {
      title: "Payments & billing",
      description:
        "Stripe integration for subscriptions, usage metering, webhooks, and invoice emails.",
      icon: <WalletIcon className="text-brand size-6" />,
    },
  ];

  const featuresC = [
    {
      title: "Integrations",
      description:
        "Email, storage, search, analytics, and provider SDKs with environment‑aware configuration.",
      icon: <SDKIcon className="text-brand size-6" />,
    },
    {
      title: "Webhooks & jobs",
      description:
        "Reliable background jobs, retries, and dead‑letter handling for external systems.",
      icon: <DevopsIcon className="text-brand size-6" />,
    },
    {
      title: "Notifications",
      description:
        "Email, SMS, and in‑app notifications with queueing, templates, and auditing.",
      icon: <BellIcon className="text-brand size-6" />,
    },
  ];

  const featuresD = [
    {
      title: "Realtime collaboration",
      description:
        "Presence cursors, live editing, and conflict‑free operations so teams can build together.",
      icon: <RealtimeSyncIcon className="text-brand size-6" />,
    },
    {
      title: "Environments & logs",
      description:
        "Preview, staging, production with request logs, metrics, and structured traces.",
      icon: <GraphIcon className="text-brand size-6" />,
    },
    {
      title: "Deploy & rollbacks",
      description:
        "One‑click deploys to Vercel + Railway, health checks, and fast rollbacks.",
      icon: <ShieldIcon className="text-brand size-6" />,
    },
  ];

  return (
    <main>
      <DivideX />
      <Container className="border-divide flex flex-col items-center justify-center border-x px-4 pt-16 pb-16 md:px-8 md:pt-28 md:pb-20">
        <Badge text="Features" />
        <SectionHeading className="mt-4 text-center">
          Build better, faster
        </SectionHeading>
        <SubHeading as="p" className="mx-auto mt-6 max-w-2xl text-center">
          Devovia brings the essentials of modern app development together: a visual builder, type‑safe APIs, first‑class integrations, and a streamlined deploy flow.
        </SubHeading>
      </Container>

      <DivideX />
      <Container className="border-divide border-x px-4 py-16 md:px-8">
        <SectionHeading className="text-left">Builder & UI</SectionHeading>
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-4">
            {featuresA.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
          <ScalesContainer className={cn("h-80 w-full lg:col-span-4")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/placeholder.svg"
              alt="Builder preview"
              className="h-80 w-full rounded-2xl object-cover"
            />
          </ScalesContainer>
        </div>
      </Container>

      <DivideX />
      <Container className="border-divide border-x px-4 py-16 md:px-8">
        <SectionHeading className="text-left">Backend foundation</SectionHeading>
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-8">
          <ScalesContainer className={cn("order-last h-80 w-full lg:order-none lg:col-span-4")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/placeholder.svg"
              alt="Backend foundation"
              className="h-80 w-full rounded-2xl object-cover"
            />
          </ScalesContainer>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-4">
            {featuresB.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </Container>

      <DivideX />
      <Container className="border-divide border-x px-4 py-16 md:px-8">
        <SectionHeading className="text-left">Integrations</SectionHeading>
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-4">
            {featuresC.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
          <ScalesContainer className={cn("h-80 w-full lg:col-span-4")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/placeholder.svg"
              alt="Integrations"
              className="h-80 w-full rounded-2xl object-cover"
            />
          </ScalesContainer>
        </div>
      </Container>

      <DivideX />
      <Container className="border-divide border-x px-4 py-16 md:px-8">
        <SectionHeading className="text-left">Collaboration & deploy</SectionHeading>
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-8">
          <ScalesContainer className={cn("order-last h-80 w-full lg:order-none lg:col-span-4")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/placeholder.svg"
              alt="Deploy preview"
              className="h-80 w-full rounded-2xl object-cover"
            />
          </ScalesContainer>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-4">
            {featuresD.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </Container>

      <DivideX />
      <FAQs />
      <DivideX />
      <CTA />
      <DivideX />

    </main>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative z-10 rounded-lg bg-gray-50 p-4 transition duration-200 hover:bg-transparent md:p-5 dark:bg-neutral-800">
      <div className="flex items-center gap-2">{icon}</div>
      <h3
        className="mt-4 mb-2 text-lg font-medium"
        style={{ color: "var(--primary)" }}
      >
        {title}
      </h3>
      <p className="text-sm" style={{ color: "var(--color-gray-600)" }}>
        {description}
      </p>
    </div>
  );
}
