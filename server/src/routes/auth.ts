// External Dependencies
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";

// Internal Dependencies
import { config } from "@/env";
import { authService } from "@/services/auth/auth.service";
import { AUTH_CONSTANTS } from "@/constants/auth.constants";
import { authMiddleware } from "@/middleware/auth.middleware";

/**
 * Authentication Route Schemas
 * Defines validation schemas for authentication-related requests
 */
const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(AUTH_CONSTANTS.PASSWORD.MIN_LENGTH, "Password too short")
    .regex(/[A-Z]/, "Password must contain uppercase letter")
    .regex(/[a-z]/, "Password must contain lowercase letter")
    .regex(/[0-9]/, "Password must contain number")
    .regex(/[^A-Za-z0-9]/, "Password must contain special character"),
  name: z.string().min(2, "Name too short"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

const updatePasswordSchema = z.object({
  id: z.string().min(1, "User ID is required"),
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(1, "New password is required"),
});

/**
 * Authentication Router
 * Handles all authentication-related routes including registration, login,
 * session management, and password updates
 */
const app = new Hono()
  /**
   * User Registration
   * Creates a new user account with provided credentials
   */
  .post("/register", zValidator("json", registerSchema), async (c) => {
    try {
      const data = await c.req.json();
      const result = await authService.register(data);
      return c.json({ success: true, data: result }, 200);
    } catch (error) {
      return c.json(
        {
          success: false,
          error: error instanceof Error ? error.message : "Registration failed",
        },
        400
      );
    }
  })

  /**
   * User Login
   * Authenticates user and establishes a session
   */
  .post("/login", zValidator("json", loginSchema), async (c) => {
    try {
      const data = await c.req.json();
      const result = await authService.login(data);

      setCookie(c, "session_token", result.token, {
        httpOnly: true,
        secure: config.env === "production",
        sameSite: "strict",
        maxAge: data.rememberMe
          ? AUTH_CONSTANTS.SESSION.EXPIRY.REMEMBER_ME
          : AUTH_CONSTANTS.SESSION.EXPIRY.DEFAULT,
      });

      return c.json({ success: true, data: result }, 200);
    } catch (error) {
      return c.json(
        {
          success: false,
          error: error instanceof Error ? error.message : "Login failed",
        },
        401
      );
    }
  })

  /**
   * Get Current User
   * Returns the authenticated user's profile
   */
  .get("/me", authMiddleware, async (c) => {
    try {
      const user = c.get("user");
      if (!user) {
        return c.json({ success: false, error: "Unauthorized access" }, 401);
      }
      return c.json({ success: true, data: user }, 200);
    } catch (error) {
      console.error("Error in /me endpoint:", error);
      return c.json({ success: false, error: "Internal server error" }, 500);
    }
  })

  /**
   * User Logout
   * Terminates the user's session
   */
  .post("/logout", authMiddleware, async (c) => {
    try {
      const token = c.req.header("Authorization")?.split(" ")[1];
      if (!token) {
        throw new Error("No token provided");
      }

      await authService.logout(token);

      deleteCookie(c, "session_token", {
        httpOnly: true,
        secure: config.env === "production",
        sameSite: "strict",
        maxAge: 0,
      });

      return c.json({ success: true, message: "Logged out successfully" }, 200);
    } catch (error) {
      return c.json(
        {
          success: false,
          error: error instanceof Error ? error.message : "Logout failed",
        },
        400
      );
    }
  })

  /**
   * Session Validation
   * Verifies if the current session is valid
   */
  .post("/validate-session", async (c) => {
    try {
      const token =
        c.req.header("Authorization")?.split(" ")[1] ||
        getCookie(c, "session_token");

      if (!token) {
        throw new Error("No token provided");
      }

      const result = await authService.validateSession(token);
      return c.json({ success: true, data: result }, 200);
    } catch (error) {
      return c.json(
        {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Session validation failed",
        },
        401
      );
    }
  })

  /**
   * Password Update
   * Allows authenticated users to update their password
   */
  .post(
    "/update-password",
    authMiddleware,
    zValidator("json", updatePasswordSchema),
    async (c) => {
      try {
        const data = await c.req.json();
        const user = c.get("user");

        if (!user || user.id !== data.id) {
          throw new Error("Unauthorized access");
        }

        await authService.updateUserPassword(
          user.id,
          data.currentPassword,
          data.newPassword
        );

        return c.json({ success: true, data: { status: "success" } }, 200);
      } catch (error) {
        return c.json(
          {
            success: false,
            error:
              error instanceof Error ? error.message : "Update password failed",
          },
          400
        );
      }
    }
  );

export default app;
