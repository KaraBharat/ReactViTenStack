/**
 * @fileoverview Main application component that sets up routing using TanStack Router
 */

// Library imports
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Route configuration
import { routeTree } from "./routeTree.gen";

// Initialize router with route configuration
const router = createRouter({
  routeTree,
  // Enable default error boundaries for route error handling
  defaultErrorComponent: ({ error }) => (
    <div role="alert" className="error-boundary">
      <h1>Error</h1>
      <pre>{error.message}</pre>
    </div>
  ),
});

// Type registration for TanStack Router
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

/**
 * Root application component that provides routing functionality
 */
function App() {
  return (
    <RouterProvider
      router={router}
      // Provide fallback UI during route transitions
      defaultPendingComponent={() => (
        <div role="status" aria-label="Loading">
          Loading...
        </div>
      )}
    />
  );
}

export default App;
