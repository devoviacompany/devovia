"use client";

import type { Task, TaskStatus, Column } from "@/types/api/builder/planning/tasks/tasks.type";
import KanbanColumn from "./kanban-column";

export default function KanbanBoard({
  columns,
  tasks,
  onMove,
  onRenameColumn,
  onSetColumnIcon,
  onAssign,
  onOpenTask,
}: {
  columns: Column[];
  tasks: Task[];
  onMove: (taskId: string, to: TaskStatus) => void;
  onRenameColumn: (id: string, name: string) => void;
  onSetColumnIcon: (id: string, icon: string) => void;
  onAssign: (taskId: string, assignee?: string) => void;
  onOpenTask?: (taskId: string) => void;
}) {
  const by = (id: string) => tasks.filter((t) => t.status === id);
  return (
    <div className="kanban-scroll relative -mx-1 flex-1 overflow-x-auto px-1 pb-2">
      <div className="flex h-full w-max gap-4">
        {columns.map((c) => (
          <div key={c.id} className="w-[300px] flex-none">
            <KanbanColumn
              column={c}
              tasks={by(c.id)}
              onMove={onMove}
              onRename={(name) => onRenameColumn(c.id, name)}
              onSetIcon={(icon) => onSetColumnIcon(c.id, icon)}
              onAssign={onAssign}
              onOpenTask={onOpenTask}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
