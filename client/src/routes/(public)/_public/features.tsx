/**
 * @fileoverview Features page route configuration
 * Renders the features showcase page for public users
 */

// Library imports
import { createFileRoute } from "@tanstack/react-router";

// Page components
import FeaturesPage from "@/features/public/pages/features";

/**
 * Route configuration for the public features page
 * Uses TanStack Router's file-based routing system
 */
export const Route = createFileRoute("/(public)/_public/features")({
  component: () => (
    <main
      role="main"
      aria-label="Features page content"
      className="min-h-screen w-full"
    >
      <FeaturesPage />
    </main>
  ),
  // Add error boundary handling specific to features page
  errorComponent: ({ error }) => (
    <div
      role="alert"
      className="flex min-h-screen items-center justify-center p-4"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Error Loading Features Page</h1>
        <pre className="mt-4">{error.message}</pre>
      </div>
    </div>
  ),
});
