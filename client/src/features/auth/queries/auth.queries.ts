/**
 * External dependencies
 */
import { InferResponseType } from "hono/client";
import { client } from "@/lib/hono";

/**
 * Auth Query Keys
 * Defines the query key structure for React Query/SWR cache management
 * Uses const assertions for type safety and readonly properties
 */
export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
} as const;

/**
 * Auth Response Type
 * Extracts and defines the successful response type from the auth API endpoint
 * Excludes error responses to ensure type safety in success scenarios
 */
export type AuthResponseType = Exclude<
  InferResponseType<(typeof client.api.auth.me)["$get"]>,
  { error: string }
>;