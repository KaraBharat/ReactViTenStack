/**
 * @fileoverview Settings page route configuration
 * Displays the user account settings and preferences interface
 */

// Library imports
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { User } from "lucide-react";

/**
 * SettingsLayout component that provides the structure for the settings section
 * Includes header section and content area for account management
 */
function SettingsLayout() {
  return (
    <section
      className="flex w-full flex-col justify-center px-0 sm:px-8"
      role="region"
      aria-labelledby="settings-heading"
    >
      {/* Header Section */}
      <header className="mb-4 border-b border-neutral-100 pb-4" role="banner">
        <div className="mb-2 flex items-center gap-2">
          <User className="h-6 w-6 text-neutral-600" aria-hidden="true" />
          <h1 id="settings-heading" className="text-2xl font-bold">
            Account Settings
          </h1>
        </div>
        <p className="text-muted-foreground" id="settings-description">
          Manage your account settings and preferences here
        </p>
      </header>

      {/* Settings Content Area */}
      <div
        role="main"
        aria-describedby="settings-description"
        className="settings-content"
      >
        <Outlet />
      </div>
    </section>
  );
}

/**
 * Route configuration for the settings section
 * Includes error handling and component rendering
 */
export const Route = createFileRoute("/(app)/dashboard/settings")({
  component: SettingsLayout,
  // Add error boundary handling for settings section
  errorComponent: ({ error }) => (
    <div role="alert" className="p-4">
      <h2 className="text-xl font-bold">Error Loading Settings</h2>
      <pre className="mt-4">{error.message}</pre>
    </div>
  ),
});
