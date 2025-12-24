"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { LeftSidebarTrigger, RightSidebarTrigger } from "@/components/ui/sidebar"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useWorkspaceId } from "@/hooks";
import React from "react"
import ThemeToggle from "@/components/global/theme-toggle";

const segmentNameMap = {
  workspace: {
    projects: "Projects",
    account: "Account",
    settings: "Settings",
    support: "Support",
    feedback: "Feedback",
    billing: "Billing",
    notifications: "Notifications"
  },
  project: {
    dashboard: "Dashboard",
    planning: "Planning",
    design: "Design",
    development: "Development",
    testing: "Testing",
    deployment: "Deployment",
    projectSettings: "Project Settings",
  }
};

export function SideHeader() {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();
  const segments = pathname.split('/').filter(Boolean);
  const workspaceIndex = segments.indexOf(`${workspaceId}`);

  // Get all segments after Workspace ID for breadcrumbs
  const crumbSegments = workspaceIndex >= 0 && workspaceId
    ? segments.slice(workspaceIndex + 1) // +1 to skip userId
    : [];

  // Get the current segment map for breadcrumb labels
  const currentSegmentMap = segmentNameMap.workspace;

  const [open, setOpen] = React.useState(false);
  // const [chatOpen, setChatOpen] = React.useState(false);
  const router = useRouter();

  // Dashboard sections for search
  const workspaceDashboardSections = [
    { name: "Home", url: `/workspace/${workspaceId}` },
    { name: "Projects", url: `/workspace/${workspaceId}/projects` },
    { name: "Account", url: `/workspace/${workspaceId}/account` },
    { name: "Settings", url: `/workspace/${workspaceId}/settings` },
    { name: "Support", url: `/workspace/${workspaceId}/support` },
    { name: "Feedback", url: `/workspace/${workspaceId}/feedback` },
    { name: "Billing", url: `/workspace/${workspaceId}/billing` },
    { name: "Notifications", url: `/workspace/${workspaceId}/notifications` },

  ];

  const [search, setSearch] = React.useState("");
  const workspaceFilteredSections = workspaceDashboardSections.filter((section) =>
    section.name.toLowerCase().includes(search.toLowerCase()),
  );

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-2 px-4">
        {/* Left: Breadcrumb */}
        <div className="flex items-center gap-2">
          <LeftSidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList className="flex-nowrap overflow-x-auto py-1 scrollbar-hide">
              {/* workspace root link - always visible */}
              <BreadcrumbItem className="whitespace-nowrap">
                <BreadcrumbLink
                  href={workspaceId ? `/workspace/${workspaceId}` : '/workspace'}
                  className="text-sm md:text-base"
                >
                  Workspace
                </BreadcrumbLink>
              </BreadcrumbItem>

              {/* Only show top-level item (Home, Projects, Account, etc.), no project IDs or sections */}
              {(() => {
                // First segment after workspaceId, e.g. "projects", "account", ...
                const topSegment = crumbSegments[0];

                let label: string | null = null;
                let href: string | null = null;

                if (!topSegment) {
                  // Root workspace route -> treat as Home
                  label = "Home";
                  href = workspaceId ? `/${workspaceId}` : '/workspace';
                } else {
                  label = currentSegmentMap[topSegment as keyof typeof currentSegmentMap] || topSegment;
                  href = workspaceId ? `/workspace/${workspaceId}/${topSegment}` : `/workspace/${topSegment}`;
                }

                if (!label || !href) return null;

                return (
                  <>
                    <BreadcrumbSeparator className="mx-1" />
                    <BreadcrumbItem className="whitespace-nowrap">
                      <BreadcrumbLink
                        href={href}
                        className="text-sm md:text-base font-medium"
                      >
                        {label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                );
              })()}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />
          {/* Notification Icon */}
          <RightSidebarTrigger />

          {/* Search Bar */}
          <button
            type="button"
            className="flex items-center bg-muted rounded-lg border border-border px-4 py-2 w-56 cursor-pointer text-muted-foreground text-sm gap-2 relative hover:bg-muted/80 transition"
            onClick={() => setOpen(true)}
            aria-label="Open search"
          >
            <SearchIcon className="w-4 h-4 text-muted-foreground" />
            <span className="flex-1 text-left text-muted-foreground">
              Search
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
              Ctrl K
            </span>
          </button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
              placeholder="Search..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              {workspaceFilteredSections.length === 0 ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : (
                <CommandGroup heading="Sections">
                  {workspaceFilteredSections.map((section) => (
                    <CommandItem
                      key={section.url}
                      onSelect={() => {
                        setOpen(false);
                        setSearch("");
                        router.push(section.url);
                      }}
                    >
                      {section.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </CommandDialog>
        </div>
      </div>
    </header>
  )
}
