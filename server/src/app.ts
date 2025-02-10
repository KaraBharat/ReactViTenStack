/**
 * External Dependencies
 */
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { config } from "@/env";

/**
 * Internal Dependencies
 */
import auth from "@/routes/auth";
import todos from "@/routes/todos";
import users from "@/routes/users";
import { errorMiddleware } from "@/middleware/error.middleware";
import { customLogger } from "@/helpers/custom.logger";
/**
 * Application Configuration
 * Creates a new Hono instance with base path '/api'
 */
const app = new Hono().basePath("/api");

/**
 * Middleware Setup
 * Configures global middleware for logging and CORS
 */

app.use(async (c, next) => {
  const start = Date.now();
  const { method, url } = c.req;

  await next();

  const ms = Date.now() - start;
  const status = c.res.status;

  customLogger(
    `${url}`,
    status,
    method,
    `Status: ${status}`,
    `Duration: ${ms}ms`,
    `IP: ${c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "unknown"}`,
    `User-Agent: ${c.req.header("user-agent") || "unknown"}`
  );
});

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
const routes = app.route("/auth", auth).route("/users", users).route("/todos", todos);

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
