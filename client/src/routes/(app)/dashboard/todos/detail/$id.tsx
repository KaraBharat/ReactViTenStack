/**
 * @fileoverview Todo detail route configuration
 * Displays detailed view of individual todo items
 */

// Library imports
import { createFileRoute } from "@tanstack/react-router";

// Page components
import TodoDetailPage from "@/features/dashboard/pages/todos/todo-detail";

/**
 * Route configuration for the todo detail page
 * Uses TanStack Router's file-based routing system
 */
export const Route = createFileRoute("/(app)/dashboard/todos/detail/$id")({
  component: () => {
    // Get todo ID from route parameters
    const { id } = Route.useParams();

    return (
      <main
        role="main"
        aria-label={`Todo details for item ${id}`}
        className="min-h-screen w-full"
      >
        <TodoDetailPage todoId={id} />
      </main>
    );
  },
  // Add error boundary handling specific to todo details
  errorComponent: ({ error }) => (
    <div
      role="alert"
      className="flex min-h-screen items-center justify-center p-4"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Error Loading Todo Details</h1>
        <pre className="mt-4">{error.message}</pre>
      </div>
    </div>
  ),
});
