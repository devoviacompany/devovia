"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/utils/functions"

type TerminalVariant = "command" | "info" | "success" | "error" | "dim"

type TerminalLine = {
  id: string
  text: string
  variant?: TerminalVariant
}

const INITIAL_LINES: TerminalLine[] = []

const createLineId = () => {
  return `line-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export const CodeTerminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES)
  const promptRef = useRef<HTMLSpanElement | null>(null)

  const handleCommand = (raw: string) => {
    const command = raw.trim()
    if (!command) return

    const commandLine: TerminalLine = {
      id: createLineId(),
      text: `~/project % ${command}`,
      variant: "command",
    }

    // Handle a few fake commands to make it feel real
    if (command === "clear") {
      setLines([])
      return
    }

    let response: TerminalLine[]

    if (command === "npm run dev") {
      response = [
        {
          id: createLineId(),
          text: "ready  - started server on 0.0.0.0:3000, url: http://localhost:3000",
          variant: "success",
        },
        {
          id: createLineId(),
          text: "info   - watching for file changes in apps/web",
          variant: "info",
        },
        {
          id: createLineId(),
          text: "tip    - press r to restart or q to quit (simulated)",
          variant: "dim",
        },
      ]
    } else if (command === "help") {
      response = [
        {
          id: createLineId(),
          text: "Available demo commands:",
          variant: "info",
        },
        {
          id: createLineId(),
          text: "  npm run dev   Start the dev server (fake)",
          variant: "dim",
        },
        {
          id: createLineId(),
          text: "  clear         Clear the terminal output",
          variant: "dim",
        },
        {
          id: createLineId(),
          text: "  help          Show this help message",
          variant: "dim",
        },
      ]
    } else {
      response = [
        {
          id: createLineId(),
          text: `command not found: ${command} (UI-only terminal)`,
          variant: "error",
        },
      ]
    }

    setLines([...lines, commandLine, ...response])
  }

  return (
    <div className="flex h-44 flex-col border-t border-border bg-background text-[11px] text-foreground">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-border bg-muted px-3 py-1.5">
        <div className="flex items-center gap-1 text-[11px]">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-[11px] text-muted-foreground hover:bg-muted/80"
          >
            Dev Server
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-6 px-2 text-[11px] border-border bg-background text-foreground"
          >
            Terminal
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-[13px] text-muted-foreground hover:bg-muted/80"
          >
            +
          </Button>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
          aria-label="Collapse terminal"
        >
          \/
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-0.5 font-mono text-[11px] text-foreground">
          {lines.map((line) => (
            <div
              key={line.id}
              className={cn(
                "whitespace-pre-wrap",
                line.variant === "command" && "text-primary",
                line.variant === "info" && "text-muted-foreground",
                line.variant === "success" && "text-emerald-500",
                line.variant === "error" && "text-destructive",
                line.variant === "dim" && "text-muted-foreground/80",
              )}
            >
              {line.text}
            </div>
          ))}

          <div className="mt-1 flex items-center gap-2 bg-background">
            <span className="font-mono text-[11px] text-primary">~/project</span>
            <span className="font-mono text-[11px] text-pink-500">›</span>
            <span
              ref={promptRef}
              contentEditable
              spellCheck={false}
              className="min-h-[1em] flex-1 whitespace-pre outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  const text = promptRef.current?.innerText ?? ""
                  handleCommand(text)
                  if (promptRef.current) {
                    promptRef.current.innerText = ""
                  }
                }
              }}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
