// External library imports
import { Navigate, useLocation } from "@tanstack/react-router";

// Internal imports
import { useAuth } from "@/providers/auth.provider";
import { LoadingOverlay } from "../shared/loading-overlay";
import { cn } from "@/lib/utils";
import { AuthState } from "@/types/auth.types";

interface RouteGuardProps {
  children: React.ReactNode;
}

/**
 * RouteGuard Component
 * Protects routes by checking authentication state and managing loading states
 *
 * @param {RouteGuardProps} props - Component props
 */
export const RouteGuard = ({ children }: RouteGuardProps) => {
  const { authState } = useAuth();
  const location = useLocation();

  // Redirect to login if user is not authenticated
  if (authState === AuthState.UNAUTHENTICATED) {
    return (
      <Navigate
        to="/login"
        search={{
          redirect: location.pathname,
        }}
        aria-label="Redirecting to login page"
      />
    );
  }

  const isAuthenticating = authState === AuthState.AUTHENTICATING;

  return (
    <div className="relative flex flex-1" role="main">
      <LoadingOverlay
        isLoading={isAuthenticating}
        showLoader={false}
        variant="light"
        aria-busy={isAuthenticating}
      />
      <div
        className={cn(
          "flex w-full transition-opacity duration-200",
          isAuthenticating && "pointer-events-none select-none opacity-50",
        )}
        aria-hidden={isAuthenticating}
      >
        {children}
      </div>
    </div>
  );
};
