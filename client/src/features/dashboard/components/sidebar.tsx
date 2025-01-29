// External dependencies
import * as React from "react";
import { Link } from "@tanstack/react-router";

// UI Components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppLogo } from "@/components/shared/app-logo";

// Navigation Components
import { AppNavMain } from "./nav-main";
import { AppNavUser } from "./nav-user";

// Utilities and Hooks
import { useAuth } from "@/providers/auth.provider";
import { cn } from "@/lib/utils";

/**
 * AppSidebar - Main navigation sidebar component
 * Provides collapsible navigation with header, main content, and user footer
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className={cn("flex w-full items-center py-2", open && "px-2")}>
          <Link to="/dashboard">
            <AppLogo />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <AppNavMain />
      </SidebarContent>
      {user && (
        <SidebarFooter>
          <AppNavUser user={user} />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}