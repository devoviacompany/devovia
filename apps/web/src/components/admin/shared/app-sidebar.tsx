"use client"

import * as React from "react"
import Image from "next/image"
import { NavUser } from "@/components/admin/shared/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { sidebarNavData } from "./sidebar-nav-config"
import { useAdminId } from "@/hooks"
import { NavApp } from "./nav-app"
import { NavMain } from "./nav-main"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const adminId = useAdminId();

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
              <a href={adminId ? `/admin/${adminId}` : "/admin/:adminId"}>
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src="/icons/favicon-32x32.png"
                    alt="Devovia Logo"
                    width={25}
                    height={25} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Devovia</span>
                  <span className="truncate text-xs">Admin Panel</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={sidebarNavData.navMain} title="Main" />
        <NavApp items={sidebarNavData.app} title="App" className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarNavData.user} />
      </SidebarFooter>
    </Sidebar>
  )
}