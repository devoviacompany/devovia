"use client";

import { AppSidebar } from "@/components/admin/shared/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import React from "react";
import { SideHeader } from "@/components/admin/shared/side-header";
import { NotificationSidebar } from "@/components/admin/app/notifications/notification-sidebar";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const pathname = usePathname();
  const isProjectsView = pathname?.includes("/projects/");

  return (
    <div
      className={
        isProjectsView
          ? "h-screen flex flex-col [--header-height:calc(--spacing(14))]"
          : "[--header-height:calc(--spacing(14))]"
      }
    >
      <SidebarProvider
        className={
          isProjectsView ? "flex flex-col flex-1 min-h-0" : "flex flex-col"
        }
        style={
          {
            "--sidebar-width": "200px",
          } as React.CSSProperties
        }
      >
        <SideHeader />
        <div className={isProjectsView ? "flex flex-1 min-h-0" : "flex flex-1"}>
          <AppSidebar />
          <SidebarInset>
            <div
              className={
                isProjectsView
                  ? "flex flex-1 min-w-0 min-h-0 flex-col gap-4 overflow-hidden"
                  : "flex flex-1 min-w-0 flex-col gap-4  "
              }
              // style={{
              //   backgroundImage:
              //     "radial-gradient(circle at 10px 10px, rgba(120,120,120,0.3) 1.5px, transparent 1.5px)",
              //   backgroundSize: "20px 20px",
              // }}
            >
              {children}
            </div>
          </SidebarInset>
        </div>
        <NotificationSidebar />
      </SidebarProvider>
    </div>
  )
}
