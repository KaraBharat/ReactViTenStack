// Third-party imports
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

// Internal imports
import { client } from "@/lib/hono";
import { authService } from "../service/auth.service";
import { UpdatePasswordInput } from "@server/src/types/auth.types";

/**
 * Hook for handling user logout functionality.
 * Clears client cache and redirects to login page after successful logout.
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await client.api.auth.logout.$post();
      await authService.logout();
    },
    onSuccess: () => {
      queryClient.clear();
      navigate({ to: "/login", search: { redirect: "/dashboard" } });
      toast.success("Successfully logged out!");
    },
  });
};

/**
 * Hook for handling password updates.
 * Manages the API call and error handling for password updates.
 */
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (data: UpdatePasswordInput) => {
      const response = await client.api.auth["update-password"].$post({
        json: data,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update password");
      }

      const status = await response.json();
      return status;
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update password",
      );
    },
  });
};