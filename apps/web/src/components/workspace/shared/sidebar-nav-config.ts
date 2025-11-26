import {
  LayoutDashboard,
  LifeBuoy,
  Send,
  Settings2,
  BugPlay,
  Server,
  Waypoints,
  Palette,
  AppWindowMac,
  CircleUser,
  Zap,
  FolderKanban,
  ChartColumn,
} from "lucide-react";

export const sidebarNavData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  roles: {
    portfolio: "Portfolio",
  },
  navMain: [
    {
      title: "Home",
      url: "/:workspaceId",
      icon: FolderKanban,
      isActive: true,
    },
    {
      title: "Projects",
      url: "/:workspaceId/projects",
      icon: Zap,
      isActive: false,
    },
    {
      title: "Account",
      url: "/:workspaceId/account",
      icon: CircleUser,
      isActive: false,
    },
    {
      title: "Settings",
      url: "/:workspaceId/settings",
      icon: Settings2,
      isActive: false,
    },
  ],
  app: [
    {
      title: "Support",
      url: "/:workspaceId/support",
      icon: LifeBuoy,
      isActive: false,
    },
    {
      title: "Feedback",
      url: "/:workspaceId/feedback",
      icon: Send,
      isActive: false,
    },
  ],
  projects: [
    {
      title: "Dashboard",
      url: "/:workspaceId/projects/:projectId",
      icon: LayoutDashboard,
    },
    {
      title: "Analytics",
      url: "/:workspaceId/projects/:projectId/analytics",
      icon: ChartColumn,
    },
    {
      title: "Planning",
      url: "/:workspaceId/projects/:projectId/planning",
      icon: Waypoints
    },
    {
      title: "Design",
      url: "/:workspaceId/projects/:projectId/design",
      icon: Palette
    },
    {
      title: "Development",
      url: "/:workspaceId/projects/:projectId/development",
      icon: AppWindowMac
    },
    {
      title: "Testing",
      url: "/:workspaceId/projects/:projectId/testing",
      icon: BugPlay
    },
    {
      title: "Deployment",
      url: "/:workspaceId/projects/:projectId/deployment",
      icon: Server
    },
    {
      title: "Settings",
      url: "/:workspaceId/projects/:projectId/settings",
      icon: Settings2
    },
  ],
};
