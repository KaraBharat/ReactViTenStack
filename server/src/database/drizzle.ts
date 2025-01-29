/**
 * Database Configuration Module
 * Handles database connection setup using Neon and Drizzle ORM
 */

// External Dependencies
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config as envConfig } from "@/env";

// Internal Dependencies
import { schema } from "./schema";

// Load environment variables from .env.local
config({ path: ".env.local" });

// Validate required environment variables
if (!envConfig.database) {
  throw new Error("DATABASE_URL environment variable is not set");
}

/**
 * Database Connection Initialization
 * sql: Raw SQL connection instance using Neon
 * db: Drizzle ORM instance with schema configuration
 */
export const sql = neon(envConfig.database.url);
export const db = drizzle(sql, { schema });
