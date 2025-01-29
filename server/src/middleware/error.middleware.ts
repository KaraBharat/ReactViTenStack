// External imports
import type { Context, Next } from "hono";

/**
 * Global error handling middleware for the application
 * Catches and processes all unhandled errors in the request pipeline
 * Returns a standardized error response to maintain consistent API behavior
 *
 * @param c - Hono Context object containing request and response details
 * @param next - Next middleware function in the pipeline
 * @returns JSON response with error details
 */
export async function errorMiddleware(c: Context, next: Next) {
  try {
    await next();
  } catch (error) {
    // Log the error for debugging and monitoring
    console.error("[Error Middleware]:", error);

    // Return standardized error response
    return c.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      500
    );
  }
}
