// External imports
import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";

// Internal imports
import { authService } from "@/services/auth/auth.service";
import { verifyJWT } from "@/services/utils/jwt";
import { AuthUser } from "@/types/hono.types";

/**
 * Authentication Middleware
 * Validates user authentication via JWT tokens from either Authorization header or cookies
 * Handles token verification, session validation, and user context setting
 *
 * @param c - Hono Context object
 * @param next - Next middleware function
 * @returns Response with error if authentication fails, or continues to next middleware
 */
export async function authMiddleware(c: Context, next: Next) {
  try {
    // Extract token from Authorization header or cookies
    const token =
      c.req.header("Authorization")?.split(" ")[1] ||
      getCookie(c, "session_token");

    if (!token) {
      return c.json(
        {
          success: false,
          error: "Authentication required",
        },
        401
      );
    }

    // Verify JWT token and extract payload
    const decodedToken = await verifyJWT(token);

    // Validate session data presence
    if (!decodedToken.sessionId || !decodedToken.user.id) {
      return c.json(
        {
          success: false,
          error: "Invalid token",
        },
        401
      );
    }

    // Validate session and get user data
    const { user } = await authService.validateSession(token);

    // Set typed user data in context
    c.set("user", user as AuthUser);

    await next();
  } catch (error) {
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Authentication failed",
      },
      401
    );
  }
}
