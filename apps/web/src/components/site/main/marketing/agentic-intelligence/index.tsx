"use client";
import { Container } from "@/components/site/container";
import { Badge } from "@/components/site/badge";
import { SubHeading } from "@/components/site/subheading";
import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardDescription, CardTitle } from "./card";
import {
  BrainIcon,
  FingerprintIcon,
  MouseBoxIcon,
  NativeIcon,
  RealtimeSyncIcon,
  SDKIcon,
} from "@/components/site/icons/bento-icons";
import {
  LLMModelSelectorSkeleton,
  NativeToolsIntegrationSkeleton,
  TextToWorkflowBuilderSkeleton,
} from "./skeletons";

export const AgenticIntelligence = () => {
  return (
    <Container className="border-divide border-x">
      <div className="flex flex-col items-center py-16">
        <Badge text="Features" />
        <SectionHeading className="mt-4">
          Built for AI‑powered development
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-lg px-2">
          Use Devovia to design UIs, wire services, and integrate LLMs—then test and ship production apps with confidence.
        </SubHeading>
        <div className="border-divide divide-divide mt-16 grid grid-cols-1 divide-y border-y md:grid-cols-2 md:divide-x">
          <Card className="overflow-hidden mask-b-from-80%">
            <div className="flex items-center gap-2">
              <BrainIcon className="text-brand size-6" />
              <CardTitle>LLM Model Selector</CardTitle>
            </div>
            <CardDescription>
              Choose and compare models for each use case, control cost, and track performance over time.
            </CardDescription>
            <LLMModelSelectorSkeleton />
          </Card>
          <Card className="overflow-hidden mask-b-from-80%">
            <div className="flex items-center gap-2">
              <MouseBoxIcon className="text-brand size-6" />
              <CardTitle>Text to workflow builder</CardTitle>
            </div>
            <CardDescription>
              Describe a feature and get scaffolds for components, routes, and tests you can refine visually.
            </CardDescription>
            <TextToWorkflowBuilderSkeleton />
          </Card>
        </div>
        <div className="w-full">
          <Card className="relative w-full max-w-none overflow-hidden">
            <div className="pointer-events-none absolute inset-0 h-full w-full bg-[radial-gradient(var(--color-dots)_1px,transparent_1px)] mask-radial-from-10% [background-size:10px_10px]"></div>
            <div className="flex items-center gap-2">
              <NativeIcon className="text-brand size-6" />
              <CardTitle>Native Tools Integration</CardTitle>
            </div>
            <CardDescription>
              Track real-time activity of agents with detailed records of
              triggers, tools used, outcomes, and timestamps.
            </CardDescription>
            <NativeToolsIntegrationSkeleton />
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <Card>
            <div className="flex items-center gap-2">
              <FingerprintIcon className="text-brand size-6" />
              <CardTitle>One Click Auth</CardTitle>
            </div>
            <CardDescription>
              Add secure sign‑in and session management in minutes with built‑in best practices.
            </CardDescription>
          </Card>
          <Card>
            <div className="flex items-center gap-2">
              <RealtimeSyncIcon className="text-brand size-6" />
              <CardTitle>Realtime Sync</CardTitle>
            </div>
            <CardDescription>
              Collaborate live with your team—changes sync instantly across the canvas and code.
            </CardDescription>
          </Card>
          <Card>
            <div className="flex items-center gap-2">
              <SDKIcon className="text-brand size-6" />
              <CardTitle>Custom Connector SDK</CardTitle>
            </div>
            <CardDescription>
              Extend Devovia with custom connectors to your internal systems and tools.
            </CardDescription>
          </Card>
        </div>
      </div>
    </Container>
  );
};
