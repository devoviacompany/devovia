"use client"

import { Info } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const chartConfig = {
  jobs: {
    label: "Jobs",
  },
  success: {
    label: "Successful runs",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

const chartData = [
  {
    label: "Jobs",
    runs: 42,
    fill: "var(--color-success)",
  },
]

export const HealthSchedulerStatusCard = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2 pt-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-sm">Scheduler Status</CardTitle>
            <CardDescription className="text-[11px]">
              Last 24 hours of scheduled jobs
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground leading-4 mt-0.5">
              All green
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground/80 text-[10px]"
                  aria-label="Scheduler status info"
                >
                  <Info className="h-3 w-3" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="left"
                align="start"
                className="max-w-xs text-[11px] bg-background text-muted-foreground"
              >
                Status of recurring jobs executed by the scheduler over the last
                24 hours.
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[180px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={260}
            innerRadius={60}
            outerRadius={90}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[66, 54]}
            />
            <RadialBar dataKey="runs" background cornerRadius={12} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          42
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 18}
                          className="fill-muted-foreground text-[11px]"
                        >
                          successful runs
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>0 failed runs in the last 24 hours</span>
          <span className="text-emerald-500">On schedule</span>
        </div>
      </CardContent>
    </Card>
  )
}
