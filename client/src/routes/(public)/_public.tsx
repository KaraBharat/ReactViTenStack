/**
 * @fileoverview Public layout route that provides the structure for public pages
 * Includes header, main content area, and footer components
 */

// Library imports
import { createFileRoute, Outlet } from "@tanstack/react-router";

// Shared components
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

/**
 * Public layout component that provides the structure for public routes
 */
function PublicLayout() {
  return (
    <div
      className="flex min-h-screen w-full flex-col"
      role="region"
      aria-label="Public content layout"
    >
      <Header />

      <main
        className="mx-auto w-full max-w-7xl flex-1"
        role="main"
        aria-label="Main content area"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

// Route configuration using TanStack Router
export const Route = createFileRoute("/(public)/_public")({
  component: PublicLayout,
  // Add error boundary handling for public routes
  errorComponent: ({ error }: { error: Error }) => (
    <div role="alert" className="p-4">
      <h1>Error</h1>
      <pre>{error.message}</pre>
    </div>
  ),
});
