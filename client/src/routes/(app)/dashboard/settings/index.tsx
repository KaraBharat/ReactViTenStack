/**
 * @fileoverview Settings route configuration
 * Handles password changes, user profile settings
 */

// Third-party imports
import { createFileRoute } from "@tanstack/react-router";

// Page components
import SettingsPage from "@/features/dashboard/pages/profile";

/**
 * Route configuration for the  settings page
 * Uses TanStack Router's file-based routing system
 */
export const Route = createFileRoute("/(app)/dashboard/settings/")({
  component: () => (
    <main
      role="main"
      aria-label="User profile settings"
      className="min-h-screen w-full"
    >
      <SettingsPage />
    </main>
  ),
  // Add error boundary handling specific to user profile settings
  errorComponent: ({ error }: { error: Error }) => (
    <div
      role="alert"
      className="flex min-h-screen items-center justify-center p-4"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Error Loading User Profile Settings
        </h1>
        <pre className="mt-4">{error.message}</pre>
      </div>
    </div>
  ),
});
