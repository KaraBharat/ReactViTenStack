/**
 * @fileoverview Registration page route configuration
 * Handles new user registration functionality
 */

// Library imports
import { createFileRoute } from "@tanstack/react-router";

// Page components
import RegisterPage from "@/features/auth/pages/register";

/**
 * Route configuration for the user registration page
 * Uses TanStack Router's file-based routing system
 */
export const Route = createFileRoute("/(auth)/register")({
  component: () => (
    <main
      role="main"
      aria-label="Registration page"
      className="min-h-screen w-full"
    >
      <RegisterPage />
    </main>
  ),
  // Add error boundary handling specific to registration
  errorComponent: ({ error }) => (
    <div
      role="alert"
      className="flex min-h-screen items-center justify-center p-4"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Registration Error</h1>
        <pre className="mt-4">{error.message}</pre>
      </div>
    </div>
  ),
});
