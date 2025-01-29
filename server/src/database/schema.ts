/**
 * Database Schema Configuration
 * Combines all individual schema definitions into a single export
 * for database initialization and type definitions
 */

// Internal Schema Imports
import * as authSchema from "./schemas/auth.schema";
import * as todosSchema from "./schemas/todos.schema";

/**
 * Combined schema object containing all database schemas
 * Used for database initialization and type definitions
 */
export const schema = {
  ...authSchema,
  ...todosSchema,
};
