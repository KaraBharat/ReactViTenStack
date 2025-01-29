/**
 * Query key factory for user-related queries
 * Provides type-safe query keys for React Query operations related to users
 * @module userKeys
 */

/**
 * User query keys namespace containing all user-related query key generators
 * Following React Query's recommended pattern for structured query keys
 */
export const userKeys = {
  /** Base key for all user-related queries */
  all: ["users"] as const,

  /**
   * Generates a query key for specific user details
   * @param id - Unique identifier of the user
   * @returns Tuple representing the query key for a specific user
   */
  detail: (id: string) => [...userKeys.all, id] as const,
} as const;
