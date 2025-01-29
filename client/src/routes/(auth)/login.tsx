/**
 * @fileoverview Login page route configuration
 * Handles user authentication and login functionality
 */

// Library imports
import { createFileRoute } from "@tanstack/react-router";

// Page components
import LoginPage from "@/features/auth/pages/login";

/**
 * Type definition for login page URL search parameters
 */
interface LoginSearchParams {
  redirect?: string;
  registeredEmail?: string;
  status?: "registration_success";
}

/**
 * Route configuration for the login page
 * Includes search parameter validation and component rendering
 */
export const Route = createFileRoute("/(auth)/login")({
  component: () => (
    <main role="main" aria-label="Login page" className="min-h-screen w-full">
      <LoginPage />
    </main>
  ),
  // Validate and type URL search parameters
  validateSearch: (search: Record<string, unknown>): LoginSearchParams => {
    return {
      redirect: search.redirect as string | undefined,
      registeredEmail: search.registeredEmail as string | undefined,
      status: search.status as "registration_success" | undefined,
    };
  },
  // Add error boundary handling specific to login
  errorComponent: ({ error }) => (
    <div
      role="alert"
      className="flex min-h-screen items-center justify-center p-4"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Login Error</h1>
        <pre className="mt-4">{error.message}</pre>
      </div>
    </div>
  ),
});
