"use client"

import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"

import { Button } from "@/components/ui/button"
import React from "react"

export function ProjectsList() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [projects, setProjects] = React.useState(
    [
      { id: "project-1111", name: "Project 1", updatedAt: "2025-11-25T12:00:00" },
      { id: "project-2222", name: "Project 2", updatedAt: "2025-11-26T12:00:00" },
      { id: "project-3333", name: "Project 3", updatedAt: "2025-11-27T12:00:00" },
    ] satisfies { id: string; name: string; updatedAt: string }[]
  );

  return (
    <div className="w-full bg-white dark:bg-sidebar rounded-xl p-8 border flex flex-col gap-y-6 sm:gap-y-4">
      <h2 className="text-2xl font-semibold">
        Developer Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {projects?.length === 0 && (
          <div className="col-span-full text-center">
            <p className="text-sm text-muted-foreground">
              No Projects Found
            </p>
          </div>
        )}
        {projects?.map((project) => {
          const date = project.updatedAt ? new Date(project.updatedAt) : null
          const isValidDate = date && !isNaN(date.getTime())
          const lastUpdatedLabel = isValidDate
            ? formatDistanceToNow(date, { addSuffix: true })
            : "Just now"

          return (
          <Button
            key={project.id}
            variant="outline"
            className="font-normal h-auto justify-start w-full text-start p-4"
          >
            <Link href={`/projects/${project.id}`}>
              <div className="flex items-center gap-x-4">
                <Image
                  src="/icons/logo.png"
                  alt="Devovia"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <div className="flex flex-col">
                  <h3 className="truncate font-medium">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {lastUpdatedLabel}
                  </p>
                </div>
              </div>
            </Link>
          </Button>
        )})}
      </div>
    </div>
  )
}


