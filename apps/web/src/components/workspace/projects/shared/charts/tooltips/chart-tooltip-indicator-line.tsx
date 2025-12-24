"use client"

import { Bar, BarChart, XAxis } from "recharts"

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
  running: {
    label: "Running",
    color: "var(--chart-1)",
  },
  swimming: {
    label: "Swimming",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartTooltipIndicatorLine({
  data,
}: {
  data: { date: string; running: number; swimming: number }[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tooltip - Line Indicator</CardTitle>
        <CardDescription>Tooltip with line indicator.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                })
              }}
            />
            <Bar
              dataKey="running"
              stackId="a"
              fill="var(--color-running)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="swimming"
              stackId="a"
              fill="var(--color-swimming)"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
