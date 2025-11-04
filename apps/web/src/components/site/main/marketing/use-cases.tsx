"use client";
import { useState } from "react";
import { Container } from "@/components/site/container";
import { Badge } from "@/components/site/badge";
import { SectionHeading } from "@/components/site/section-heading";
import { SubHeading } from "@/components/site/subheading";
import {
  DevopsIcon,
  PhoneIcon,
  TruckIcon,
  DatabaseIcon,
  WalletIcon,
  GraphIcon,
} from "@/components/site/icons/card-icons";
import { Scale } from "@/components/site/scale";
import { motion } from "motion/react";

export const UseCases = () => {
  const useCases = [
    {
      title: "DevOps",
      description:
        "Provision services, wire environments, and automate rollouts with AI-assisted workflows.",
      icon: <DevopsIcon className="text-brand size-6" />,
    },
    {
      title: "SalesOps",
      description:
        "Build lead routing, scoring, and enrichment with CRM and LLM integrations.",
      icon: <GraphIcon className="text-brand size-6" />,
    },
    {
      title: "Supply Chain",
      description:
        "Automate data sync, order updates, and alerts across ERPs and warehouses.",
      icon: <TruckIcon className="text-brand size-6" />,
    },
    {
      title: "Customer Support",
      description:
        "Ship AI copilots and automations for triage, summaries, and actions in your tools.",
      icon: <PhoneIcon className="text-brand size-6" />,
    },
    {
      title: "DataOps",
      description:
        "ETL, quality checks, and evaluations backed by SQL, vector stores, and LLMs.",
      icon: <DatabaseIcon className="text-brand size-6" />,
    },
    {
      title: "FinOps",
      description:
        "Automate invoices, usage metering, and notifications with Stripe and email/SMS.",
      icon: <WalletIcon className="text-brand size-6" />,
    }
  ];
  const [activeUseCase, setActiveUseCase] = useState<number | null>(null);
  return (
    <Container className="border-divide relative overflow-hidden border-x px-4 md:px-8">
      <div className="relative flex flex-col items-center py-20">
        <Badge text="Use Cases" />
        <SectionHeading className="mt-4">
          Across various Industries
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-lg">
          Teams use Devovia to build production apps and automations faster across functionsfrom infrastructure to support.
        </SubHeading>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div
              onMouseEnter={() => setActiveUseCase(index)}
              key={useCase.title}
              className="relative"
            >
              {activeUseCase === index && (
                <motion.div
                  layoutId="scale"
                  className="absolute inset-0 z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                >
                  <Scale />
                </motion.div>
              )}
              <div className="relative z-10 rounded-lg bg-gray-50 p-4 transition duration-200 hover:bg-transparent md:p-5 dark:bg-neutral-800">
                <div className="flex items-center gap-2">{useCase.icon}</div>
                <h3
                  className="mt-4 mb-2 text-lg font-medium"
                  style={{
                    color: "var(--primary)",
                  }}
                >
                  {useCase.title}
                </h3>
                <p
                  className="text-sm"
                  style={{
                    color: "var(--color-gray-600)",
                  }}
                >
                  {useCase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
