export const DND_TYPE = "application/reactflow" as const;

export type ShapeKind = "frontend" | "endpoint" | "database" | "note" | "text";

export type BaseNodeData = {
  label?: string;
};

export type NoteNodeData = BaseNodeData & {
  text?: string;
};
