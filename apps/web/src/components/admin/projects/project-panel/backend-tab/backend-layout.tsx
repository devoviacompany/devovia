"use client"

import { ReactNode } from "react"
import { BackendSidebar } from "./backend-sidebar"

export type BackendView = "health" | "database" | "logs"

interface BackendLayoutProps {
  children: ReactNode
  activeView: BackendView
  onChangeView: (view: BackendView) => void
}

export const BackendLayout = ({
  children,
  activeView,
  onChangeView,
}: BackendLayoutProps) => {
  return (
    <div className="flex h-full w-full bg-background">
      <BackendSidebar activeView={activeView} onChangeView={onChangeView} />
      <section className="flex-1 min-w-0 px-4 py-4 space-y-4 overflow-auto">
        {children}
      </section>
    </div>
  )
}
