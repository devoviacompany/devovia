"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProjectCanvas from "./canvas/project-canvas";
import ProjectTasks from "./tasks/project-tasks";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ProjectPlan({ params }: { params: { id: string } }) {
  const [name, setName] = useState<string>("untitled");
  const [active, setActive] = useState<string>("canvas");

  return (
    <div className="min-h-svh">
      {active === "canvas" ? (
        <div className="mx-auto flex h-svh max-w-6xl flex-col gap-6 px-4 py-6">
          {/* Overlay header inside canvas */}
          <div className="pointer-events-auto absolute left-1/2 top-4 z-30 w-full max-w-6xl -translate-x-1/2 px-4">
            <div className="flex items-center justify-between rounded-md px-3 py-2 ">
              <div className="flex items-center gap-3">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-9 w-[220px] rounded-[10px] bg-background/80 cursor-pointer"
                  aria-label="Project name"
                />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2">
                <Tabs value={active} onValueChange={setActive}>
                  <TabsList className="rounded-[10px]">
                    <TabsTrigger value="canvas" className="cursor-pointer">Canvas</TabsTrigger>
                    <TabsTrigger value="tasks" className="cursor-pointer">Tasks</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="rounded-[10px] cursor-pointer">Save</Button>
                <Button variant="ghost" className="rounded-[10px] cursor-pointer">Share</Button>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <ProjectCanvas />
        </div>
      ) : (
        <div className="mx-auto flex h-svh max-w-6xl flex-col gap-6 px-4 py-6">
          {/* Header inside tasks */}
          <div className="pointer-events-auto absolute left-1/2 top-4 z-30 w-full max-w-6xl -translate-x-1/2 px-4">
            <div className="flex items-center justify-between rounded-md px-3 py-2 ">
              <div className="flex items-center gap-3">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-9 w-[220px] rounded-[10px] bg-background/80 cursor-pointer"
                  aria-label="Project name"
                />
              </div>
              <div className="absolute left-1/2 z-10 -translate-x-1/2">
                <Tabs value={active} onValueChange={setActive}>
                  <TabsList className="rounded-[10px]">
                    <TabsTrigger value="canvas" className="cursor-pointer">Canvas</TabsTrigger>
                    <TabsTrigger value="tasks" className="cursor-pointer">Tasks</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="rounded-[10px] cursor-pointer">Save</Button>
                <Button variant="ghost" className="rounded-[10px] cursor-pointer">Share</Button>
              </div>
            </div>
          </div>

          {/* Tasks */}
          <ProjectTasks />
        </div>
      )}
    </div>
  );
}
