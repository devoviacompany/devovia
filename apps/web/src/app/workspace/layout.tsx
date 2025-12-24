"use client";

import { AppSidebar } from "@/components/workspace/shared/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar"
import React from "react";
import { SideHeader } from "@/components/workspace/shared/side-header";
import { useWorkspaceId } from "@/hooks";
import { usePathname } from "next/navigation";
import { sidebarNavData } from "@/components/workspace/shared/sidebar-nav-config";
import { NotificationSidebar } from "@/components/workspace/app/notifications/notification-sidebar";

interface Props {
  children: React.ReactNode;
}

function SidebarRouteSync() {
  const { setOpen } = useSidebar("left");
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();

  React.useEffect(() => {
    const getMainUrl = (url: string) => {
      if (!workspaceId) return url.replace(":workspaceId", "workspace");
      return url.replace(":workspaceId", workspaceId);
    };

    const projectsMain = sidebarNavData.navMain.find((item) => item.title === "Projects");
    const projectsBase = projectsMain ? getMainUrl(projectsMain.url) : undefined;

    const isProjectsRoute = projectsBase
      ? pathname === projectsBase || pathname.startsWith(`${projectsBase}/`)
      : false;

    setOpen(isProjectsRoute);
  }, [pathname, workspaceId, setOpen]);

  return null;
}

export default function WorkspaceLayout({ children }: Props) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider
        className="flex flex-col"
        style={
          {
            "--sidebar-width": "320px",
          } as React.CSSProperties
        }
      >
        <SideHeader />
        <SidebarRouteSync />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 min-w-0 flex-col gap-4 p-4 pt-4">
              {children}
            </div>
          </SidebarInset>
        </div>
        <NotificationSidebar />
      </SidebarProvider>
    </div>
  )
}
