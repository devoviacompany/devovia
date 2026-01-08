"use client"

import { Info } from "lucide-react"
import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  auth: {
    label: "auth:loggedInUser",
    color: "var(--chart-1)",
  },
  documents: {
    label: "documents:list",
    color: "var(--chart-2)",
  },
  other: {
    label: "All other queries",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

const chartData = [
  { time: "2:57 PM", auth: 1, documents: 1, other: 0.9 },
  { time: "3:11 PM", auth: 1, documents: 0.1, other: 0.92 },
  { time: "3:26 PM", auth: 1, documents: 1, other: 0.93 },
  { time: "3:44 PM", auth: 1, documents: 1, other: 0.95 },
]

export const HealthCacheHitRateCard = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2 pt-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-sm">Cache Hit Rate</CardTitle>
            <CardDescription className="text-[11px]">
              In-memory cache over the last 30 minutes
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground leading-4 mt-0.5">
              100% peak
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground/80 text-[10px]"
                  aria-label="Cache hit rate info"
                >
                  <Info className="h-3 w-3" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="left"
                align="start"
                className="max-w-xs text-[11px] bg-background text-muted-foreground"
              >
                Share of reads served from cache instead of hitting the database
                in the last 30 minutes.
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[150px] w-full rounded-md bg-[var(--background)]"
        >
          <LineChart data={chartData} margin={{ left: 8, right: 8, top: 8 }}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="var(--border)"
            />
            <YAxis
              domain={[0, 1]}
              ticks={[0, 0.25, 0.5, 0.75, 1]}
              tickFormatter={(value: number) => `${Math.round(value * 100)}%`}
              width={32}
              tickLine={false}
              axisLine={false}
              tickMargin={4}
            />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
            />
            <ReferenceLine
              x="2:57 PM"
              stroke="var(--warning)"
              strokeDasharray="4 4"
            />
            <ChartTooltip
              cursor={{ stroke: "var(--border)", strokeDasharray: "3 3" }}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value: string | number) => `${value}`}
                />
              }
            />
            <Line
              type="monotone"
              dataKey="auth"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="documents"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="other"
              stroke="var(--chart-3)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ChartContainer>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="h-[2px] w-6 rounded-full bg-[var(--chart-1)]" />
            <span>auth:loggedInUser</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-[2px] w-6 rounded-full bg-[var(--chart-2)]" />
            <span>documents:list</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-[2px] w-6 rounded-full bg-[var(--chart-3)]" />
            <span>All other queries</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
