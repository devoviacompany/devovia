"use client";

import { useEffect, useRef, useState } from "react";
import type { Task, TaskStatus, Column } from "@/types/api/builder/planning/tasks/tasks.type";
import KanbanCard from "./kanban-card";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function KanbanColumn({
  column,
  tasks,
  onMove,
  onRename,
  onSetIcon,
  onAssign,
  onOpenTask,
}: {
  column: Column;
  tasks: Task[];
  onMove: (taskId: string, to: TaskStatus) => void;
  onRename: (name: string) => void;
  onSetIcon: (icon: string) => void;
  onAssign: (taskId: string, assignee?: string) => void;
  onOpenTask?: (taskId: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(column.name);
  const [icon, setIcon] = useState(column.icon || "");
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!pickerRef.current) return;
      if (!pickerRef.current.contains(e.target as Node)) setPickerOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPickerOpen(false);
    };
    document.addEventListener("mousedown", onDown, true);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("mousedown", onDown, true);
      document.removeEventListener("keydown", onKey, true);
    };
  }, []);

  return (
    <div
      className="flex h-full min-h-[520px] flex-col rounded-[14px] border bg-muted p-3"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const id = e.dataTransfer.getData("text/task-id");
        if (id) onMove(id, column.id);
      }}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="relative flex items-center gap-2" ref={pickerRef}>
          <button
            className="flex h-6 w-6 items-center justify-center rounded-md border bg-card text-sm"
            title="Set icon (emoji)"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => setPickerOpen((v) => !v)}
          >
            <span>{icon || "🙂"}</span>
          </button>
          {pickerOpen ? (
            <div
              className="absolute left-0 top-8 z-50"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Picker
                data={data}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onEmojiSelect={(e: any) => {
                  const next = e?.native || "";
                  if (next) {
                    setIcon(next);
                    onSetIcon(next);
                  }
                  setPickerOpen(false);
                }}
                theme={typeof window !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light"}
              />
            </div>
          ) : null}
          {editing ? (
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => {
                setEditing(false);
                if (name.trim() && name !== column.name) onRename(name.trim());
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.target as HTMLInputElement).blur();
                }
                if (e.key === "Escape") {
                  setName(column.name);
                  setEditing(false);
                }
              }}
              className="h-6 rounded-md border bg-card px-2 text-sm"
            />
          ) : (
            <button
              className="text-sm font-semibold text-muted-foreground"
              onDoubleClick={() => setEditing(true)}
              onClick={() => setEditing(true)}
              title="Rename column"
            >
              {name}
            </button>
          )}
        </div>
      </div>

      <div className="kanban-col-scroll flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {tasks.map((t) => (
          <KanbanCard key={t.id} task={t} onAssign={onAssign} onOpen={() => onOpenTask?.(t.id)} />
        ))}
      </div>
    </div>
  );
}
