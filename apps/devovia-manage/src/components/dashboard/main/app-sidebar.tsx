"use client";

import * as React from "react";
import Image from "next/image"
import { NavMain } from "@/components/dashboard/main/nav-main";
import { NavUser } from "@/components/dashboard/main/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarNavData } from "./sidebar-nav-config";
import { NavSubMain } from "./nav-sub-main";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar side="left" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="dashboard/">
                <div className="bg-muted flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src="/icons/favicon-32x32.png"
                    alt="Devovia Logo"
                    width={25}
                    height={25} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Devovia</span>
                  <span className="truncate text-xs">
                    {
                      sidebarNavData.roles[
                      "admin" as keyof typeof sidebarNavData.roles
                      ]
                    }
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={sidebarNavData.admin} />
        <NavSubMain items={sidebarNavData.customerSupport} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarNavData.userData} />
      </SidebarFooter>
    </Sidebar>
  );
}