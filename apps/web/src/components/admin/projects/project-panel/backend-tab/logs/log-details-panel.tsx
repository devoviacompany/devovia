"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/functions"
import { CheckCircle2, ChevronDown } from "lucide-react"
import type { LogRow } from "./logs-table"

interface LogDetailsPanelProps {
  log: LogRow
  onClose: () => void
}

export const LogDetailsPanel = ({ log, onClose }: LogDetailsPanelProps) => {
  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b px-4 py-3 text-xs">
        <div className="flex flex-col gap-0.5">
          <div className="font-mono text-[11px] text-foreground">
            {log.timestamp}
          </div>
          <div className="text-[11px] text-muted-foreground flex items-center gap-2">
            <span>{log.functionName}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{log.status}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 rounded-full text-muted-foreground hover:text-foreground"
          onClick={onClose}
        >
          ×
        </Button>
      </header>

      <div className="flex-1 overflow-auto px-4 py-3 text-xs">
        <Tabs defaultValue="execution" className="h-full flex flex-col">
          <TabsList className="inline-flex h-8 w-auto justify-start rounded-full bg-muted px-1 text-[11px]">
            <TabsTrigger value="execution" className="h-6 rounded-full px-3">
              Execution
            </TabsTrigger>
            <TabsTrigger value="request" className="h-6 rounded-full px-3">
              Request
            </TabsTrigger>
            <TabsTrigger value="functions" className="h-6 rounded-full px-3">
              Functions Called
            </TabsTrigger>
          </TabsList>

          <TabsContent value="execution" className="mt-4 space-y-2">
            <DetailRow label="Execution ID" value={fakeExecutionId(log.id)} mono />
            <DetailRow label="Function" value={log.functionName} mono />
            <DetailRow
              label="Type"
              value={log.type === "info" ? "Query" : "Invocation"}
              strong
            />
            <DetailRow label="Started at" value={fakeDateForLog(log.timestamp)} />
            <DetailRow label="Completed at" value={fakeDateForLog(log.timestamp)} />
            <DetailRow label="Duration" value={`${log.durationMs}ms`} strong />
            <DetailRow label="Environment" value="Convex" />

            <DetailSectionLabel label="Resources Used" />
            <DetailRow
              label="Compute"
              value="0.0000003 GB-hr (64 MB for 0.02s)"
            />
            <DetailRow
              label="DB Bandwidth"
              value="Accessed 3 documents, 703 B read, 0 B written"
            />
            <DetailRow label="File Bandwidth" value="0 B read, 0 B written" />
            <DetailRow label="Vector Bandwidth" value="0 B read, 0 B written" />
            <DetailRow label="Return Size" value="428 B returned" />
          </TabsContent>

          <TabsContent value="request" className="mt-4 space-y-2">
            <DetailRow label="Request ID" value={fakeRequestId(log.id)} mono />
            <DetailRow label="Started at" value={fakeDateForLog(log.timestamp)} />
            <DetailRow label="Completed at" value={fakeDateForLog(log.timestamp)} />
            <DetailRow label="Duration" value={`${log.durationMs}ms`} strong />
            <DetailRow label="Identity" value="User" />
            <DetailRow label="Caller" value="Websocket" />
            <DetailRow label="Environment" value="Convex" />

            <DetailSectionLabel label="Resources Used" />
            <DetailRow
              label="Compute"
              value="0.0000003 GB-hr (64 MB for 0.02s)"
            />
            <DetailRow
              label="DB Bandwidth"
              value="Accessed 3 documents, 703 B read, 0 B written"
            />
            <DetailRow label="File Bandwidth" value="0 B read, 0 B written" />
            <DetailRow label="Vector Bandwidth" value="0 B read, 0 B written" />
            <DetailRow label="Return Size" value="428 B returned" />
          </TabsContent>

          <TabsContent value="functions" className="mt-4 space-y-3">
            <p className="text-[11px] text-muted-foreground">
              This is an outline of the functions called in this request.
            </p>

            <div className="inline-flex items-center rounded-md bg-amber-500/70 px-2.5 py-1.5 text-[11px] text-amber-50">
              <CheckCircle2 className="mr-1.5 h-3 w-3" />
              <span className="font-mono">
                {log.functionName || "documents:list"}
              </span>
              <span className="ml-1.5 text-[10px] opacity-90">
                ({log.durationMs}ms)
              </span>
              <span className="ml-auto h-3 w-px bg-amber-200/60" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface DetailRowProps {
  label: string
  value: string
  mono?: boolean
  strong?: boolean
}

const DetailRow = ({ label, value, mono, strong }: DetailRowProps) => {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/40 py-1.5">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span
        className={cn(
          "text-[11px] text-foreground",
          mono && "font-mono break-all",
          strong && "font-semibold"
        )}
      >
        {value}
      </span>
    </div>
  )
}

interface DetailSectionLabelProps {
  label: string
}

const DetailSectionLabel = ({ label }: DetailSectionLabelProps) => {
  return (
    <div className="flex items-center justify-between border-b border-border/40 py-1.5 text-[11px] text-muted-foreground">
      <span>{label}</span>
      <ChevronDown className="h-3 w-3 opacity-70" />
    </div>
  )
}

const fakeExecutionId = (id: string) => {
  // Simple deterministic fake execution id based on the log id
  return `4b48c176-6b51-4392-${id.slice(0, 4)}-exec`
}

const fakeRequestId = (id: string) => {
  return `a6da15126489b${id.slice(0, 2)}`
}

const fakeDateForLog = (timestamp: string) => {
  // For now just echo back the timestamp; can be swapped for real formatting later
  return timestamp.replace("Jan", "1/")
}
