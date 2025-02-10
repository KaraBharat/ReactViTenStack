/**
 * @fileoverview Todo list route configuration
 * Renders the main todo list view with filtering and sorting capabilities
 */

// Library imports
import { createFileRoute } from "@tanstack/react-router";

// Page components
import TodosPage from "@/features/dashboard/pages/todos";

/**
 * Route configuration for the todo list page
 * Uses TanStack Router's file-based routing system
 */
export const Route = createFileRoute("/(app)/dashboard/todos/")({
  component: () => (
    <main role="main" aria-label="Todo list" className="min-h-screen w-full">
      <TodosPage />
    </main>
  ),
  // Add error boundary handling specific to todo list
  errorComponent: ({ error }: { error: Error }) => (
    <div
      role="alert"
      className="flex min-h-screen items-center justify-center p-4"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Error Loading Todos</h1>
        <pre className="mt-4">{error.message}</pre>
      </div>
    </div>
  ),
});
