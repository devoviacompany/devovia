"use client";

export type NodeResizeHandlesProps = {
  selected: boolean;
  onStartResize: (e: React.MouseEvent, dir: "nw" | "ne" | "sw" | "se") => void;
};

export default function NodeResizeHandles({ selected, onStartResize }: NodeResizeHandlesProps) {
  if (!selected) return null;
  return (
    <>
      <div onMouseDown={(e) => onStartResize(e, "nw")} className="absolute -left-1 -top-1 z-10 h-3 w-3 cursor-nwse-resize rounded-sm border border-primary bg-background" />
      <div onMouseDown={(e) => onStartResize(e, "ne")} className="absolute -right-1 -top-1 z-10 h-3 w-3 cursor-nesw-resize rounded-sm border border-primary bg-background" />
      <div onMouseDown={(e) => onStartResize(e, "sw")} className="absolute -left-1 -bottom-1 z-10 h-3 w-3 cursor-nesw-resize rounded-sm border border-primary bg-background" />
      <div onMouseDown={(e) => onStartResize(e, "se")} className="absolute -right-1 -bottom-1 z-10 h-3 w-3 cursor-nwse-resize rounded-sm border border-primary bg-background" />
    </>
  );
}