/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  ConnectionMode,
  ConnectionLineType,
  addEdge,
  useEdgesState,
  useNodesState,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { cn } from "@/utils/functions";
import { DND_TYPE, ShapeKind } from "@/types/api/builder/planning/canvas/canvas.type";
import NoteNode from "./nodes/note-node";
import FrontendNode from "./nodes/frontend-node";
import EndpointNode from "./nodes/endpoint-node";
import DatabaseNode from "./nodes/database-node";
import TextNode from "./nodes/text-node";
import Toolbar, { type Tool } from "./toolbar";
import ShapesSidebar from "./shapes-sidebar";
import ZoomToolbar from "./tools/zoom-toolbar";
import HistoryPill from "./tools/history-toolbar";

// local style presets for simple shapes

type CanvasProps = {
  className?: string;
  showGrid?: boolean;
};

function InnerCanvas({ className, showGrid = false }: CanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([] as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([] as Edge[]);
  const { screenToFlowPosition } = useReactFlow();

  const [tool, setTool] = useState<Tool>("select");
  const [shapesOpen, setShapesOpen] = useState(false);

  // history for undo/redo
  /*eslint-disable-next-line-unused-vars*/
  const [history, setHistory] = useState<Array<{ nodes: Node[]; edges: Edge[] }>>([]);
  /*eslint-disable-next-line-unused-vars*/
  const [future, setFuture] = useState<Array<{ nodes: Node[]; edges: Edge[] }>>([]);
  const nodesRef = React.useRef(nodes);
  const edgesRef = React.useRef(edges);
  React.useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);
  React.useEffect(() => {
    edgesRef.current = edges;
  }, [edges]);
  const recordBeforeChange = React.useCallback(() => {
    setHistory((h) => [...h, { nodes: nodesRef.current, edges: edgesRef.current }]);
    setFuture([]);
  }, []);
  const applySnapshot = React.useCallback((snap: { nodes: Node[]; edges: Edge[] }) => {
    setNodes(snap.nodes);
    setEdges(snap.edges);
  }, [setNodes, setEdges]);
  const undo = React.useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const last = h[h.length - 1];
      setFuture((f) => [{ nodes: nodesRef.current, edges: edgesRef.current }, ...f]);
      applySnapshot(last!);
      return h.slice(0, -1);
    });
  }, [applySnapshot]);
  const redo = React.useCallback(() => {
    setFuture((f) => {
      if (f.length === 0) return f;
      const [next, ...rest] = f;
      setHistory((h) => [...h, { nodes: nodesRef.current, edges: edgesRef.current }]);
      applySnapshot(next!);
      return rest;
    });
  }, [applySnapshot]);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      recordBeforeChange();
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges, recordBeforeChange]
  );

  // Delete selected nodes/edges with Delete/Backspace (ignore when typing)
  React.useEffect(() => {
    const isEditableTarget = (el: EventTarget | null) => {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea") return true;
      if ((el as HTMLElement).isContentEditable) return true;
      return false;
    };

    const onKeyDownDelete = (e: KeyboardEvent) => {
      if (e.key !== "Delete" && e.key !== "Backspace") return;
      if (isEditableTarget(e.target)) return;
      // Only allow delete in Select mode
      if (tool !== "select") return;
      recordBeforeChange();
      setNodes((nds) => nds.filter((n) => !n.selected));
      setEdges((eds) => eds.filter((ed) => !ed.selected));
    };

    window.addEventListener("keydown", onKeyDownDelete);
    return () => window.removeEventListener("keydown", onKeyDownDelete);
  }, [setNodes, setEdges, tool, recordBeforeChange]);

  // Numeric hotkeys 1–4 to switch tools (ignore when typing) + Undo/Redo (Ctrl+Z / Ctrl+Shift+Z / Ctrl+Y)
  React.useEffect(() => {
    const isEditableTarget = (el: EventTarget | null) => {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea") return true;
      if ((el as HTMLElement).isContentEditable) return true;
      return false;
    };

    const onKeyDownGlobal = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) return;
      const key = e.key.toLowerCase();
      const mod = e.ctrlKey || e.metaKey;

      // Select All
      if (mod && key === "a") {
        e.preventDefault();
        setNodes((nds) => nds.map((n) => ({ ...n, selected: true })));
        setEdges((eds) => eds.map((ed) => ({ ...ed, selected: true })));
        return;
      }

      // Undo / Redo
      if (mod && key === "z") {
        e.preventDefault();
        if (e.shiftKey) redo(); else undo();
        return;
      }
      if (mod && key === "y") {
        e.preventDefault();
        redo();
        return;
      }

      // Tool switching
      switch (e.key) {
        case "1":
          setTool("select");
          setShapesOpen(false);
          break;
        case "2":
          setTool("pan");
          setShapesOpen(false);
          break;
        case "3":
          setTool("pen");
          setShapesOpen(false);
          break;
        case "4":
          setTool("shapes");
          setShapesOpen(true);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDownGlobal);
    return () => window.removeEventListener("keydown", onKeyDownGlobal);
  }, [setTool, undo, redo, setNodes, setEdges]);

  const nodeStyles = useMemo(
    () => ({
      frontend: {
        borderRadius: 12,
        padding: 12,
        width: 180,
        background: "var(--card)",
        border: "1px solid var(--border)",
      },
      endpoint: {
        padding: 12,
        width: 160,
        transform: "rotate(45deg)",
        background: "var(--card)",
        border: "1px solid var(--border)",
      },
      database: {
        padding: 12,
        width: 140,
        height: 140,
        borderRadius: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--card)",
        border: "1px solid var(--border)",
      },
      note: {},
      text: {
        background: "transparent",
        border: "none",
        padding: 0,
      },
    }),
    []
  );

  const renderLabel = (type: ShapeKind, label: string) => {
    if (type === "endpoint") {
      return (
        <div style={{ transform: "rotate(-45deg)" }} className="text-center">
          {label}
        </div>
      );
    }
    return <div className="text-center">{label}</div>;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createNode = (type: ShapeKind, position: { x: number; y: number }) => {
    const id = crypto.randomUUID();
    let node: Node;
    if (type === "note") {
      node = {
        id,
        type: "note",
        position,
        dragHandle: ".note-frame",
        data: { text: "Notes" },
      } as Node;
    } else if (type === "text") {
      node = {
        id,
        type: "text",
        position,
        data: { text: "Title" },
      } as Node;
    } else {
      const nodeType = type === "frontend" ? "frontend" : type === "endpoint" ? "endpoint" : type === "database" ? "database" : "default";
      node = {
        id,
        type: nodeType,
        position,
        data: { label: labelFor(type) },
        style: nodeType === "default" ? nodeStyles[type] : undefined,
      } as Node;
    }
    setNodes((nds) => nds.concat(node));
  };

  const labelFor = (type: ShapeKind) => {
    switch (type) {
      case "frontend":
        return "Frontend";
      case "endpoint":
        return "API";
      case "database":
        return "DB";
      default:
        return "";
    }
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const raw = event.dataTransfer.getData(DND_TYPE);
      if (!raw) return;
      const kind = JSON.parse(raw) as { type: ShapeKind };
      const pos = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      recordBeforeChange();
      createNode(kind.type, pos);
    },
    [screenToFlowPosition, recordBeforeChange, createNode]
  );

  // wrap React Flow change handlers to record snapshots before change
  const handleNodesChange = useCallback((changes: any) => {
    recordBeforeChange();
    onNodesChange(changes);
  }, [onNodesChange, recordBeforeChange]);
  const handleEdgesChange = useCallback((changes: any) => {
    recordBeforeChange();
    onEdgesChange(changes);
  }, [onEdgesChange, recordBeforeChange]);

  return (
    <div className={cn("relative mx-auto flex h-full w-full max-w-6xl flex-col gap-4 px-1 pt-16 md:px-4", className)}>
      <style jsx global>{`
        .react-flow__attribution { display: none !important; }
      `}</style>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        fitView
        onDrop={onDrop}
        onDragOver={onDragOver}
        panOnScroll={tool === "pan"}
        panOnDrag={tool === "pan"}
        selectionOnDrag={tool === "select"}
        nodeTypes={{
          note: NoteNode as any,
          frontend: FrontendNode as any,
          endpoint: EndpointNode as any,
          database: DatabaseNode as any,
          text: TextNode as any,
        }}
        connectionMode={ConnectionMode.Strict}
        defaultEdgeOptions={{ animated: true }}
        connectionLineType={ConnectionLineType.SmoothStep}
      >
        {/* {showGrid ? (
          <Background variant={BackgroundVariant.Dots} gap={15} color="rgba(120,120,120,0.8)" />
        ) : null} */}
        {/* <MiniMap pannable zoomable /> */}
        {/* <Controls showFitView showInteractive /> */}
      </ReactFlow>

      <div className="bottom-4 w-full flex items-center justify-between z-20">
        <HistoryPill />
        <Toolbar
          tool={tool}
          onChangeTool={(t: Tool) => {
            if (t === "shapes") setShapesOpen(true);
            else setShapesOpen(false);
            setTool(t);
          }}
          // className="absolute left-1/2 z-20 -translate-x-1/2"
        />
        <ZoomToolbar />
      </div>
      {/* Shapes sidebar (no overlay to preserve DnD) */}
      {shapesOpen ? (
        <div className="absolute right-5 top-50 z-30 w-72 rounded-lg border bg-background p-3 shadow">
          <div className="mb-2 text-sm font-semibold">Shapes</div>
          <ShapesSidebar />
        </div>
      ) : null}
    </div>
  );
}

export default function ProjectCanvas(props: CanvasProps) {
  return (
    <ReactFlowProvider>
      <InnerCanvas {...props} />
    </ReactFlowProvider>
  );
}
