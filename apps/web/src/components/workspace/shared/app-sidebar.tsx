"use client"

import * as React from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { NavUser } from "@/components/workspace/shared/nav-user"
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
import { useWorkspaceId } from "@/hooks"
import { NavApp } from "./nav-app"
import { NavMain } from "./nav-main"
import { ProjectsSidebar } from "./projects-sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();

  const getMainUrl = (url: string) => {
    if (!workspaceId) return url.replace(":workspaceId", "workspace");
    return url.replace(":workspaceId", workspaceId);
  };

  const projectsMain = sidebarNavData.navMain.find((item) => item.title === "Projects");
  const projectsBase = projectsMain ? getMainUrl(projectsMain.url) : undefined;
  const showProjectsSidebar = projectsBase
    ? pathname === projectsBase || pathname.startsWith(`${projectsBase}/`)
    : false;

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      {/* This is the first sidebar */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href={workspaceId ? `/workspace/${workspaceId}` : "/workspace/:workspaceId"}>
                  <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Image
                      src="/icons/favicon-32x32.png"
                      alt="Devovia Logo"
                      width={25}
                      height={25} />
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

      {/* This is the second sidebar */}
      {showProjectsSidebar && <ProjectsSidebar />}
    </Sidebar>
  )
}
