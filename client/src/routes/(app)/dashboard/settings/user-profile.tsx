/**
 * @fileoverview User profile settings route configuration
 * Handles the user profile management and settings interface
 */

// Library imports
import { createFileRoute } from "@tanstack/react-router";

// Page components
import UpdateProfilePage from "@/features/dashboard/pages/profile/pages/update-profile";

/**
 * Route configuration for the user profile settings page
 * Uses TanStack Router's file-based routing system
 */
export const Route = createFileRoute("/(app)/dashboard/settings/user-profile")({
  component: () => (
    <main
      role="main"
      aria-label="User profile settings"
      className="min-h-screen w-full"
    >
      <UpdateProfilePage />
    </main>
  ),
  // Add error boundary handling specific to profile settings
  errorComponent: ({ error }: { error: Error }) => (
    <div
      role="alert"
      className="flex min-h-screen items-center justify-center p-4"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Error Loading Profile Settings</h1>
        <pre className="mt-4">{error.message}</pre>
      </div>
    </div>
  ),
});
