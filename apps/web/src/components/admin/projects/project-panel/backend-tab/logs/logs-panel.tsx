"use client"

import { useState } from "react"
import { LogsTable, type LogRow } from "./logs-table"
import { LogDetailsPanel } from "./log-details-panel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"

const COMPONENT_FILTERS = ["All components", "Auth", "Documents", "Scheduler"]
const FUNCTION_FILTERS = ["All functions", "auth:signIn", "auth:store", "documents:list"]
const TYPE_FILTERS = ["All log types", "info", "success", "failure"]

export const LogsPanel = () => {
  const [componentFilter, setComponentFilter] = useState("All components")
  const [functionFilter, setFunctionFilter] = useState("All functions")
  const [typeFilter, setTypeFilter] = useState("All log types")
  const [query, setQuery] = useState("")
  const [cleared, setCleared] = useState(false)
  const [selectedLog, setSelectedLog] = useState<LogRow | null>(null)

  return (
    <div className="flex h-full flex-col gap-3">
      <header className="flex flex-col gap-3">
        <h2 className="text-base font-semibold tracking-tight">Logs</h2>
        <p className="text-xs text-muted-foreground">
          Filter and search through your application logs.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={componentFilter}
            onValueChange={setComponentFilter}
          >
            <SelectTrigger className="h-8 w-[160px] text-xs">
              <SelectValue placeholder="All components" />
            </SelectTrigger>
            <SelectContent align="start">
              {COMPONENT_FILTERS.map((item) => (
                <SelectItem key={item} value={item} className="text-xs">
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={functionFilter} onValueChange={setFunctionFilter}>
            <SelectTrigger className="h-8 w-[160px] text-xs">
              <SelectValue placeholder="All functions" />
            </SelectTrigger>
            <SelectContent align="start">
              {FUNCTION_FILTERS.map((item) => (
                <SelectItem key={item} value={item} className="text-xs">
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-8 w-[140px] text-xs">
              <SelectValue placeholder="All log types" />
            </SelectTrigger>
            <SelectContent align="start">
              {TYPE_FILTERS.map((item) => (
                <SelectItem key={item} value={item} className="text-xs">
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Filter logs..."
              className="h-8 pl-7 text-xs"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs text-muted-foreground"
            onClick={() => {
              setQuery("")
              setCleared(true)
              setSelectedLog(null)
            }}
          >
            Clear Logs
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden rounded-md border bg-background">
        {cleared ? (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            Logs cleared for this session. Refresh the page to load sample data again.
          </div>
        ) : (
          <div className="flex h-full divide-x divide-border">
            <div className={selectedLog ? "w-[48%] min-w-[260px]" : "w-full"}>
              <LogsTable
                componentFilter={componentFilter}
                functionFilter={functionFilter}
                typeFilter={typeFilter}
                query={query}
                selectedId={selectedLog?.id}
                onSelect={(row) => setSelectedLog(row)}
              />
            </div>
            {selectedLog && (
              <div className="flex-1 min-w-0">
                <LogDetailsPanel
                  log={selectedLog}
                  onClose={() => setSelectedLog(null)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
