export type TaskStatus = string; // dynamic column id

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus; // references Column.id
  assignee?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string; // ISO date
};

export type Column = {
  id: string;
  name: string;
  icon?: string; // emoji or short label
};
