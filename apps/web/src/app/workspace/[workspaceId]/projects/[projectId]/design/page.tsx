"use client"

import { DesignForm } from "@/components/workspace/projects/project/design/home/design-form"
import Image from "next/image"

export default function WorkspaceProjectsDesignPage() {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 2xl:py-24">
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
          Start Design with Leonardo AI
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center">
          Create design by chatting with AI
        </p>
        <div className="max-w-3xl mx-auto w-full">
          <DesignForm />
        </div>
      </section>
    </div>
  );
}