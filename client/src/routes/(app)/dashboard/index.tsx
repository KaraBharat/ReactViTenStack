/**
 * @fileoverview Dashboard index route configuration
 * Renders the main dashboard overview page with key metrics and summaries
 */

// Library imports
import { createFileRoute } from "@tanstack/react-router";

// Page components
import DashboardPage from "@/features/dashboard/pages/dashboard";

/**
 * Route configuration for the main dashboard page
 * Uses TanStack Router's file-based routing system
 */
export const Route = createFileRoute("/(app)/dashboard/")({
  component: () => (
    <main
      role="main"
      aria-label="Dashboard overview"
      className="min-h-screen w-full"
    >
      <DashboardPage />
    </main>
  ),
  // Add error boundary handling specific to dashboard overview
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
