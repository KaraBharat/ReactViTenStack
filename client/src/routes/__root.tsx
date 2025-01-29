/**
 * @fileoverview Root route configuration for the application
 * Provides essential providers and layout structure
 */

// Library imports
import { Outlet, createRootRoute } from "@tanstack/react-router";

// Application providers
import { QueryProviders } from "@/providers/query.provider";
import { AuthProvider } from "@/providers/auth.provider";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * Root layout component that wraps the entire application
 * Provides necessary context providers and base layout structure
 */
const RootLayout = () => {
  return (
    <main
      className="flex min-h-screen w-full"
      role="main"
      aria-label="Main application layout"
    >
      <QueryProviders>
        <TooltipProvider delayDuration={200}>
          <AuthProvider>
            <div className="flex min-h-screen w-full">
              <Outlet />
            </div>
          </AuthProvider>
        </TooltipProvider>
      </QueryProviders>
    </main>
  );
};

// Root route configuration
export const Route = createRootRoute({
  component: RootLayout,
  // Add error boundary handling
  errorComponent: ({ error }) => (
    <div role="alert" className="p-4">
      <h1>Error</h1>
      <pre>{error.message}</pre>
    </div>
  ),
});
