/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { NodeProps } from "@xyflow/react";
import { useReactFlow, Handle, Position } from "@xyflow/react";
import { useEffect, useState, useRef } from "react";

export default function DatabaseNode({ id, data }: NodeProps<any>) {
  const rf = useReactFlow();
  const [label, setLabel] = useState<string>(data?.label ?? "DB");
  const [editing, setEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLabel(data?.label ?? "DB");
  }, [data?.label]);

  const commit = () => {
    rf.setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, label } } : n)));
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="flex items-center justify-center border shadow-sm"
        style={{
          width: 140,
          height: 140,
          borderRadius: 9999,
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <Handle type="target" position={Position.Top} className="!w-1 !h-1" />
        <Handle type="target" position={Position.Left} className="!w-1 !h-1" />
        <Handle type="source" position={Position.Right} className="!w-1 !h-1" />
        <Handle type="source" position={Position.Bottom} className="!w-1 !h-1" />
        {!editing ? (
          <div
            onDoubleClick={(e) => {
              e.stopPropagation();
              setEditing(true);
              setTimeout(() => inputRef.current?.focus(), 0);
            }}
            className="w-24 bg-transparent text-sm font-medium text-center outline-none cursor-text"
          >
            {label}
          </div>
        ) : (
          <input
            ref={inputRef}
            className="w-24 bg-transparent text-sm font-medium text-center outline-none"
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
    </div>
  );
}
