// Library imports
import { hc } from "hono/client";
import { AppType } from "@server/src/app";

// Local imports
import { AUTH_STORAGE_KEY } from "@/constants/auth.constants";
import config from "./config";

// Validate API configuration
if (!config.apiUrl) {
  console.warn(
    "Missing API URL configuration. Please set a valid API URL in your configuration.",
  );
}

/**
 * Type definition for fetch function
 */
type FetchFunction = typeof fetch;

/**
 * List of API endpoints that don't require authentication
 */
const PUBLIC_ENDPOINTS = ["api/auth/login", "api/auth/register"] as const;

/**
 * Check if the given URL is a public endpoint
 */
const isPublicEndpoint = (url: string | URL | Request): boolean => {
  const urlString = url instanceof Request ? url.url : url.toString();
  const parsedUrl = new URL(urlString);
  const path = parsedUrl.pathname;

  // Remove base API path if it exists
  const normalizedPath = path.replace(new URL(config.apiUrl).pathname, "");

  return PUBLIC_ENDPOINTS.some((endpoint) => normalizedPath === endpoint);
};

/**
 * Creates an authenticated fetch function wrapper
 */
const createAuthFetch = (baseFetch: FetchFunction): FetchFunction => {
  return async (input, init) => {
    try {
      // Skip auth header for public endpoints
      if (isPublicEndpoint(input)) {
        return await baseFetch(input, init);
      }

      const token = localStorage.getItem(AUTH_STORAGE_KEY);
      const headers = new Headers(init?.headers || {});

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return await baseFetch(input, {
        ...init,
        headers,
      });
    } catch (error) {
      console.error("Failed to make authenticated request:", error);
      throw error;
    }
  };
};

/**
 * Initialized API client with authentication
 */
export const client = hc<AppType>(config.apiUrl, {
  fetch: createAuthFetch(fetch),
});
