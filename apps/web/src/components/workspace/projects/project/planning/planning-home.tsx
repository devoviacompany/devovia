"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { PlanForm } from "@/components/workspace/projects/project/planning/home/plan-form";

const fakeProjects = [
  {
    id: "proj-finance",
    name: "FinTrack",
    description: "Personal finance tracker with Next.js + NestJS",
    updatedAt: "2h ago",
  },
  {
    id: "proj-commerce",
    name: "ShopWave",
    description: "E-commerce MVP with auth and product catalog",
    updatedAt: "yesterday",
  },
  {
    id: "proj-test",
    name: "ShopWave",
    description: "with auth and product catalog",
    updatedAt: "12/1/2025",
  },
  {
    id: "proj-dev",
    name: "ShopWave",
    description: "with auth and product catalog",
    updatedAt: "12/1/2025",
  },
];

export function PlanningHome() {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 2xl:py-12">
        <div className="flex flex-col items-center">
          <Image
            src="/icons/logo.png"
            alt="Devovia"
            width={50}
            height={50}
            className="hidden md:block"
          />
        </div>
        <h1 className="text-xl md:text-4xl font-bold text-center">
          Start Planning with Nova AI
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center">
          Create planing by chatting with AI
        </p>
        <div className="max-w-3xl mx-auto w-full">
          <PlanForm />
        </div>

        {/* Project grid (more) */}
        <div className="grid w-full max-w-3xl grid-cols-3 gap-3 mx-auto">
          {fakeProjects.map((p) => (
            <Link key={`grid-${p.id}`} href={`/projects/planning/${p.id}`} className="group">
              <Card className="transition-colors hover:bg-accent/40">
                <CardHeader>
                  <CardTitle>{p.name}</CardTitle>
                  <CardDescription>{p.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 text-xs text-muted-foreground">
                  Updated {p.updatedAt}
                </CardContent>
              </Card>
            </Link>
          ))}
          <button
            type="button"
            onClick={() => alert("New project coming soon")}
            className="flex items-center justify-center rounded-xl border-2 border-dashed text-primary transition-colors cursor-pointer animate-pulse"
          >
            <PlusIcon className="size-6" />
          </button>
        </div>
      </section>
    </div>
  );
}
