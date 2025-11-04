import { Container } from "@/components/site/container";
import { Badge } from "@/components/site/badge";
import { SectionHeading } from "@/components/site/section-heading";
import { SubHeading } from "@/components/site/subheading";
import { DivideX } from "@/components/site/divide";
import { ScalesContainer } from "@/components/site/scales-container";
import { cn } from "@/utils/functions";
import { FAQs } from "@/components/site/main/company/faqs-section";
import { CTA } from "@/components/site/main/marketing/cta";

export default function AiModelSection() {
  const models = [
    {
      id: "nova",
      name: "Nova",
      role: "Planning model",
      tagline: "Turns vague ideas into clear, scoped plans.",
      bullets: [
        "Requirement capture and refinement",
        "User stories, acceptance criteria, and milestones",
        "System diagrams and dependency mapping",
      ],
      imageAlt: "Nova planning model",
    },
    {
      id: "leonardo",
      name: "Leonardo",
      role: "Design model",
      tagline: "Crafts accessible, production‑ready UI.",
      bullets: [
        "Component selections from shadcn/ui",
        "Responsive layouts and states",
        "Design tokens and theming recommendations",
      ],
      imageAlt: "Leonardo design model",
    },
    {
      id: "devo",
      name: "Devo",
      role: "Development model",
      tagline: "Builds type‑safe APIs and robust data layers.",
      bullets: [
        "Routes, handlers, and validation",
        "Prisma models, migrations, and seeds",
        "Integration scaffolds (auth, payments, notifications)",
      ],
      imageAlt: "Devo development model",
    },
    {
      id: "omega",
      name: "Omega",
      role: "Testing model",
      tagline: "Catches regressions before they ship.",
      bullets: [
        "Unit, integration, and E2E test generation",
        "Scenario coverage suggestions",
        "Perf and reliability checks",
      ],
      imageAlt: "Omega testing model",
    },
    {
      id: "buzz",
      name: "Buzz",
      role: "Deployment model",
      tagline: "Ships confidently with observability built‑in.",
      bullets: [
        "Preview, staging, and production workflows",
        "Deploys to Vercel + Railway with rollbacks",
        "Release notes, health checks, and alerts",
      ],
      imageAlt: "Buzz deployment model",
    },
  ];

  return (
    <main>
      <DivideX />
      <Container className="border-divide flex flex-col items-center justify-center border-x px-4 pt-16 pb-16 md:px-8 md:pt-28 md:pb-20">
        <Badge text="AI Models" />
        <SectionHeading className="mt-4 text-center">
          Agentic models for every phase of your stack
        </SectionHeading>
        <SubHeading as="p" className="mx-auto mt-6 max-w-2xl text-center">
          Five specialized models work together inside Devovia to plan, design, develop, test, and deploy your product. Use them independently—or let them hand off work across phases.
        </SubHeading>
      </Container>

      {models.map((m, idx) => (
        <div key={`${m.id}-model`}>
          <DivideX key={`${m.id}-divider`} />
          <Container key={m.id} className="border-divide border-x px-4 py-16 md:px-8">
            <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-center">
              <div className={cn("w-full lg:w-1/2", idx % 2 === 1 && "order-last lg:order-none")}>
                <Badge text={m.role} />
                <SectionHeading className="mt-4 text-left">{m.name}</SectionHeading>
                <SubHeading as="p" className="mt-4 max-w-xl text-left">
                  {m.tagline}
                </SubHeading>
                <ul className="mt-6 space-y-3">
                  {m.bullets.map((b) => (
                    <li key={b} className="text-gray-600 dark:text-neutral-300">
                      • {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full lg:w-1/2">
                <ScalesContainer className="h-80 w-full">
                  <img
                    src="/placeholder.svg"
                    alt={m.imageAlt}
                    className="h-80 w-full rounded-2xl object-cover"
                  />
                </ScalesContainer>
              </div>
            </div>
          </Container>
        </div>
      ))}

      <DivideX />
      <Container className="border-divide border-x px-4 py-16 md:px-8">
        <Badge text="Orchestration" />
        <SectionHeading className="mt-4 text-left">How they work together</SectionHeading>
        <SubHeading as="p" className="mt-4 max-w-4xl text-start">
          Nova scopes work → Leonardo proposes UI → Devo wires data and services → Omega validates → Buzz ships and watches. Each handoff preserves context so you keep momentum without rework.
        </SubHeading>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-5">
          {models.map((m) => (
            <div key={`flow-${m.id}`} className="relative z-10 rounded-lg bg-gray-50 p-4 md:p-5 dark:bg-neutral-800">
              <h3 className="text-lg font-medium" style={{ color: "var(--primary)" }}>
                {m.name}
              </h3>
              <p className="mt-1 text-sm" style={{ color: "var(--color-gray-600)" }}>
                {m.role}
              </p>
            </div>
          ))}
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
