import { LayoutDashboard, ListTodo, Settings } from "lucide-react";

export const NAVIGATION_ITEMS = [
  {
    title: "Home",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Todos",
    url: "/dashboard/todos",
    matchUrls: [
      "/dashboard/todos/new",
      "/dashboard/todos/edit",
      "/dashboard/todos/detail",
    ],
    icon: ListTodo,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    matchUrls: [
      "/dashboard/settings/user-profile",
      "/dashboard/settings/change-password",
    ],
    icon: Settings,
  },
];
