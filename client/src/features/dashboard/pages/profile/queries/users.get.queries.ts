// External imports
import { useQuery } from "@tanstack/react-query";

// Internal imports
import { client } from "@/lib/hono";
import { handleApiError } from "@/lib/utils";
import { userKeys } from "./users.queries";

/**
 * Custom hook to fetch a user profile
 * @param id - The user ID to fetch the profile for
 * @returns Query object containing user profile data and status
 *
 * @example
 * const { data, isLoading } = useUser("123");
 */
export const useUser = (id: string) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      try {
        const response = await client.api.users.profile.$get();

        if (!response.ok) {
          throw new Error("Error in fetching user");
        }

        return await response.json();
      } catch (error) {
        handleApiError(error);
      }
    },
    enabled: !!id, // Query will only run if ID is provided
  });
};
