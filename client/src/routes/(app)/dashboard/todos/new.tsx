/**
 * @fileoverview New Todo creation route configuration
 * Renders the form for creating new todo items
 */

// Library imports
import { createFileRoute } from "@tanstack/react-router";

// Page components
import TodoNewPage from "@/features/dashboard/pages/todos/todo-new";

/**
 * Route configuration for the new todo creation page
 * Uses TanStack Router's file-based routing system
 */
export const Route = createFileRoute("/(app)/dashboard/todos/new")({
  component: () => (
    <main
      role="main"
      aria-label="Create new todo"
      className="min-h-screen w-full"
    >
      <TodoNewPage />
    </main>
  ),
  // Add error boundary handling specific to todo creation
  errorComponent: ({ error }: { error: Error }) => (
    <div
      role="alert"
      className="flex min-h-screen items-center justify-center p-4"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Error Creating Todo</h1>
        <pre className="mt-4">{error.message}</pre>
      </div>
    </div>
  ),
});
