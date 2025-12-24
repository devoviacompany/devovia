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
    workspace: "Workspace",
  },
  navMain: [
    {
      title: "Home",
      url: "/workspace/:workspaceId",
      icon: FolderKanban,
      isActive: true,
    },
    {
      title: "Projects",
      url: "/workspace/:workspaceId/projects",
      icon: Zap,
      isActive: false,
    },
    {
      title: "Account",
      url: "/workspace/:workspaceId/account",
      icon: CircleUser,
      isActive: false,
    },
    {
      title: "Settings",
      url: "/workspace/:workspaceId/settings",
      icon: Settings2,
      isActive: false,
    },
  ],
  app: [
    {
      title: "Support",
      url: "/workspace/:workspaceId/support",
      icon: LifeBuoy,
      isActive: false,
    },
    {
      title: "Feedback",
      url: "/workspace/:workspaceId/feedback",
      icon: Send,
      isActive: false,
    },
  ],
  projects: [
    {
      title: "Dashboard",
      url: "/workspace/:workspaceId/projects/:projectId",
      icon: LayoutDashboard,
    },
    {
      title: "Analytics",
      url: "/workspace/:workspaceId/projects/:projectId/analytics",
      icon: ChartColumn,
    },
    {
      title: "Planning",
      url: "/workspace/:workspaceId/projects/:projectId/planning",
      icon: Waypoints
    },
    {
      title: "Design",
      url: "/workspace/:workspaceId/projects/:projectId/design",
      icon: Palette
    },
    {
      title: "Development",
      url: "/workspace/:workspaceId/projects/:projectId/development",
      icon: AppWindowMac
    },
    {
      title: "Testing",
      url: "/workspace/:workspaceId/projects/:projectId/testing",
      icon: BugPlay
    },
    {
      title: "Deployment",
      url: "/workspace/:workspaceId/projects/:projectId/deployment",
      icon: Server
    },
    {
      title: "Settings",
      url: "/workspace/:workspaceId/projects/:projectId/settings",
      icon: Settings2
    },
  ],
};
