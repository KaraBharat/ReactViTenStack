/**
 * @fileoverview Documentation page route configuration
 * Renders the documentation page for public users
 */

// Library imports
import { createFileRoute } from "@tanstack/react-router";

// Page components
import DocsPage from "@/features/public/pages/docs";

/**
 * Route configuration for the public documentation page
 * Uses TanStack Router's file-based routing system
 */
export const Route = createFileRoute("/(public)/_public/docs")({
  component: () => (
    <main
      role="main"
      aria-label="Documentation content"
      className="min-h-screen w-full"
    >
      <DocsPage />
    </main>
  ),
  // Add error boundary handling specific to documentation page
  errorComponent: ({ error }: { error: Error }) => (
    <div
      role="alert"
      className="flex min-h-screen items-center justify-center p-4"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Error Loading Documentation</h1>
        <pre className="mt-4">{error.message}</pre>
      </div>
    </div>
  ),
});
