// Third-party imports
import { useMutation } from "@tanstack/react-query";

// Internal imports
import { client } from "@/lib/hono";
import { LoginInput, RegisterInput } from "@server/src/types/auth.types";
import { AuthResponse } from "../service/auth.service";

// Shared error handler for auth mutations
const handleAuthError = (error: unknown, action: string): AuthResponse => {
  console.error(`${action} error:`, error);
  return {
    success: false,
    error: error instanceof Error ? error.message : `${action} failed`,
  };
};

// Shared response handler for auth mutations
const handleAuthResponse = async (response: Response): Promise<AuthResponse> => {
  const data = await response.json();
  
  if (!response.ok) {
    return {
      success: false,
      error: data.error || "Operation failed",
    };
  }

  return { ...data, error: null };
};

/**
 * Hook for user registration
 */
export const useRegisterUser = () => {
  return useMutation<AuthResponse, unknown, RegisterInput>({
    mutationFn: async (userData: RegisterInput) => {
      try {
        const response = await client.api.auth.register.$post({
          json: userData,
        });
        return handleAuthResponse(response);
      } catch (error) {
        return handleAuthError(error, "Registration");
      }
    },
  });
};

/**
 * Hook for user login
 */
export const useLoginUser = () => {
  return useMutation<AuthResponse, unknown, LoginInput>({
    mutationFn: async (userData: LoginInput) => {
      try {
        const response = await client.api.auth.login.$post({
          json: userData,
        });
        return handleAuthResponse(response);
      } catch (error) {
        return handleAuthError(error, "Login");
      }
    },
  });
};