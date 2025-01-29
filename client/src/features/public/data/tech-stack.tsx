import { Database, Server } from "lucide-react";

import { Layout } from "lucide-react";

import { Zap } from "lucide-react";

export const TECH_STACK = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Vite + React",
    description:
      "Lightning-fast build tool with React for modern web development",
  },
  {
    icon: <Layout className="h-6 w-6" />,
    title: "Shadcn UI",
    description:
      "Beautiful and accessible components built with Radix UI and Tailwind",
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "TanStack Suite",
    description: "Powerful tools for routing, data management, and tables",
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: "HonoJS + Drizzle",
    description: "Fast backend with type-safe database operations",
  },
];
