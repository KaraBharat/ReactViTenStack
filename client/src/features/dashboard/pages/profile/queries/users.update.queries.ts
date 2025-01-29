// External imports
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Internal imports
import { client } from "@/lib/hono";
import { authKeys } from "@/features/auth/queries/auth.queries";
import { UpdateUserProfile } from "@server/src/types/users.types";

/**
 * Custom hook for updating user profile information
 * @returns Mutation object for handling user profile updates
 *
 * Features:
 * - Handles API communication for profile updates
 * - Automatically invalidates user data cache on successful update
 * - Provides error handling for failed updates
 */
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserProfile) => {
      const response = await client.api.users["update-profile"].$post({
        json: data,
      });

      if (!response.ok) {
        throw new Error("Error in updating user profile");
      }
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch user data after successful update
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};
