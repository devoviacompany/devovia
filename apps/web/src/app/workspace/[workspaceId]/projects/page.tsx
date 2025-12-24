"use client"

import { ProjectForm } from "@/components/workspace/projects/home/project-form"
import Image from "next/image"

export default function WorkspaceProjectsPage() {
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
        <h1 className="text-2xl md:text-5xl font-bold text-center">
          Build Something with Devovia
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center">
          Create apps and websites by chatting with AI
        </p>
        <div className="max-w-3xl mx-auto w-full">
          <ProjectForm />
        </div>
      </section>
      {/* <ProjectsList /> */}
    </div>
  )
}