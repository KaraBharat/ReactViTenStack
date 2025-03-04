// Third-party imports
import { useQuery } from "@tanstack/react-query";

// Internal imports
import { authKeys } from "./auth.queries";
import { client } from "@/lib/hono";
import { handleApiError } from "@/lib/utils";
import { authService } from "../service/auth.service";

/**
 * Hook to fetch and manage the current authenticated user's data
 * Uses react-query for caching and automatic background updates
 */
export const useAuthUser = () => {
  return useQuery({
    queryKey: authKeys.me(),
    retry: false,
    queryFn: async () => {
      try {
        const response = await client.api.auth.me.$get();

        if (!response.ok) {
          throw new Error("Error fetching authenticated user");
        }

        return await response.json();
      } catch (error) {
        handleApiError(error);
      }
    },
    enabled: authService.isAuthenticated(),
  });
};
