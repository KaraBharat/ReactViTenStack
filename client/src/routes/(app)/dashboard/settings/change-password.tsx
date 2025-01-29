/**
 * @fileoverview Password change route configuration
 * Handles the password update functionality for authenticated users
 */

// Library imports
import { createFileRoute } from "@tanstack/react-router";

// Page components
import ChangePasswordPage from "@/features/dashboard/pages/profile/pages/change-password";

/**
 * Route configuration for the password change page
 * Uses TanStack Router's file-based routing system
 */
export const Route = createFileRoute(
  "/(app)/dashboard/settings/change-password",
)({
  component: () => (
    <main
      role="main"
      aria-label="Change password"
      className="min-h-screen w-full"
    >
      <ChangePasswordPage />
    </main>
  ),
  // Add error boundary handling specific to password change
  errorComponent: ({ error }) => (
    <div
      role="alert"
      className="flex min-h-screen items-center justify-center p-4"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Error Changing Password</h1>
        <pre className="mt-4">{error.message}</pre>
      </div>
    </div>
  ),
});
