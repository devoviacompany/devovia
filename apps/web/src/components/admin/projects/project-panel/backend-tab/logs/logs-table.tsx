"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/utils/functions"

const LOG_ROWS: LogRow[] = [
  {
    id: "1069",
    timestamp: "Jan 05, 14:17:26.821",
    status: "success",
    durationMs: 66,
    method: "A",
    functionName: "auth:signIn",
    message: "",
    type: "success",
    component: "Auth",
  },
  {
    id: "1069-2",
    timestamp: "Jan 08, 14:17:26.820",
    status: "success",
    durationMs: 16,
    method: "M",
    functionName: "auth:store",
    message: "",
    type: "success",
    component: "Auth",
  },
  {
    id: "40dd-failure",
    timestamp: "Jan 08, 14:10:58.804",
    status: "failure",
    durationMs: 82,
    method: "A",
    functionName: "auth:signIn",
    message: "Uncaught Error: InvalidAccountId at refreshSession",
    type: "failure",
    component: "Auth",
  },
  {
    id: "40dd-success",
    timestamp: "Jan 08, 14:10:58.793",
    status: "success",
    durationMs: 15,
    method: "M",
    functionName: "auth:store",
    message: "",
    type: "success",
    component: "Auth",
  },
  {
    id: "docs-info",
    timestamp: "Jan 08, 14:17:26.295",
    status: "200",
    durationMs: 28,
    method: "Q",
    functionName: "documents:list",
    message: "info `documents:list` type: list",
    type: "info",
    component: "Documents",
  },
  {
    id: "40d-success",
    timestamp: "Jan 08, 14:10:58.793",
    status: "success",
    durationMs: 15,
    method: "M",
    functionName: "auth:store",
    message: "",
    type: "success",
    component: "Auth",
  },
  {
    id: "dashboard-info",
    timestamp: "Jan 09, 14:17:26.295",
    status: "200",
    durationMs: 28,
    method: "Q",
    functionName: "dashboard:get",
    message: "info `dashboard:get` type: get",
    type: "info",
    component: "Dashboard",
  },
    {
    id: "129-0",
    timestamp: "Jan 10, 14:17:26.820",
    status: "success",
    durationMs: 16,
    method: "M",
    functionName: "auth:admin",
    message: "",
    type: "success",
    component: "Auth",
  },
  {
    id: "45c-failure",
    timestamp: "Jan 11, 14:10:58.804",
    status: "failure",
    durationMs: 82,
    method: "A",
    functionName: "auth:signUp",
    message: "Uncaught Error: InvalidAccountId at refreshSession",
    type: "failure",
    component: "Auth",
  },
]

export type LogRowStatus = "success" | "failure" | "info" | "200"

export type LogRow = {
  id: string
  timestamp: string
  status: LogRowStatus
  durationMs: number
  method: string
  functionName: string
  message: string
  type: "success" | "failure" | "info"
  component: string
}

interface LogsTableProps {
  componentFilter: string
  functionFilter: string
  typeFilter: string
  query: string
  selectedId?: string | null
  onSelect?: (row: LogRow) => void
}

export const LogsTable = ({
  componentFilter,
  functionFilter,
  typeFilter,
  query,
  selectedId,
  onSelect,
}: LogsTableProps) => {
  const rows = LOG_ROWS.filter((row) => {
    if (componentFilter !== "All components" && row.component !== componentFilter) {
      return false
    }
    if (functionFilter !== "All functions" && row.functionName !== functionFilter) {
      return false
    }
    if (typeFilter !== "All log types" && row.type !== typeFilter) {
      return false
    }
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return (
      row.id.toLowerCase().includes(q) ||
      row.timestamp.toLowerCase().includes(q) ||
      row.functionName.toLowerCase().includes(q) ||
      row.message.toLowerCase().includes(q)
    )
  })

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-3 py-1.5 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1">
          <span className="font-medium text-foreground">T</span>
          <span>Timestamp</span>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="h-6 px-2 text-[10px] font-normal">
            Go Live
          </Badge>
        </div>
      </div>
      <div className="flex-1 overflow-auto text-xs">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow className="text-[11px]">
              <TableHead className="w-[200px]">Timestamp</TableHead>
              <TableHead className="w-[90px]">ID</TableHead>
              <TableHead className="w-[90px]">Status</TableHead>
              <TableHead className="w-[80px]">Duration</TableHead>
              <TableHead className="w-[80px]">Method</TableHead>
              <TableHead>Function</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const isFailure = row.type === "failure"
              return (
                <TableRow
                  key={row.id}
                  onClick={() => onSelect?.(row)}
                  className={cn(
                    "cursor-pointer border-b border-border/60 hover:bg-muted/40",
                    isFailure && "bg-destructive/10 hover:bg-destructive/20",
                    selectedId === row.id &&
                      !isFailure &&
                      "bg-muted/60 hover:bg-muted/60",
                    selectedId === row.id &&
                      isFailure &&
                      "ring-1 ring-destructive/70"
                  )}
                >
                  <TableCell className="text-[11px] text-muted-foreground">
                    {row.timestamp}
                  </TableCell>
                  <TableCell className="text-[11px] text-muted-foreground">
                    {row.id}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={row.status} />
                  </TableCell>
                  <TableCell className="text-[11px] text-muted-foreground">
                    {row.durationMs}ms
                  </TableCell>
                  <TableCell className="text-[11px] text-muted-foreground">
                    {row.method}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-foreground">
                          {row.functionName}
                        </span>
                        {row.type === "info" && (
                          <Badge
                            variant="outline"
                            className="h-4 px-1 text-[10px] font-normal text-muted-foreground"
                          >
                            info
                          </Badge>
                        )}
                      </div>
                      {row.message && (
                        <p className="truncate text-[11px] text-muted-foreground">
                          {row.message}
                        </p>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

interface StatusBadgeProps {
  status: LogRowStatus
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  if (status === "failure") {
    return (
      <Badge className="h-5 px-2 text-[10px] bg-destructive text-destructive-foreground">
        failure
      </Badge>
    )
  }

  if (status === "success") {
    return (
      <Badge className="h-5 px-2 text-[10px] bg-emerald-500/20 text-emerald-400">
        success
      </Badge>
    )
  }

  if (status === "info") {
    return (
      <Badge
        variant="outline"
        className="h-5 px-2 text-[10px] border-border/70 text-muted-foreground"
      >
        info
      </Badge>
    )
  }

  // e.g. HTTP code like "200"
  return (
    <Badge
      variant="outline"
      className="h-5 px-2 text-[10px] border-border/70 text-muted-foreground"
    >
      {status}
    </Badge>
  )
}
