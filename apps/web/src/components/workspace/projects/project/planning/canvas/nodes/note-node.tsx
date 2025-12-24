/* eslint-disable react-hooks/exhaustive-deps */ 
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import type { NodeProps } from "@xyflow/react";
import { useReactFlow } from "@xyflow/react";
import { cn } from "@/utils/functions";
import NodeToolbar from "../tools/node-toolbar";
import NodeResizeHandles from "../tools/node-resize-handles";

export default function NoteNode({ id, data, selected }: NodeProps<any>) {
  const rf = useReactFlow();
  const [text, setText] = useState<string>(data?.text ?? "Notes");
  const [font, setFont] = useState<string>(data?.font ?? "system-ui");
  const [color, setColor] = useState<string>(data?.color ?? "#111827");
  const [bg, setBg] = useState<string>(data?.bg ?? "#FEF08A"); // default yellow-200
  const [align, setAlign] = useState<"start" | "center" | "end">(data?.align ?? "start");
  const [editing, setEditing] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(data?.width ?? 320);
  const [height, setHeight] = useState<number>(data?.height ?? 160);
  const [fontSize, setFontSize] = useState<number>(data?.fontSize ?? 18);
  const [fontWeight, setFontWeight] = useState<number>(data?.fontWeight ?? 600);
  const [pinned, setPinned] = useState<boolean>(data?.pinned ?? false);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const resizingRef = useRef<{ startX: number; startY: number; startW: number; startH: number; dir: "nw" | "ne" | "sw" | "se" } | null>(null);

  useEffect(() => {
    setText(data?.text ?? "Notes");
    if (data?.font) setFont(data.font);
    if (data?.color) setColor(data.color);
    if (data?.bg) setBg(data.bg);
    if (data?.align) setAlign(data.align);
    if (typeof data?.width === "number") setWidth(data.width);
    if (typeof data?.height === "number") setHeight(data.height);
    if (typeof data?.fontSize === "number") setFontSize(data.fontSize);
    if (typeof data?.fontWeight === "number") setFontWeight(data.fontWeight);
    if (typeof data?.pinned === "boolean") setPinned(data.pinned);
     
  }, [data?.text, data?.font, data?.color, data?.bg, data?.align, data?.width, data?.height, data?.fontSize, data?.fontWeight, data?.pinned]);

  useEffect(() => {
    if (!taRef.current) return;
    const el = taRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [text, font, align, width]);


  const commit = (next?: Partial<{ text: string; font: string; color: string; bg: string; align: "start" | "center" | "end"; width: number; height: number; fontSize: number; fontWeight: number; pinned: boolean }>) => {
    const payload = { text, font, color, bg, align, width, height, fontSize, fontWeight, pinned, ...next };
    rf.setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...payload } } : n)));
  };

  const startResize = (e: React.MouseEvent, dir: "nw" | "ne" | "sw" | "se") => {
    e.preventDefault();
    e.stopPropagation();
    resizingRef.current = { startX: e.clientX, startY: e.clientY, startW: width, startH: height, dir };
    // lock cursor and text selection during resize
    document.body.style.cursor = dir === "nw" || dir === "se" ? "nwse-resize" : "nesw-resize";
    (document.body.style as any).userSelect = "none";
    window.addEventListener("mousemove", onResizing);
    window.addEventListener("mouseup", stopResize);
  };
  const onResizing = (e: MouseEvent) => {
    const ctx = resizingRef.current;
    if (!ctx) return;
    const dx = e.clientX - ctx.startX;
    const dy = e.clientY - ctx.startY;
    // Anchor at top-left for simplicity
    const sx = ctx.dir.includes("w") ? -1 : 1;
    const sy = ctx.dir.includes("n") ? -1 : 1;
    const nextW = Math.min(1000, Math.max(200, ctx.startW + sx * dx));
    const nextH = Math.min(800, Math.max(120, ctx.startH + sy * dy));
    setWidth(nextW);
    setHeight(nextH);
  };
  const stopResize = () => {
    if (!resizingRef.current) return;
    window.removeEventListener("mousemove", onResizing);
    window.removeEventListener("mouseup", stopResize);
    // restore cursor and selection
    document.body.style.cursor = "";
    (document.body.style as any).userSelect = "";
    commit({ width, height });
    resizingRef.current = null;
  };

  // cleanup if component unmounts mid-resize
  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", onResizing);
      window.removeEventListener("mouseup", stopResize);
      document.body.style.cursor = "";
      (document.body.style as any).userSelect = "";
    };
  }, []);

  return (
    <div
      className={cn(
        "note-frame group relative rounded-[10px]",
        selected ? "border-2 border-primary-500 border-dashed" : "border border-transparent"
      )}
      style={{ background: bg, width, minHeight: height }}
    >
      <NodeResizeHandles selected={!!selected} onStartResize={startResize} />
      {/* Top drag handle */}
      <div
        className={cn(
          "note-node-drag absolute -top-4 left-1/2 -translate-x-1/2 h-2 w-2 cursor-move rounded-full",
          selected ? "bg-primary-500" : "bg-muted"
        )}
        onMouseDown={(e) => e.stopPropagation()}
      />

      <NodeToolbar
        selected={!!selected}
        editing={!!editing}
        pinned={!!pinned}
        onTogglePinned={(next) => { setPinned(next); commit({ pinned: next }); }}
        font={font}
        color={color}
        bg={bg}
        align={align}
        fontSize={fontSize}
        fontWeight={fontWeight}
        commit={(patch) => {
          if (patch.font !== undefined) setFont(patch.font);
          if (patch.color !== undefined) setColor(patch.color);
          if (patch.bg !== undefined) setBg(patch.bg);
          if (patch.align !== undefined) setAlign(patch.align);
          if (patch.fontSize !== undefined) setFontSize(patch.fontSize);
          if (patch.fontWeight !== undefined) setFontWeight(patch.fontWeight);
          if (patch.pinned !== undefined) setPinned(patch.pinned);
          commit(patch);
        }}
      />

      {/* Display when not editing; double-click to edit */}
      {!editing ? (
        <div
          onDoubleClick={(e) => {
            e.stopPropagation();
            setEditing(true);
            setTimeout(() => {
              const ta = taRef.current;
              if (ta) {
                ta.style.height = "auto";
                ta.style.height = ta.scrollHeight + "px";
                ta.focus();
                const len = text.length;
                try { ta.setSelectionRange(len, len); } catch { }
              }
            }, 0);
          }}
          className="w-full p-2"
          style={{
            fontFamily: font,
            color,
            textAlign: align === "start" ? "left" : align === "center" ? "center" : "right",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            cursor: "text",
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight as any,
          }}
        >
          {text}
        </div>
      ) : (
        <textarea
          ref={taRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (taRef.current) {
              taRef.current.style.height = "auto";
              taRef.current.style.height = taRef.current.scrollHeight + "px";
            }
          }}
          onBlur={() => {
            commit();
            setEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setEditing(false);
              (e.target as HTMLTextAreaElement).blur();
            }
          }}
          onMouseDown={(e) => e.stopPropagation()}
          className="w-full resize-none bg-transparent p-2 outline-none"
          style={{
            fontFamily: font,
            color,
            textAlign: align === "start" ? "left" : align === "center" ? "center" : "right",
            overflow: "hidden",
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight as any,
          }}
          rows={1}
        />
      )}
    </div>
  );
}
