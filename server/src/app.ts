/**
 * External Dependencies
 */
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { config } from "@/env";

/**
 * Internal Dependencies
 */
import auth from "@/routes/auth";
import todos from "@/routes/todos";
import users from "@/routes/users";
import { errorMiddleware } from "@/middleware/error.middleware";

/**
 * Application Configuration
 * Creates a new Hono instance with base path '/api'
 */
const app = new Hono().basePath("/api");

/**
 * Middleware Setup
 * Configures global middleware for logging and CORS
 */
app.use(logger());
app.use(
  "*",
  cors({
    origin: [config.clientUrl],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    allowHeaders: ["*"],
    exposeHeaders: ["*"],
    credentials: true,
    maxAge: 86400,
  })
);

/**
 * Route Configuration
 * Sets up main application routes for authentication, users, and todos
 */
const routes = app
            .route("/auth", auth)
            .route("/users", users)
            .route("/todos", todos);

/**
 * Error Handling
 * Global error middleware to handle all uncaught errors
 */
app.use("*", errorMiddleware);

/**
 * Server Initialization
 * Starts the server only in development environment
 */
if (config.isDev) {
  serve(
    {
      fetch: app.fetch,
      port: config.port,
    },
    (info) => {
      console.log(`🚀 Server is running on port ${info.port}`);
      console.log(`🚀 Server is running on ${config.apiUrl}`);
    }
  );
}

/**
 * Type Exports
 */
export type AppType = typeof routes;
export default app;
