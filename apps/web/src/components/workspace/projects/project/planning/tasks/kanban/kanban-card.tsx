"use client";

import type { Task } from "@/types/api/builder/planning/tasks/tasks.type";

export default function KanbanCard({ task, onAssign, onOpen }: { task: Task; onAssign?: (taskId: string, assignee?: string) => void; onOpen?: () => void }) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/task-id", task.id);
        e.dataTransfer.effectAllowed = "move";
      }}
      onClick={() => {
        // if drag happened, click won't fire; simple open on click
        onOpen?.();
      }}
      className="rounded-[10px] border bg-card px-3 py-2 text-sm shadow-sm transition-shadow hover:shadow cursor-pointer"
    >
      <div className="font-medium">{task.title}</div>
      {task.description ? (
        <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{task.description}</div>
      ) : null}

      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <div className="truncate">{task.assignee ? `@${task.assignee}` : "Unassigned"}</div>
        {onAssign ? (
          <button
            className="rounded-md border bg-background px-2 py-0.5 text-[11px]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const next = window.prompt("Assign to (name)", task.assignee || "");
              if (next !== null) onAssign(task.id, next.trim() || undefined);
            }}
            title="Set assignee"
          >
            Assign
          </button>
        ) : null}
      </div>
    </div>
  );
}
