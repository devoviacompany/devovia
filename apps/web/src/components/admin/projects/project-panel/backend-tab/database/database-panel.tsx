"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, MoreHorizontal } from "lucide-react"

const TABLES = [
  "authAccounts",
  "authRateLimits",
  "boards",
  "columns",
  "documents",
  "tasks",
  "users",
]

const FAKE_ROWS: Record<string, Array<Record<string, string>>> = {
  authAccounts: [
    {
      _id: "j57agxdxctmdr0mzst1n5f7p...",
      createdAt: "1/8/2026, 2:22:11 PM",
      createdBy: "k1739dfk7teyzvmp...",
      emailVerified: "unset",
      phoneVerified: "unset",
      isAnonymous: "true",
    },
    {
      _id: "jx720ypg27vq7eqfye3m9p...",
      createdAt: "1/8/2026, 2:17:36 PM",
      createdBy: "k1739dfk7teyzvmp...",
      emailVerified: "unset",
      phoneVerified: "unset",
      isAnonymous: "false",
    },
  ],
  documents: [
    {
      _id: "doc_7f1a8f2c4a...",
      createdAt: "1/8/2026, 4:59:17 PM",
      createdBy: "user_123",
      title: '"Project plan"',
      isPublic: "true",
    },
    {
      _id: "doc_9b3e2a71d0...",
      createdAt: "1/8/2026, 4:57:03 PM",
      createdBy: "user_456",
      title: '"Retro notes"',
      isPublic: "false",
    },
  ],
  users: [
    {
      _id: "user_123",
      createdAt: "1/7/2026, 10:12:03 AM",
      email: '"ada@example.com"',
      name: '"Ada"',
      role: '"admin"',
    },
    {
      _id: "user_456",
      createdAt: "1/7/2026, 11:48:19 AM",
      email: '"bruno@example.com"',
      name: '"Bruno"',
      role: '"member"',
    },
  ],
}

type CellCoord = { rowIndex: number; column: string }

export const DatabasePanel = () => {
  const [selectedTable, setSelectedTable] = useState<string>("authAccounts")
  const [tableSearch, setTableSearch] = useState("")
  const [tablesData, setTablesData] = useState(FAKE_ROWS)
  const [selectedCell, setSelectedCell] = useState<CellCoord | null>(null)
  const [editingCell, setEditingCell] = useState<CellCoord | null>(null)
  const [editingValue, setEditingValue] = useState("")

  const filteredTables = TABLES.filter((name) =>
    name.toLowerCase().includes(tableSearch.toLowerCase()),
  )

  const rows = tablesData[selectedTable] ?? tablesData["authAccounts"]
  const columns = rows!.length ? Object.keys(rows![0]!) : ["_id"]
  const documentCount = rows!.length

  const clearSelectedCell = () => {
    if (!selectedCell) return
    const { rowIndex, column } = selectedCell
    setTablesData((prev) => {
      const tableRows = prev[selectedTable] ?? []
      const nextRows = tableRows.map((row, idx) =>
        idx === rowIndex ? { ...row, [column]: "unset" } : row,
      )
      return { ...prev, [selectedTable]: nextRows }
    })
    setEditingCell(null)
  }

  const startEditSelectedCell = () => {
    if (!selectedCell) return
    const { rowIndex, column } = selectedCell
    const current = rows![rowIndex]?.[column] ?? "unset"
    setEditingCell(selectedCell)
    setEditingValue(current)
  }

  const commitEdit = () => {
    if (!editingCell) return
    const { rowIndex, column } = editingCell
    setTablesData((prev) => {
      const tableRows = prev[selectedTable] ?? []
      const nextRows = tableRows.map((row, idx) =>
        idx === rowIndex ? { ...row, [column]: editingValue } : row,
      )
      return { ...prev, [selectedTable]: nextRows }
    })
    setEditingCell(null)
  }

  return (
    <div className="flex h-full min-h-0 border rounded-md bg-background">
      {/* Tables sidebar */}
      <aside className="w-60 border-r bg-muted/10 flex flex-col">
        <div className="flex items-center justify-between px-3 py-2 border-b text-xs font-medium">
          <span>Tables</span>
        </div>
        <div className="px-3 py-2">
          <Input
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
            placeholder="Search tables..."
            className="h-8 text-xs"
          />
        </div>
        <ScrollArea className="flex-1 px-1">
          <div className="flex flex-col gap-0.5 pb-2">
            {filteredTables.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setSelectedTable(name)}
                className={`flex w-full items-center rounded-md px-3 py-1.5 text-left text-xs ${selectedTable === name
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted/60"
                  }`}
              >
                {name}
              </button>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t px-3 py-2">
          <Button variant="outline" size="sm" className="w-full justify-center text-xs">
            Schema
          </Button>
        </div>
      </aside>

      {/* Table viewer */}
      <section className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-4 py-2 border-b text-xs">
          <h2 className="font-semibold">{selectedTable}</h2>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-7 px-2 text-[11px]">
              Filter &amp; Sort
            </Button>
            <Button size="sm" variant="outline" className="h-7 px-2 text-[11px]">
              <span className="mr-1">{documentCount}</span>
              {documentCount === 1 ? "document" : "documents"}
            </Button>
            <Button size="icon" variant="outline" className="h-7 w-7">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
            <Button size="sm" className="h-7 px-2 text-[11px]">
              <Plus className="mr-1 h-3 w-3" /> Add
            </Button>
          </div>
        </header>

        {selectedCell && (
          <div className="flex items-center justify-between px-4 py-1 border-b text-[11px] bg-muted/40">
            <span className="text-muted-foreground">
              Selected cell: row {selectedCell.rowIndex + 1}, {selectedCell.column}
            </span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-6 px-2 text-[10px]"
                onClick={startEditSelectedCell}
              >
                Edit value
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-6 px-2 text-[10px]"
                onClick={clearSelectedCell}
              >
                Clear cell
              </Button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-hidden px-2 pb-2 pt-1">
          <div className="h-full rounded-md border bg-card text-xs overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-card">
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  {columns.map((col) => (
                    <TableHead key={col} className="whitespace-nowrap">
                      {col}
                    </TableHead>
                  ))}
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows!.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="hover:bg-muted/40">
                    <TableCell className="w-10 align-middle">
                      <Checkbox className="h-3.5 w-3.5" aria-label="Select row" />
                    </TableCell>
                    {columns.map((col) => {
                      const isSelected =
                        !!selectedCell &&
                        selectedCell.rowIndex === rowIndex &&
                        selectedCell.column === col
                      const isEditing =
                        !!editingCell &&
                        editingCell.rowIndex === rowIndex &&
                        editingCell.column === col

                      return (
                        <TableCell
                          key={col}
                          className={`whitespace-nowrap align-middle text-[11px] cursor-pointer ${isSelected ? "bg-muted/60" : ""
                            }`}
                          onClick={() => {
                            setSelectedCell({ rowIndex, column: col })
                            setEditingCell(null)
                          }}
                        >
                          {isEditing ? (
                            <Input
                              autoFocus
                              value={editingValue}
                              onChange={(e) => setEditingValue(e.target.value)}
                              onBlur={commitEdit}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") commitEdit()
                                if (e.key === "Escape") setEditingCell(null)
                              }}
                              className="h-6 text-[11px]"
                            />
                          ) : col === "_id" ? (
                            <span className="font-mono">
                              {row[col] ?? "unset"}
                            </span>
                          ) : (
                            row[col] ?? "unset"
                          )}
                        </TableCell>
                      )
                    })}
                    <TableCell className="w-8 align-middle text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                        aria-label="Row actions"
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </div>
  )
}
