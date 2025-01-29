/**
 * Configuration module for the client application
 * Manages environment-specific settings and application constants
 */

// Types
export interface Config {
  apiUrl: string;
  isDev: boolean;
}

/**
 * Application configuration object
 * Uses Vite's environment variables with fallback values for development
 */
const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
  isDev: import.meta.env.DEV,
};

export default config;
