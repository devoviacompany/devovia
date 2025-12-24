/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { NodeProps } from "@xyflow/react";
import { useReactFlow, Handle, Position } from "@xyflow/react";
import { useEffect, useState, useRef } from "react";

export default function EndpointNode({ id, data }: NodeProps<any>) {
  const rf = useReactFlow();
  const [label, setLabel] = useState<string>(data?.label ?? "API");
  const [editing, setEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLabel(data?.label ?? "API");
  }, [data?.label]);

  const commit = () => {
    rf.setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, label } } : n)));
  };

  return (
    <div className="text-center" style={{ width: 160 }}>
      <div
        className="inline-flex items-center justify-center border shadow-sm"
        style={{
          width: 120,
          height: 120,
          transform: "rotate(45deg)",
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <Handle type="target" position={Position.Top} className="!w-1 !h-1" />
        <Handle type="target" position={Position.Left} className="!w-1 !h-1" />
        <Handle type="source" position={Position.Right} className="!w-1 !h-1" />
        <Handle type="source" position={Position.Bottom} className="!w-1 !h-1" />
        <div style={{ transform: "rotate(-45deg)", width: 100 }}>
          {editing ? (
            <input
              className="w-full bg-transparent text-sm font-medium text-center outline-none"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onBlur={commit}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Escape") {
                  commit();
                  setEditing(false);
                }
              }}
              autoFocus
              ref={inputRef}
            />
          ) : (
            <span
              className="w-full text-sm font-medium text-center"
              onDoubleClick={() => setEditing(true)}
            >
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
