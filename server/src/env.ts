import { z } from "zod";
import * as dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  // Server
  PORT: z.string().default("3000"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  // URLs
  API_URL: z.string().default("http://localhost:3000"),
  CLIENT_URL: z.string().default("http://localhost:5173"),

  // Database & Auth
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  AUTH_SECRET_KEY: z.string(),
});

// Validate environment variables
export const env = envSchema.parse(process.env);

/**
 * Type-safe server configuration derived from environment variables
 */
export interface ServerConfig {
  port: number;
  env: string;
  isDev: boolean;
  apiUrl: string;
  clientUrl: string;
  database: {
    url: string;
  };
  jwt: {
    secret: string;
  };
  auth: {
    secretKey: string;
  };
}

/**
 * Server configuration object with validated environment values
 */
export const config: ServerConfig = {
  port: Number(env.PORT),
  env: env.NODE_ENV,
  isDev: env.NODE_ENV !== "production",
  apiUrl: env.API_URL,
  clientUrl: env.CLIENT_URL,
  database: {
    url: env.DATABASE_URL,
  },
  jwt: {
    secret: env.JWT_SECRET,
  },
  auth: {
    secretKey: env.AUTH_SECRET_KEY,
  },
};
