// Library dependencies
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Internal dependencies
import { useAuth } from "@/providers/auth.provider";
import { authService } from "../service/auth.service";
import { useRegisterUser } from "../queries/auth.create.queries";
import { registerSchema } from "../schemas/auth.schema";
import { AUTH_ERRORS } from "@server/src/constants/auth.errors";

// Types
import { RegisterInput } from "@server/src/types/auth.types";
import { AuthState } from "@/types/auth.types";

/**
 * Custom hook for handling user registration functionality
 *
 * @returns {Object} Registration form state and handlers
 * @property {UseFormReturn} form - React Hook Form instance
 * @property {Function} onSubmit - Form submission handler
 * @property {boolean} isLoading - Loading state indicator
 * @property {string | null} error - Error message if registration fails
 */
const useRegister = () => {
  const navigate = useNavigate();
  const { setAuthState, refetch } = useAuth();
  const { mutateAsync: register, isPending } = useRegisterUser();
  const [error, setError] = useState<string | null>(null);

  /**
   * Initialize form with validation schema and default values
   */
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  /**
   * Handles form submission and registration process
   * @param {RegisterInput} data - Form data containing user registration details
   */
  const onSubmit = async (data: RegisterInput) => {
    // Reset states before attempting registration
    setAuthState(AuthState.AUTHENTICATING);
    setError(null);

    try {
      const registerResponse = await register(data);

      if (!registerResponse.success) {
        // Handle registration failure
        setError(registerResponse.error || AUTH_ERRORS.REGISTRATION_FAILED);
        setAuthState(AuthState.UNAUTHENTICATED);
        return;
      }

      // Handle successful registration with auto-login
      if (registerResponse.data?.token) {
        toast.success("Successfully registered and logged in!");
        authService.setToken(registerResponse.data.token);
        await refetch();

        // Redirect to dashboard
        await navigate({
          to: "/dashboard",
          replace: true,
        });
        return;
      }

      // Handle successful registration without auto-login
      await navigate({
        to: "/login",
        search: {
          redirect: "/dashboard",
          registeredEmail: data.email,
          status: "registration_success",
        },
      });
      toast.info("Please login with your new account");
    } catch (error) {
      // Handle unexpected errors
      console.error("Registration error:", error);
      setAuthState(AuthState.UNAUTHENTICATED);
      toast.error(AUTH_ERRORS.REGISTRATION_FAILED);
      setError(AUTH_ERRORS.REGISTRATION_FAILED);
    }
  };

  return {
    form,
    onSubmit,
    error,
    isLoading: isPending,
  };
};

export default useRegister;
