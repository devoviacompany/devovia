"use client";

import { useEffect, useRef, useState } from "react";
import { AlignLeft, AlignCenter, AlignRight, Pin } from "lucide-react";

export type NodeToolbarProps = {
  selected: boolean;
  editing: boolean;
  pinned: boolean;
  onTogglePinned: (next: boolean) => void;

  // values
  font: string;
  color: string;
  bg: string;
  align: "start" | "center" | "end";
  fontSize: number;
  fontWeight: number;

  // called on any change (persist in parent)
  commit: (patch: Partial<{
    font: string;
    color: string;
    bg: string;
    align: "start" | "center" | "end";
    fontSize: number;
    fontWeight: number;
    pinned: boolean;
  }>) => void;
};

export default function NodeToolbar(props: NodeToolbarProps) {
  const { selected, editing, pinned, onTogglePinned, font, color, bg, align, fontSize, fontWeight, commit } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [openFont, setOpenFont] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [openWeight, setOpenWeight] = useState(false);
  const [openTxtColor, setOpenTxtColor] = useState(false);
  const [openBgColor, setOpenBgColor] = useState(false);

  useEffect(() => {
    const onDocDown = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setOpenFont(false);
        setOpenSize(false);
        setOpenWeight(false);
        setOpenTxtColor(false);
        setOpenBgColor(false);
      }
    };
    document.addEventListener("mousedown", onDocDown, true);
    return () => document.removeEventListener("mousedown", onDocDown, true);
  }, []);

  if (!(selected || editing || pinned)) return null;

  return (
    <div
      ref={ref}
      onMouseDown={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      className="absolute z-50 flex items-center justify-center gap-2 rounded-xl border bg-background/95 p-2 text-xs shadow-lg backdrop-blur pointer-events-auto"
      style={{ width: 370, height: 40, left: "50%", transform: "translateX(-50%)", top: -50 }}
    >
      {/* Font */}
      <div className="relative" onMouseDown={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="h-7 rounded-md border bg-card px-2 text-foreground hover:bg-accent/30"
          onClick={() => setOpenFont((v) => !v)}
        >
          {font.startsWith("Inter") ? "Inter" : font.startsWith("Roboto") ? "Roboto" : font.includes("mono") ? "Mono" : "System"}
        </button>
        {openFont ? (
          <div className="absolute left-0 top-9 z-50 min-w-[160px] overflow-hidden rounded-md border bg-popover p-1 shadow-xl" onMouseDown={(e) => e.stopPropagation()}>
            {[
              { k: "System", v: "system-ui" },
              { k: "Inter", v: "Inter, system-ui, sans-serif" },
              { k: "Roboto", v: "Roboto, system-ui, sans-serif" },
              { k: "Mono", v: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace" },
            ].map((opt) => (
              <button
                key={opt.k}
                className={`block w-full rounded px-2 py-1 text-left hover:bg-accent ${font === opt.v ? "bg-accent" : ""}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  commit({ font: opt.v });
                  setOpenFont(false);
                }}
              >
                {opt.k}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Text color */}
      <div className="relative" onMouseDown={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="h-7 w-7 rounded-md border shadow-sm"
          style={{ backgroundColor: color }}
          onClick={() => setOpenTxtColor((v) => !v)}
          title="Text color"
        />
        {openTxtColor ? (
          <div className="absolute left-0 top-9 z-50 rounded-md border bg-popover p-2 shadow-xl" onMouseDown={(e) => e.stopPropagation()}>
            <div className="grid grid-cols-8 gap-1">
              {["#111827","#EF4444","#F59E0B","#10B981","#3B82F6","#8B5CF6","#EC4899","#6B7280"].map((c) => (
                <button
                  key={c}
                  type="button"
                  className="h-5 w-5 rounded border"
                  style={{ backgroundColor: c }}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => { commit({ color: c }); setOpenTxtColor(false); }}
                />
              ))}
            </div>
            <div className="mt-2">
              <input type="color" value={color} onChange={(e) => commit({ color: e.target.value })} />
            </div>
          </div>
        ) : null}
      </div>

      {/* Background color */}
      <div className="relative" onMouseDown={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="h-7 w-7 rounded-md border shadow-sm"
          style={{ backgroundColor: bg }}
          onClick={() => setOpenBgColor((v) => !v)}
          title="Background"
        />
        {openBgColor ? (
          <div className="absolute left-0 top-9 z-50 rounded-md border bg-popover p-2 shadow-xl" onMouseDown={(e) => e.stopPropagation()}>
            <div className="grid grid-cols-8 gap-1">
              {["#FEF08A","#FDE68A","#FCA5A5","#A7F3D0","#93C5FD","#C7D2FE","#FBCFE8","#E5E7EB"].map((c) => (
                <button
                  key={c}
                  type="button"
                  className="h-5 w-5 rounded border"
                  style={{ backgroundColor: c }}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => { commit({ bg: c }); setOpenBgColor(false); }}
                />
              ))}
            </div>
            <div className="mt-2">
              <input type="color" value={bg} onChange={(e) => commit({ bg: e.target.value })} />
            </div>
          </div>
        ) : null}
      </div>

      {/* Align */}
      <div className="ml-1 flex items-center gap-1">
        <button type="button" className={`rounded p-1 ${align === "start" ? "bg-accent" : ""}`} onClick={() => commit({ align: "start" })} title="Align start">
          <AlignLeft className="h-3.5 w-3.5" />
        </button>
        <button type="button" className={`rounded p-1 ${align === "center" ? "bg-accent" : ""}`} onClick={() => commit({ align: "center" })} title="Align center">
          <AlignCenter className="h-3.5 w-3.5" />
        </button>
        <button type="button" className={`rounded p-1 ${align === "end" ? "bg-accent" : ""}`} onClick={() => commit({ align: "end" })} title="Align end">
          <AlignRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Font size */}
      <div className="relative" onMouseDown={(e) => e.stopPropagation()}>
        <button type="button" className="h-7 rounded-md border bg-card px-2 text-foreground hover:bg-accent/30" onClick={() => setOpenSize((v) => !v)}>
          {fontSize}px
        </button>
        {openSize ? (
          <div className="absolute left-0 top-9 z-50 rounded-md border bg-popover p-1 shadow-xl" onMouseDown={(e) => e.stopPropagation()}>
            {[12,14,16,18,20,24,28,32,36,40,48,56,64].map((n) => (
              <button
                key={n}
                className={`block w-full rounded px-2 py-1 text-left hover:bg-accent ${fontSize === n ? "bg-accent" : ""}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { commit({ fontSize: n }); setOpenSize(false); }}
              >
                {n}px
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Font weight */}
      <div className="relative" onMouseDown={(e) => e.stopPropagation()}>
        <button type="button" className="h-7 rounded-md border bg-card px-2 text-foreground hover:bg-accent/30" onClick={() => setOpenWeight((v) => !v)}>
          {fontWeight}
        </button>
        {openWeight ? (
          <div className="absolute left-0 top-9 z-50 rounded-md border bg-popover p-1 shadow-xl" onMouseDown={(e) => e.stopPropagation()}>
            {[400,500,600,700,800].map((n) => (
              <button
                key={n}
                className={`block w-full rounded px-2 py-1 text-left hover:bg-accent ${fontWeight === n ? "bg-accent" : ""}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { commit({ fontWeight: n }); setOpenWeight(false); }}
              >
                {n}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Pin */}
      <button type="button" className={`rounded p-1 ${pinned ? "bg-accent" : ""}`} onClick={() => onTogglePinned(!pinned)} title={pinned ? "Unpin toolbar" : "Pin toolbar"}>
        <Pin className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}