/* eslint-disable react-hooks/static-components */
"use client";

import { cn } from "@/utils/functions";
import { Button } from "@/components/ui/button";
import { HandIcon, MousePointer2Icon, PenLineIcon, StickyNoteIcon, ShapesIcon, TypeIcon } from "lucide-react";
import { DND_TYPE } from "@/types/api/builder/planning/canvas/canvas.type";

export type Tool = "select" | "pan" | "pen" | "note" | "shapes" | "text";

export default function Toolbar({ tool, onChangeTool, className }: {
  tool: Tool;
  onChangeTool: (t: Tool) => void;
  className?: string;
}) {
  const Item = ({ value, children, badge }: { value: Tool; children: React.ReactNode; badge?: string }) => (
    <Button
      type="button"
      size="icon"
      variant={tool === value ? "default" : "ghost"}
      className={cn("relative rounded-lg transition-transform", tool === value && "shadow")}
      onClick={() => onChangeTool(value)}
    >
      {badge ? (
        <span className="pointer-events-none absolute -right-1 -bottom-1 inline-flex h-4 min-w-4 items-center justify-center rounded-md bg-muted px-1 text-[8px] font-semibold text-foreground">
          {badge}
        </span>
      ) : null}
      {children}
    </Button>
  );

  return (
    <div className={cn("pointer-events-auto", className)}>
      <div className="flex items-center gap-1 w-[400px] h-[60px] justify-evenly items-center rounded-xl border bg-background/80 p-1 shadow backdrop-blur">
        <Item value="select" badge="1"><MousePointer2Icon className="size-4" /></Item>
        <Item value="pan" badge="2"><HandIcon className="size-4" /></Item>
        {/* <div className="mx-1 h-5 w-px bg-border" /> */}

        <Item value="pen" badge="3"><PenLineIcon className="size-4" /></Item>
        {/* Draggable Note from toolbar (no shortcut badge) */}
        <Button
          type="button"
          size="icon"
          variant={tool === "note" ? "default" : "ghost"}
          className={cn(
            "rounded-lg transition-transform cursor-grab hover:-translate-y-0.5",
            tool === "note" && "shadow"
          )}
          onClick={() => onChangeTool("note")}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData(DND_TYPE, JSON.stringify({ type: "note" }));
            e.dataTransfer.effectAllowed = "move";
          }}
          aria-label="Drag note to canvas"
          title="Drag to canvas"
        >
          <StickyNoteIcon className="size-4" />
        </Button>
        <Item value="shapes" badge="4"><ShapesIcon className="size-4" /></Item>
        {/* Draggable Text (Title) from toolbar (no shortcut badge) */}
        <Button
          type="button"
          size="icon"
          variant={tool === "text" ? "default" : "ghost"}
          className={cn(
            "rounded-lg transition-transform cursor-grab hover:-translate-y-0.5",
            tool === "text" && "shadow"
          )}
          onClick={() => onChangeTool("text")}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData(DND_TYPE, JSON.stringify({ type: "text" }));
            e.dataTransfer.effectAllowed = "move";
          }}
          aria-label="Drag title to canvas"
          title="Drag to canvas"
        >
          <TypeIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}
