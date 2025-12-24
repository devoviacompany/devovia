"use client";

import { DND_TYPE, ShapeKind } from "@/types/api/builder/planning/canvas/canvas.type";
import { cn } from "@/utils/functions";
import { CircleIcon, ShapesIcon, SquareIcon } from "lucide-react";

export type SidebarItem = { type: ShapeKind; label: string; icon: React.ReactNode };

const items: SidebarItem[] = [
  { type: "frontend", label: "Frontend", icon: <SquareIcon className="size-4" /> },
  { type: "endpoint", label: "API Endpoint", icon: <ShapesIcon className="size-4" /> },
  { type: "database", label: "Database", icon: <CircleIcon className="size-4" /> },
];

export default function ShapesSidebar() {
  return (
    <div className="mt-4 flex flex-col gap-2">
      {items.map((it) => (
        <div
          key={it.type}
          className={cn(
            "flex cursor-grab items-center gap-2 rounded-md border bg-background px-3 py-2 shadow-sm",
            "transition-transform hover:-translate-y-0.5 hover:bg-accent"
          )}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData(DND_TYPE, JSON.stringify({ type: it.type }));
            e.dataTransfer.effectAllowed = "move";
          }}
        >
          <div className="text-muted-foreground">{it.icon}</div>
          <div className="text-sm">{it.label}</div>
        </div>
      ))}
    </div>
  );
}
