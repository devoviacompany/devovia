"use client"

import { Info } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export const HealthLastDeployedCard = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-1 pt-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm">Last Deployed</CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground/80 text-[10px]"
                aria-label="Last deployed info"
              >
                <Info className="h-3 w-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              align="start"
              className="max-w-xs text-[11px] bg-background text-muted-foreground"
            >
              Shows when the last production deployment finished and which
              runtime version is live.
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="pt-1 text-[11px] text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>1 hour ago</span>
          <span className="font-mono text-xs text-foreground">Convex v1.31.3</span>
        </div>
      </CardContent>
    </Card>
  )
}
