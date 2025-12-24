"use client"

import { TestingForm } from "@/components/workspace/projects/project/testing/home/testing-form"
import Image from "next/image"

export default function WorkspaceProjectsTestingPage() {
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
          Start Testing with Omega AI
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center">
          Testing now by chatting with AI
        </p>
        <div className="max-w-3xl mx-auto w-full">
          <TestingForm />
        </div>
      </section>
    </div>
  );
}