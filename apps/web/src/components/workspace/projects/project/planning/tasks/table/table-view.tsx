"use client";

import type { Task } from "@/types/api/builder/planning/tasks/tasks.type";

const pill = (text: string, color: string) => (
  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>{text}</span>
);

export default function TableView({ tasks, onOpenTask }: { tasks: Task[]; onOpenTask?: (id: string) => void }) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        {tasks.map((t) => (
          <div
            key={t.id}
            className="rounded-[12px] border bg-card p-3 shadow-sm transition-shadow hover:shadow-md cursor-pointer"
            onClick={() => onOpenTask?.(t.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") onOpenTask?.(t.id) }}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{t.title}</div>
                {t.description ? (
                  <div className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{t.description}</div>
                ) : null}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {pill(
                  (t.status ?? "").replace("_", " ") || "-",
                  t.status === "done"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                    : t.status === "in_progress"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400"
                      : t.status === "todo"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300"
                )}
                {pill((t.priority ?? "-").toString(),
                  t.priority === "high"
                    ? "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400"
                    : t.priority === "medium"
                      ? "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400"
                      : t.priority === "low"
                        ? "bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-400"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300"
                )}
              </div>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-2 text-xs text-muted-foreground sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <span className="w-16 shrink-0 text-[11px] uppercase tracking-wide">Assignee</span>
                <span className="truncate">{t.assignee ?? "-"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-16 shrink-0 text-[11px] uppercase tracking-wide">Due</span>
                <span>{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "-"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-16 shrink-0 text-[11px] uppercase tracking-wide">ID</span>
                <span className="truncate">{t.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
