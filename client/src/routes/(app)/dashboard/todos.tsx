/**
 * @fileoverview Todos page route configuration
 * Displays the todos management interface with list and task organization
 */

// Library imports
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ListTodo } from "lucide-react";

/**
 * TodosLayout component that provides the structure for the todos section
 * Includes header section and content area for todo management
 */
function TodosLayout() {
  return (
    <section
      className="flex w-full flex-col justify-center px-0 sm:px-8"
      role="region"
      aria-labelledby="todos-heading"
    >
      {/* Header Section */}
      <header className="mb-4 border-b border-neutral-100 pb-4" role="banner">
        <div className="mb-2 flex items-center gap-2">
          <ListTodo className="h-6 w-6 text-neutral-600" aria-hidden="true" />
          <h1 id="todos-heading" className="text-2xl font-bold">
            Todos
          </h1>
        </div>
        <p className="text-muted-foreground">
          Manage and organize your tasks efficiently
        </p>
      </header>

      {/* Content Area */}
      <div role="main" className="todos-content">
        <Outlet />
      </div>
    </section>
  );
}

/**
 * Route configuration for the todos section
 * Includes error handling and component rendering
 */
export const Route = createFileRoute("/(app)/dashboard/todos")({
  component: TodosLayout,
  // Add error boundary handling for todos section
  errorComponent: ({ error }) => (
    <div role="alert" className="p-4">
      <h2 className="text-xl font-bold">Error Loading Todos</h2>
      <pre className="mt-4">{error.message}</pre>
    </div>
  ),
});
