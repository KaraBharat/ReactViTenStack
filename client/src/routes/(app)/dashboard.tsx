/**
 * @fileoverview Dashboard layout route configuration
 * Provides the main application layout structure with sidebar and header
 */

// Library imports
import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout components
import { SidebarInset } from "@/components/ui/sidebar";
import { AppHeader } from "@/features/dashboard/components/header";
import { AppSidebar } from "@/features/dashboard/components/sidebar";

// Auth components
import { RouteGuard } from "@/components/auth/route-guard";

/**
 * Dashboard layout component that provides the structure for authenticated routes
 * Includes sidebar navigation, header, and main content area
 */
function DashboardLayout() {
  return (
    <div className="w-full" role="application" aria-label="Dashboard layout">
      <RouteGuard>
        {/* Navigation sidebar */}
        <AppSidebar />

        {/* Main content area with header */}
        <SidebarInset>
          <AppHeader />
          <main
            className="flex w-full flex-col gap-4 p-4 sm:p-4 sm:pt-0"
            role="main"
            aria-label="Dashboard content"
          >
            <Outlet />
          </main>
        </SidebarInset>
      </RouteGuard>
    </div>
  );
}

/**
 * Route configuration for the dashboard layout
 * Includes authentication guard and error handling
 */
export const Route = createFileRoute("/(app)/dashboard")({
  component: DashboardLayout,
  // Add error boundary handling for dashboard
  errorComponent: ({ error }: { error: Error }) => (
    <div
      role="alert"
      className="flex min-h-screen items-center justify-center p-4"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Dashboard Error</h1>
        <pre className="mt-4">{error.message}</pre>
      </div>
    </div>
  ),
});
