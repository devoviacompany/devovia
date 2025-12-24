"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import KanbanBoard from "./kanban/kanban-board";
import TableView from "./table/table-view";
import TaskEditor from "./task-editor";
import type { Task, TaskStatus, Column } from "@/types/api/builder/planning/tasks/tasks.type";

const uid = () => Math.random().toString(36).slice(2, 9);

export default function ProjectTasks() {
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const [columns, setColumns] = useState<Column[]>([
    { id: "backlog", name: "Backlog", icon: "🚀" },
    { id: "todo", name: "To do", icon: "📝" },
    { id: "in_progress", name: "In progress", icon: "🏗️" },
    { id: "done", name: "Done", icon: "✅" },
  ]);
  const [tasks, setTasks] = useState<Task[]>(() => [
    { id: "t1", title: "Define scope", status: "backlog", priority: "high", assignee: "Ahmed" },
    { id: "t2", title: "Wireframes", status: "todo", priority: "medium", assignee: "Sara" },
    { id: "t3", title: "Build canvas", status: "in_progress", priority: "high", assignee: "Omar" },
    { id: "t4", title: "QA & fixes", status: "done", priority: "low", assignee: "Lina" },
    { id: "t5", title: "Docs", status: "todo", priority: "low" },
  ]);

  const onMove = (taskId: string, to: TaskStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: to } : t)));
  };
  const onAssign = (taskId: string, assignee?: string) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, assignee } : t)));
  };

  const addColumn = () => {
    const id = uid();
    setColumns((prev) => [...prev, { id, name: "New Column", icon: "📌" }]);
  };
  const renameColumn = (id: string, name: string) => {
    setColumns((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
  };
  const setColumnIcon = (id: string, icon: string) => {
    setColumns((prev) => prev.map((c) => (c.id === id ? { ...c, icon } : c)));
  };

  const ordered = useMemo(() => tasks, [tasks]);

  const [editorOpen, setEditorOpen] = useState(false);
  const [selected, setSelected] = useState<Task | undefined>();
  const openEditor = (taskId: string) => {
    const t = tasks.find((x) => x.id === taskId);
    if (t) {
      setSelected(t);
      setEditorOpen(true);
    }
  };
  const closeEditor = () => setEditorOpen(false);
  const saveTask = (next: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === next.id ? next : t)));
    setEditorOpen(false);
  };

  return (
    <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col gap-4 px-1 pt-16 md:px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Project Tasks</h2>
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Tabs value={view} onValueChange={(v) => setView(v as any)}>
            <TabsList className="rounded-[10px]">
              <TabsTrigger value="kanban" className="cursor-pointer">Kanban</TabsTrigger>
              <TabsTrigger value="table" className="cursor-pointer">Table</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button className="rounded-[10px]" variant="outline" onClick={() => {
            const n: Task = { id: uid(), title: "New task", status: columns[0]?.id ?? "backlog" };
            setTasks((prev) => [n, ...prev]);
          }}>Add Task</Button>
          <Button className="rounded-[10px]" variant="outline" onClick={addColumn}>Add Column</Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        {view === "kanban" ? (
          <KanbanBoard
            columns={columns}
            tasks={ordered}
            onMove={onMove}
            onRenameColumn={renameColumn}
            onSetColumnIcon={setColumnIcon}
            onAssign={onAssign}
            onOpenTask={openEditor}
          />
        ) : (
          <TableView tasks={ordered} onOpenTask={openEditor} />
        )}
      </div>

      <TaskEditor
        open={editorOpen}
        task={selected}
        columns={columns}
        onClose={closeEditor}
        onSave={saveTask}
      />
    </div>
  );
}