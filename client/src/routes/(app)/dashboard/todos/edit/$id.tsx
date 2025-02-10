/**
 * @fileoverview Todo edit route configuration
 * Handles the editing interface for individual todo items
 */

// Library imports
import { createFileRoute } from "@tanstack/react-router";

// Page components
import TodoEditPage from "@/features/dashboard/pages/todos/todo-edit";

/**
 * Route configuration for the todo edit page
 * Uses TanStack Router's file-based routing system
 */
export const Route = createFileRoute("/(app)/dashboard/todos/edit/$id")({
  component: () => {
    // Get todo ID from route parameters
    const { id } = Route.useParams();

    return (
      <main
        role="main"
        aria-label={`Edit todo ${id}`}
        className="min-h-screen w-full"
      >
        <TodoEditPage todoId={id} />
      </main>
    );
  },
  // Add error boundary handling specific to todo editing
  errorComponent: ({ error }: { error: Error }) => (
    <div
      role="alert"
      className="flex min-h-screen items-center justify-center p-4"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Error Editing Todo</h1>
        <pre className="mt-4">{error.message}</pre>
      </div>
    </div>
  )
});
