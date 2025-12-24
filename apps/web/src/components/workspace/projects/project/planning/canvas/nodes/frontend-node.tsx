/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { NodeProps } from "@xyflow/react";
import { useReactFlow, Handle, Position } from "@xyflow/react";
import { useEffect, useState, useRef } from "react";

export default function FrontendNode({ id, data }: NodeProps<any>) {
  const rf = useReactFlow();
  const [label, setLabel] = useState<string>(data?.label ?? "Frontend");
  const [editing, setEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLabel(data?.label ?? "Frontend");
  }, [data?.label]);

  const commit = () => {
    rf.setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, label } } : n)));
  };

  return (
    <div
      style={{
        width: 180,
        height: 120,
        padding: 12,
        borderRadius: 12,
        border: "1px solid var(--border)",
        background: "var(--card)",
      }}
      className="flex items-center justify-center border shadow-sm"
    >
      <Handle type="target" position={Position.Top} className="!w-1 !h-1" />
      <Handle type="target" position={Position.Left} className="!w-1 !h-1" />
      <Handle type="source" position={Position.Right} className="!w-1 !h-1" />
      <Handle type="source" position={Position.Bottom} className="!w-1 !h-1" />
      {/* Display label by default; double-click to edit */}
      {!editing ? (
        <div
          onDoubleClick={(e) => {
            e.stopPropagation();
            setEditing(true);
            setTimeout(() => inputRef.current?.focus(), 0);
          }}
          className="w-full bg-transparent text-sm text-center font-medium outline-none cursor-text"
        >
          {label}
        </div>
      ) : (
        <input
          ref={inputRef}
          className="w-full bg-transparent text-sm text-center font-medium outline-none"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={() => {
            commit();
            setEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") {
              (e.target as HTMLInputElement).blur();
              setEditing(false);
            }
          }}
          onMouseDown={(e) => e.stopPropagation()}
        />
      )}
    </div>
  );
}
