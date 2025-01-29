/**
 * @fileoverview Public landing page route configuration
 * Renders the main landing page component for public users
 */

// Library imports
import { createFileRoute } from "@tanstack/react-router";

// Page components
import LandingPage from "@/features/public/pages/landing";

/**
 * Route configuration for the public landing page
 * Uses TanStack Router's file-based routing system
 */
export const Route = createFileRoute("/(public)/_public/")({
  component: () => (
    <main
      role="main"
      aria-label="Landing page content"
      className="min-h-screen w-full"
    >
      <LandingPage />
    </main>
  ),
  // Add error boundary handling specific to landing page
  errorComponent: ({ error }) => (
    <div
      role="alert"
      className="flex min-h-screen items-center justify-center p-4"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Error Loading Landing Page</h1>
        <pre className="mt-4">{error.message}</pre>
      </div>
    </div>
  ),
});
