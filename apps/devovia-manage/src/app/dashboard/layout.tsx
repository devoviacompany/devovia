"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { AppSidebar } from "@/components/dashboard/main/app-sidebar";
import { Moon, Sun, SearchIcon, Languages } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  LeftSidebarTrigger,
  RightSidebarTrigger,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { NotificationSidebar } from "@/components/dashboard/app/notifications/notification-sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  children: React.ReactNode;
}

const segmentNameMap = {
  admin: {
    "dashboard": "Admin",
    "system-overview": "System Overview",
    "logging-monitoring": "Logging & Monitoring",
    "security-logs": "Security Logs",
    "performance-metrics": "Performance Metrics",
    "user-management": "User Management",
    reports: "Reports",
    "support-management": "Support Management",
    "feedback-management": "Feedback Management",
    settings: "Settings",
    account: "Account",
    notifications: "Notifications",
  },
};

export default function DeveloperDashboardLayout({ children }: Props) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const devDashboardIndex = segments.indexOf("admin");
  const crumbSegments =
    devDashboardIndex >= 0 ? segments.slice(devDashboardIndex) : segments;

  const currentSegmentMap = segmentNameMap["admin" as never];

  const [open, setOpen] = React.useState(false);
  const [languageOpen, setLanguageOpen] = React.useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Dashboard sections for search
  const devDashboardSections = [
    { name: "System Overview", url: "/dashboard" },
    { name: "Health Tracking", url: "/dashboard/health-tracking" },
    { name: "Logging & Monitoring", url: "/dashboard/logging-monitoring" },
    { name: "Security Logs", url: "/dashboard/security-logs" },
    { name: "Performance Metrics", url: "/dashboard/performance-metrics" },
    { name: "User Management", url: "/dashboard/user-management" },
    { name: "Support Management", url: "/dashboard/support-management" },
    { name: "Feedback Management", url: "/dashboard/feedback-management" },
    { name: "Reports", url: "/dashboard/reports" },
    { name: "Settings", url: "/dashboard/settings" },
  ];

  const [search, setSearch] = React.useState("");
  const devFilteredSections = devDashboardSections.filter((section) =>
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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4 w-full justify-between">
            {/* Left: Breadcrumb */}
            <div className="flex items-center gap-2">
              <LeftSidebarTrigger className="-ml-1" />
              <Breadcrumb>
                <BreadcrumbList>
                  {crumbSegments.map((seg, i) => (
                    <React.Fragment key={seg}>
                      {i > 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          href={"/" + crumbSegments.slice(0, i + 1).join("/")}
                        >
                          {currentSegmentMap[seg] || seg}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            {/* Right: Icons */}
            <div className="flex items-center gap-3">
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
                  {devFilteredSections.length === 0 ? (
                    <CommandEmpty>No results found.</CommandEmpty>
                  ) : (
                    <CommandGroup heading="Sections">
                      {devFilteredSections.map((section) => (
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
              {/* Theme Toggle */}
              <button
                className="p-2 rounded hover:bg-muted transition-colors"
                aria-label="Toggle theme"
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {!mounted ? null : theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              {/* Language Icon */}
              {/* <button
                className="p-2 rounded hover:bg-muted transition-colors"
                aria-label="Language"
                type="button"
                // onClick={() => setChatOpen(true)}
              >
                <Languages className="w-5 h-5" />
              </button> */}
              <DropdownMenu open={languageOpen} onOpenChange={setLanguageOpen}>
                <DropdownMenuTrigger asChild>
                  <button
                    className="p-2 rounded hover:bg-muted transition-colors"
                    aria-label="Language"
                    type="button"
                  // onClick={() => setChatOpen(true)}
                  >
                    <Languages className="w-5 h-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Languages</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                      Arabic
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      English
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Notification Icon */}
              <RightSidebarTrigger />
            </div>
          </div>
        </header>
        <div className="flex flex-1 min-w-0 flex-col gap-4 p-4 pt-4">
          {children}
        </div>
      </SidebarInset>
      <NotificationSidebar />
    </SidebarProvider>
  );
}
