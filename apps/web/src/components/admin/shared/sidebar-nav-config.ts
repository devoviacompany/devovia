import {
  LifeBuoy,
  Settings2,
  CircleUser,
  Zap,
  FolderKanban,
} from "lucide-react";

export const sidebarNavData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  roles: {
    admin: "admin",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/:adminId",
      icon: FolderKanban,
      isActive: true,
    },
    {
      title: "Projects",
      url: "/admin/:adminId/projects",
      icon: Zap,
      isActive: false,
    },
    {
      title: "Account",
      url: "/admin/:adminId/account",
      icon: CircleUser,
      isActive: false,
    },
    {
      title: "Settings",
      url: "/admin/:adminId/settings",
      icon: Settings2,
      isActive: false,
    },
  ],
  app: [
    {
      title: "Support",
      url: "/admin/:adminId/support",
      icon: LifeBuoy,
      isActive: false,
    }
  ],
};
