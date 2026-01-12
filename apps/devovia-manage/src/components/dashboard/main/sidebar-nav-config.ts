import {
  LifeBuoy,
  Send,
  User,
  BookOpen,
  MonitorCog,
  ShieldCheck,
  Combine,
  Gauge,
  CirclePower,
} from "lucide-react";

export const sidebarNavData = {
  userData: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/images/avatars/avatar4.avif",
  },
  roles: {
    admin: "Admin",
    developer: "Developer",
    customerSupport: "Customer Support",
  },
  admin: [
    {
      title: "System Overview",
      url: "/dashboard",
      icon: MonitorCog,
      isActive: true,
    },
    {
      title: "Health Tracking",
      url: "/dashboard/health-tracking",
      icon: CirclePower,
      isActive: true,
    },
    {
      title: "Logging & Monitoring",
      url: "/dashboard/logging-monitoring",
      icon: Combine
    },
    {
      title: "Security Logs",
      url: "/dashboard/security-logs",
      icon: ShieldCheck
    },
    {
      title: "Performance Metrics",
      url: "/dashboard/performance-metrics",
      icon: Gauge
    },
    {
      title: "User Management",
      url: "/dashboard/user-management",
      icon: User
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: BookOpen
    },
  ],
  developer: [
  ],
  customerSupport: [
    {
      title: "Support Management",
      url: "/dashboard/support-management",
      icon: LifeBuoy
    },
    {
      title: "Feedback Management",
      url: "/dashboard/feedback-management",
      icon: Send
    },
  ],
};
