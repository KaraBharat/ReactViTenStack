import { createContext, useContext, useEffect, useState } from "react";

// External imports
import { SelectUser } from "@server/src/types/users.types";

// Feature imports
import { useAuthUser } from "@/features/auth/queries/auth.get.queries";
import { useLogout } from "@/features/auth/queries/auth.update.queries";
import { AuthState } from "@/types/auth.types";

// Document the interface
/**
 * Authentication context type definition
 * @property {SelectUser | null | undefined} user - Current authenticated user
 * @property {AuthState} authState - Current authentication state
 * @property {Function} setAuthState - Updates the authentication state
 * @property {Function} logout - Handles user logout
 * @property {Function} refetch - Refreshes authentication data
 */
interface AuthContextType {
  user: SelectUser | null | undefined;
  authState: AuthState;
  setAuthState: (state: AuthState) => void;
  logout: () => void;
  refetch: () => void;
}

// Initialize with meaningful default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  authState: AuthState.IDLE,
  setAuthState: () => console.warn("AuthContext not initialized"),
  logout: () => console.warn("AuthContext not initialized"),
  refetch: () => console.warn("AuthContext not initialized"),
});

/**
 * Authentication Provider Component
 * Manages authentication state and user data throughout the application
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.IDLE);
  const { data: user, isError, isLoading, refetch } = useAuthUser();
  const logoutMutation = useLogout();

  /**
   * Handles user logout process
   * Attempts to logout via mutation and updates auth state
   */
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setAuthState(AuthState.UNAUTHENTICATED);
    }
  };

  // Monitor authentication state changes
  useEffect(() => {
    if (isLoading) return;

    const newAuthState =
      user && !isError ? AuthState.AUTHENTICATED : AuthState.UNAUTHENTICATED;

    setAuthState(newAuthState);

    if (isError) {
      handleLogout();
    }
  }, [user, isError, isLoading]);

  const contextValue = {
    user: user?.data ?? undefined,
    authState: isLoading ? AuthState.AUTHENTICATING : authState,
    setAuthState,
    logout: handleLogout,
    refetch,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

/**
 * Custom hook to access authentication context
 * @throws {Error} When used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
