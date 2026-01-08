"use client"

import Image from "next/image"
import { Activity, Database, FileText } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { BackendView } from "./backend-layout"

interface BackendSidebarProps {
  activeView: BackendView
  onChangeView: (view: BackendView) => void
}

export const BackendSidebar = ({
  activeView,
  onChangeView,
}: BackendSidebarProps) => {
  return (
    <aside className="flex h-full flex-col border-r bg-sidebar w-[calc(var(--sidebar-width-icon)+1px)]">
      {/* Logo button (matches first app sidebar style) */}
      <div className="flex items-center justify-center py-3 border-b">
        <SidebarMenu className="w-auto">
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="flex aspect-square size-8 items-center justify-center rounded-lg p-0"
            >
              <Image
                src="/icons/favicon-32x32.png"
                alt="Devovia Logo"
                width={20}
                height={20}
                className="rounded-md"
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>

      {/* Vertical icon rail using shared Sidebar components */}
      <nav className="flex-1 flex flex-col items-center gap-2 py-3 text-sm">
        <SidebarMenu className="w-auto flex flex-col items-center gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              size="sm"
              className="flex aspect-square size-8 items-center justify-center p-0"
              isActive={activeView === "health"}
              tooltip={{
                children: "Health",
                hidden: false,
              }}
              onClick={() => onChangeView("health")}
            >
              <Activity className="h-4 w-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="sm"
              className="flex aspect-square size-8 items-center justify-center p-0"
              isActive={activeView === "database"}
              tooltip={{
                children: "Database",
                hidden: false,
              }}
              onClick={() => onChangeView("database")}
            >
              <Database className="h-4 w-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="sm"
              className="flex aspect-square size-8 items-center justify-center p-0"
              isActive={activeView === "logs"}
              tooltip={{
                children: "Logs",
                hidden: false,
              }}
              onClick={() => onChangeView("logs")}
            >
              <FileText className="h-4 w-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </nav>
    </aside>
  )
}
