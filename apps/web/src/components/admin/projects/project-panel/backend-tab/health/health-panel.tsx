"use client"

import { HealthFailureRateCard } from "./health-failure-rate-card"
import { HealthCacheHitRateCard } from "./health-cache-hit-rate-card"
import { HealthSchedulerStatusCard } from "./health-scheduler-status-card"
import { HealthLastDeployedCard } from "./health-last-deployed-card"

export const HealthPanel = () => {
  return (
    <div className="h-full flex flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/80 backdrop-blur-sm px-1 py-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Health</h2>
          <p className="text-xs text-muted-foreground">
            Live overview of your backend stability and performance.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          <span>All systems operational</span>
        </div>
      </header>

      <div className="mt-3 grid flex-1 grid-cols-1 gap-4 overflow-auto pr-1 md:grid-cols-2">
        <HealthFailureRateCard />
        <HealthCacheHitRateCard />
        <HealthSchedulerStatusCard />
        <HealthLastDeployedCard />
      </div>
    </div>
  )
}
