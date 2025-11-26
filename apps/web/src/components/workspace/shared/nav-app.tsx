"use client";

import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useWorkspaceId } from "@/hooks";

export function NavApp({
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
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();

  // Function to add workspaceId to URL if it exists
  const getUrl = (url: string) => {
    if (!workspaceId) return url.replace(":workspaceId", "workspace");
    return url.replace(":workspaceId", workspaceId);
  };

  return (
    <SidebarGroup {...props}>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => {
          const href = getUrl(item.url);
          const isActive = pathname === href;
          return (
            <SidebarMenuItem key={item.url} className={isActive ? 'bg-muted rounded-md' : ''}>
              <Link href={href} className="flex-1">
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}