"use client";

import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import React from "react";
import { useWorkspaceId } from "@/hooks";

export function NavMain({
  title,
  items,
  ...props
}: {
  title?: string;
  items: {
    title: string;
    url: string;

    icon?: LucideIcon;
    isActive?: boolean;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();

  const getUrl = (url: string) => {
    if (!workspaceId) return url.replace(":workspaceId", "workspace");
    return url.replace(":workspaceId", workspaceId);
  };

  return (
    <SidebarGroup {...props}>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarGroupContent className="px-1.5 md:px-0">
        <SidebarMenu>
          {items.map((item) => {
            const href = getUrl(item.url);
            const isProjects = item.title === "Projects";
            const isActive = isProjects
              ? pathname === href || pathname.startsWith(`${href}/`)
              : pathname === href;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={{
                    children: item.title,
                    hidden: false,
                  }}
                  isActive={isActive}
                  className="px-2.5 md:px-2"
                >
                  <Link href={href} className="flex-1">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}