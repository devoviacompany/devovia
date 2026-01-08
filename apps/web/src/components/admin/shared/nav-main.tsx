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
import { useAdminId } from "@/hooks";

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
  const adminId = useAdminId();
  const pathname = usePathname();

  const getUrl = (url: string) => {
    if (!adminId) return url.replace(":adminId", "admin");
    return url.replace(":adminId", adminId);
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