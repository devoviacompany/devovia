/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { sidebarNavData } from "./sidebar-nav-config";
import { Button } from "@/components/ui/button";
import { File, FilePen, Folder, Pencil, MonitorSmartphone, Database, Brain, ServerCog } from "lucide-react";
import { useWorkspaceId } from "@/hooks";
import useProjectId from "@/hooks/workspace/use-project-id";
import Link from "next/link";
import { CodeFilesSidebarContent } from "./code-files-sidebar";

export function ProjectsSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  const router = useRouter();
  const projectIdFromRoute = useProjectId();

  const [projects, setProjects] = React.useState(
    [
      { id: "project-1111", name: "Project 1" },
      { id: "project-2222", name: "Project 2" },
      { id: "project-3333", name: "Project 3" },
    ] satisfies { id: string; name: string }[]
  );
  const [selectedSectionKey, setSelectedSectionKey] = React.useState<string | null>(null);
  const [editingProjectId, setEditingProjectId] = React.useState<string | null>(null);
  const [editingName, setEditingName] = React.useState<string>("");

  const hasProjectSelected = !!projectIdFromRoute;
  const project = projects.find((p) => p.id === projectIdFromRoute);
  const projectName = project?.name ?? "Select a project";

  const getSectionKeyFromUrl = (url: string) => {
    const segments = url.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    // root path /:workspaceId/projects/:projectId maps to Dashboard
    if (last === ":projectId") return "dashboard";
    return last;
  };

  const sections = sidebarNavData.projects.map((item) => ({
    key: getSectionKeyFromUrl(item.url),
    title: item.title,
    icon: item.icon,
  }));

  // Derive current section from URL when possible
  const segments = pathname.split("/").filter(Boolean);
  const workspaceIndex = workspaceId ? segments.indexOf(`${workspaceId}`) : -1;
  let sectionFromPath: string | undefined;
  if (workspaceIndex >= 0 && segments.length > workspaceIndex + 3) {
    sectionFromPath = segments[workspaceIndex + 3];
  }

  const activeSectionKey = sectionFromPath || selectedSectionKey || "dashboard";
  const activeSection = sections.find((s) => s.key === activeSectionKey);
  const sectionTitle = hasProjectSelected ? activeSection?.title : undefined;

  // Fake planning items for now – later will come from backend
  const planningItems = [
    { id: "plan-1", name: "Plan 1" },
    { id: "plan-2", name: "Plan 2" },
    { id: "plan-3", name: "Plan 3" },
  ];

  // Fake design files for now – later will come from backend
  const designItems = [
    { id: "file-1", name: "File 1" },
    { id: "file-2", name: "File 2" },
    { id: "file-3", name: "File 3" },
  ];

  // Fixed testing areas for now – later can be dynamic
  const testingItems = [
    { id: "frontend", name: "Frontend", icon: MonitorSmartphone },
    { id: "backend", name: "Backend", icon: ServerCog },
    { id: "ai", name: "AI", icon: Brain },
  ];

  // Fixed deployment areas for now – later can be dynamic
  const deploymentItems = [
    { id: "frontend", name: "Frontend Host", icon: MonitorSmartphone },
    { id: "backend", name: "Backend Server", icon: ServerCog },
    { id: "database", name: "Database Server", icon: Database },
    { id: "ai", name: "AI Server", icon: Brain },
  ];

  const handleAddProject = () => {
    const nextIndex = projects.length + 1;
    const newProject = {
      id: `project${nextIndex}`,
      name: `Project ${nextIndex}`,
    };
    setProjects((prev) => [...prev, newProject]);
    setSelectedSectionKey("dashboard");
    setEditingProjectId(newProject.id);
    setEditingName(newProject.name);

    // Navigate to the new project's dashboard route
    const dashboardTemplate = sidebarNavData.projects[0]?.url ?? "/workspace/:workspaceId/projects/:projectId";
    const href = dashboardTemplate
      .replace(":workspaceId", workspaceId || "workspace")
      .replace(":projectId", newProject.id);
    router.push(href);
  };

  const handleStartEdit = (projectId: string, currentName: string) => {
    setEditingProjectId(projectId);
    setEditingName(currentName);
  };

  const handleCommitEdit = () => {
    if (!editingProjectId) return;
    setProjects((prev) =>
      prev.map((p) => (p.id === editingProjectId ? { ...p, name: editingName.trim() || p.name } : p))
    );
    setEditingProjectId(null);
  };

  const getSectionHref = (sectionKey: string) => {
    const sectionTemplate = sidebarNavData.projects.find(
      (item) => getSectionKeyFromUrl(item.url) === sectionKey
    )?.url;

    if (!sectionTemplate) {
      return `/workspace/${workspaceId}/projects/${projectIdFromRoute}`;
    }

    return sectionTemplate
      .replace(":workspaceId", workspaceId || "workspace")
      .replace(":projectId", projectIdFromRoute || "project1");
  };

  const getProjectHref = () => {
    if (!workspaceId) return `/workspace/projects/${projectIdFromRoute || "project1"}`;
    return `/workspace/${workspaceId}/projects/${projectIdFromRoute || "project1"}`;
  };

  return (
    <Sidebar collapsible="none" className="hidden flex-1 md:flex" {...props}>
      <SidebarHeader className="gap-2 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList className="flex-nowrap overflow-x-auto py-1 scrollbar-hide text-sm">
              <BreadcrumbItem className="whitespace-nowrap">
                <BreadcrumbLink
                  href={workspaceId ? `/workspace/${workspaceId}/projects` : '/workspace/projects'}
                  className="font-medium text-foreground"
                >
                  Projects
                </BreadcrumbLink>
              </BreadcrumbItem>
              {hasProjectSelected && (
                <>
                  <BreadcrumbSeparator className="mx-1" />
                  <BreadcrumbItem className="whitespace-nowrap">
                    <BreadcrumbLink
                      className="font-medium text-foreground"
                      href={getProjectHref()}
                      onClick={(e) => {
                        e.preventDefault();
                        // Reset to dashboard section when going back to project root
                        setSelectedSectionKey("dashboard");
                        router.push(getProjectHref());
                      }}
                    >
                      {projectName}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {sectionTitle && (
                    <>
                      <BreadcrumbSeparator className="mx-1" />
                      <BreadcrumbItem className="whitespace-nowrap">
                        <BreadcrumbLink
                          className="font-medium text-foreground"
                          href={getSectionHref(activeSectionKey)}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedSectionKey(activeSectionKey);
                            router.push(getSectionHref(activeSectionKey));
                          }}
                        >
                          {sectionTitle}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </>
                  )}
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {/* <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 shrink-0"
                onClick={handleAddProject}
                aria-label="Add project"
              >
                <Plus className="h-4 w-4" />
              </Button> */}
              {/* If no project selected, show list of projects */}
              {!hasProjectSelected &&
                projects.map((p) => {
                  const isActive = projectIdFromRoute === p.id;
                  const isEditing = editingProjectId === p.id;
                  return (
                    <SidebarMenuItem key={p.id}>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/workspace/${workspaceId}/projects/${p.id}`}
                          className="flex-1"
                        >
                          <SidebarMenuButton
                            isActive={isActive}
                            className="px-2.5 md:px-2"
                            onClick={() => {
                              setSelectedSectionKey("dashboard");
                              router.push(`/workspace/${workspaceId}/projects/${p.id}`);
                            }}
                          >
                            <Folder className="mr-2 h-4 w-4" />
                            {isEditing ? (
                              <input
                                className="bg-transparent text-sm outline-none"
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                onBlur={handleCommitEdit}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleCommitEdit();
                                  }
                                }}
                                autoFocus
                              />
                            ) : (
                              <span>{p.name}</span>
                            )}
                          </SidebarMenuButton>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleStartEdit(p.id, p.name)}
                          aria-label="Edit project name"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </SidebarMenuItem>
                  );
                })}

              {/* If a project is selected, show its sections or nested items */}
              {hasProjectSelected &&
                activeSectionKey !== "planning" &&
                activeSectionKey !== "design" &&
                activeSectionKey !== "development" &&
                activeSectionKey !== "testing" &&
                activeSectionKey !== "deployment" &&
                sections.map((section) => {
                  const sectionTemplate = sidebarNavData.projects.find(
                    (item) => getSectionKeyFromUrl(item.url) === section.key
                  )?.url;
                  const href = (sectionTemplate ?? "/workspace/:workspaceId/projects/:projectId")
                    .replace(":workspaceId", workspaceId || "workspace")
                    .replace(":projectId", projectIdFromRoute || "project1");
                  const isActive = pathname === href;
                  return (
                    <SidebarMenuItem key={section.key}>
                      <SidebarMenuButton
                        isActive={isActive}
                        className="px-2.5 md:px-2"
                        onClick={() => {
                          setSelectedSectionKey(section.key!);
                          router.push(href);
                        }}
                      >
                        <section.icon />
                        <span>{section.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}

              {hasProjectSelected && activeSectionKey === "planning" &&
                planningItems.map((plan) => {
                  const href = `/workspace/${workspaceId}/projects/${projectIdFromRoute}/planning/${plan.id}`;
                  const isActive = pathname === href;
                  return (
                    <SidebarMenuItem key={plan.id}>
                      <SidebarMenuButton
                        isActive={isActive}
                        className="px-2.5 md:px-2"
                        onClick={() => {
                          router.push(href);
                        }}
                      >
                        <File className="h-4 w-4" />
                        <span>{plan.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}

              {hasProjectSelected && activeSectionKey === "design" &&
                designItems.map((file) => {
                  const href = `/workspace/${workspaceId}/projects/${projectIdFromRoute}/design/${file.id}`;
                  const isActive = pathname === href;
                  return (
                    <SidebarMenuItem key={file.id}>
                      <SidebarMenuButton
                        isActive={isActive}
                        className="px-2.5 md:px-2"
                        onClick={() => {
                          router.push(href);
                        }}
                      >
                        <FilePen className="h-4 w-4" />
                        <span>{file.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}

              {hasProjectSelected && activeSectionKey === "development" && (
                <CodeFilesSidebarContent />
              )}

              {hasProjectSelected && activeSectionKey === "testing" &&
                testingItems.map((item) => {
                  const href = `/workspace/${workspaceId}/projects/${projectIdFromRoute}/testing/${item.id}`;
                  const isActive = pathname === href;
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={isActive}
                        className="px-2.5 md:px-2"
                        onClick={() => {
                          router.push(href);
                        }}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}

              {hasProjectSelected && activeSectionKey === "deployment" &&
                deploymentItems.map((item) => {
                  const href = `/workspace/${workspaceId}/projects/${projectIdFromRoute}/deployment/${item.id}`;
                  const isActive = pathname === href;
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={isActive}
                        className="px-2.5 md:px-2"
                        onClick={() => {
                          router.push(href);
                        }}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
