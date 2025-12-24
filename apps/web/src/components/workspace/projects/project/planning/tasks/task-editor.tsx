"use client";

import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Task, Column, TaskStatus } from "@/types/api/builder/planning/tasks/tasks.type";

export default function TaskEditor({
  open,
  task,
  columns,
  onClose,
  onSave,
}: {
  open: boolean;
  task?: Task;
  columns: Column[];
  onClose: () => void;
  onSave: (next: Task) => void;
}) {
  const [draft, setDraft] = useState<Task | undefined>(task);

  useEffect(() => setDraft(task), [task]);

  const statuses = useMemo(() => columns.map((c) => ({ id: c.id, name: c.name })), [columns]);

  if (!draft) return null;

  const set = <K extends keyof Task>(k: K, v: Task[K]) => setDraft({ ...draft, [k]: v });

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : undefined)}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Title</label>
            <Input value={draft.title} onChange={(e) => set("title", e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Description</label>
            <Textarea rows={4} value={draft.description ?? ""} onChange={(e) => set("description", e.target.value)} />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Assignee</label>
              <Input placeholder="Name" value={draft.assignee ?? ""} onChange={(e) => set("assignee", e.target.value || undefined)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Due date</label>
              <Input type="date" value={draft.dueDate ? draft.dueDate.substring(0, 10) : ""} onChange={(e) => set("dueDate", e.target.value || undefined)} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Status</label>
              <Select value={draft.status} onValueChange={(v: TaskStatus) => set("status", v)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Priority</label>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Select value={draft.priority ?? ""} onValueChange={(v: any) => set("priority", v as any)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Priority" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" className="rounded-[10px]" onClick={onClose}>Cancel</Button>
            <Button className="rounded-[10px]" onClick={() => onSave(draft)}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
