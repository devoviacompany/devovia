/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { NodeProps } from "@xyflow/react";
import { useReactFlow } from "@xyflow/react";
import { useEffect, useState, useRef } from "react";
import NodeToolbar from "../tools/node-toolbar";

export default function TextNode({ id, data, selected }: NodeProps<any>) {
  const rf = useReactFlow();
  const [text, setText] = useState<string>(data?.text ?? "Title");
  const [font, setFont] = useState<string>(data?.font ?? "system-ui");
  const [color, setColor] = useState<string>(data?.color ?? "#111827");
  const [bg, setBg] = useState<string>(data?.bg ?? "transparent");
  const [align, setAlign] = useState<"start" | "center" | "end">(data?.align ?? "start");
  const [fontSize, setFontSize] = useState<number>(data?.fontSize ?? 20);
  const [fontWeight, setFontWeight] = useState<number>(data?.fontWeight ?? 600);
  const [pinned, setPinned] = useState<boolean>(data?.pinned ?? false);
  const [editing, setEditing] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setText(data?.text ?? "Title");
    if (data?.font) setFont(data.font);
    if (data?.color) setColor(data.color);
    if (data?.bg) setBg(data.bg);
    if (data?.align) setAlign(data.align);
    if (typeof data?.fontSize === "number") setFontSize(data.fontSize);
    if (typeof data?.fontWeight === "number") setFontWeight(data.fontWeight);
    if (typeof data?.pinned === "boolean") setPinned(data.pinned);
  }, [data?.text, data?.font, data?.color, data?.bg, data?.align, data?.fontSize, data?.fontWeight, data?.pinned]);

  useEffect(() => {
    if (textareaRef.current) {
      const ta = textareaRef.current;
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    }
  }, [text, font, align, fontSize, fontWeight]);

  const commit = (next?: Partial<{ text: string; font: string; color: string; bg: string; align: "start" | "center" | "end"; fontSize: number; fontWeight: number; pinned: boolean }>) => {
    const payload = { text, font, color, bg, align, fontSize, fontWeight, pinned, ...next };
    rf.setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...payload } } : n)));
  };

  return (
    <div
      className={`p-2 group min-w-[120px] max-w-[420px] ${selected ? "border-2 border-primary-500 border-dashed" : ""}`}
      style={{
        borderRadius: "5px",
        cursor: "move",
      }}
    >
      {/* Top drag handle */}
      <div
        className={`text-node-drag absolute -top-4 left-1/2 -translate-x-1/2 h-2 w-2 cursor-move rounded-full bg-primary-500 ${selected ? "visible" : "invisible"}`}
        onMouseDown={(e) => e.stopPropagation()}
      />
      {/* Shared toolbar above title */}
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
      {/* Display text when not editing; double-click to edit */}
      {!editing ? (
        <div
          onDoubleClick={(e) => {
            e.stopPropagation();
            setEditing(true);
            setTimeout(() => {
              const ta = textareaRef.current;
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
          ref={textareaRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (textareaRef.current) {
              textareaRef.current.style.height = "auto";
              textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
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
