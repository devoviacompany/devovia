"use client"

import { Info } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ReferenceLine } from "recharts"
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
  failures: {
    label: "Failure rate",
  },
  all: {
    label: "All functions",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

// Demo data: flat line at 0% with a marker window, matching the reference style
const chartData: { time: string; all: number }[] = [
  { time: "2:52 PM", all: 0.1 },
  { time: "3:07 PM", all: 0.15 },
  { time: "3:22 PM", all: 0.5 },
  { time: "3:40 PM", all: 0.8 },
]

export const HealthFailureRateCard = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2 pt-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-sm">Failure Rate</CardTitle>
            <CardDescription className="text-[11px]">
              Last 30 minutes across core functions
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground leading-4 mt-0.5">
              Last 30 min
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground/80 text-[10px]"
                  aria-label="Failure rate info"
                >
                  <Info className="h-3 w-3" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="left"
                align="start"
                className="max-w-xs text-[11px] bg-background text-muted-foreground"
              >
                Percentage of backend requests that are failing over the last 30
                minutes.
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
            {/* Marker window (dashed vertical line) */}
            <ReferenceLine
              x="2:52 PM"
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
              dataKey="all"
              stroke="var(--primary)"
              strokeWidth={2.2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ChartContainer>
        <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="h-[2px] w-6 rounded-full bg-[var(--primary)]" />
          <span>All functions</span>
        </div>
      </CardContent>
    </Card>
  )
}
