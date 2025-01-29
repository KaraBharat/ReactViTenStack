// Library dependencies
import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Internal dependencies
import { loginSchema } from "../schemas/auth.schema";
import { useAuth } from "@/providers/auth.provider";
import { authService } from "../service/auth.service";
import { useLoginUser } from "../queries/auth.create.queries";
import { AUTH_ERRORS } from "@server/src/constants/auth.errors";

// Types
import { LoginInput } from "@server/src/types/auth.types";
import { AuthState } from "@/types/auth.types";

/**
 * Custom hook for handling user login functionality
 * 
 * @returns {Object} Login form state and handlers
 * @property {UseFormReturn} form - React Hook Form instance
 * @property {Function} onSubmit - Form submission handler
 * @property {boolean} isLoading - Loading state indicator
 * @property {string | null} error - Error message if login fails
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuthState, refetch } = useAuth();
  const { mutateAsync: loginUser, isPending } = useLoginUser();
  const [error, setError] = useState<string | null>(null);

  // Get search params from URL
  const { redirect, registeredEmail, status } = useSearch({
    from: "/(auth)/login",
  });

  // Initialize form with validation schema
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: registeredEmail || "",
      password: "",
    },
  });

  /**
   * Handles form submission and login process
   * @param {LoginInput} data - Form data containing email and password
   */
  const onSubmit = async (data: LoginInput) => {
    // Reset states before attempting login
    setAuthState(AuthState.AUTHENTICATING);
    setError(null);

    try {
      const response = await loginUser(data);

      if (response.success) {
        // Handle successful login
        toast.success("Successfully logged in!");
        authService.setToken(response.data.token);
        await refetch();
        
        // Redirect user to dashboard or specified redirect path
        await navigate({
          to: redirect || "/dashboard",
          replace: true,
        });
        return;
      }

      // Handle unsuccessful login with server error
      setAuthState(AuthState.UNAUTHENTICATED);
      setError(response.error || AUTH_ERRORS.INVALID_CREDENTIALS);
    } catch (error) {
      // Handle unexpected errors
      console.error("Login error:", error);
      setAuthState(AuthState.UNAUTHENTICATED);
      setError(AUTH_ERRORS.INVALID_CREDENTIALS);
    }
  };

  /**
   * Show success toast when user has just registered
   */
  useEffect(() => {
    if (status === "registration_success") {
      toast.success("Registration successful! Please login to continue.");
    }
  }, [status]);

  return {
    form,
    onSubmit,
    isLoading: isPending,
    error,
  };
};