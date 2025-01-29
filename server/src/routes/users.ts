// External imports
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

// Internal imports
import { userService } from "@/services/users/users.service";
import { authMiddleware } from "@/middleware/auth.middleware";

/**
 * Validation schema for user profile updates
 * Requires name with minimum 2 characters
 * Optional avatar field
 */
const updateProfileSchema = z.object({
  name: z.string().min(2, "Name too short"),
  avatar: z.string().optional(),
});

/**
 * User routes handler
 * Manages user profile operations including fetching and updating user profiles
 */
const app = new Hono()
  /**
   * Get user profile endpoint
   * Requires authentication
   * @returns User profile data
   */
  .get("/profile", authMiddleware, async (c) => {
    const user = c.get("user");
    if (!user) {
      throw new Error("Unauthorized access");
    }

    const profile = await userService.getUserProfile(user.id);
    return c.json({ success: true, data: profile }, 200);
  })

  /**
   * Update user profile endpoint
   * Requires authentication and validates input using updateProfileSchema
   * @returns Updated profile data
   */
  .post(
    "/update-profile",
    authMiddleware,
    zValidator("json", updateProfileSchema),
    async (c) => {
      try {
        const data = await c.req.json();
        const user = c.get("user");

        if (!user) {
          throw new Error("Unauthorized access");
        }

        if (user.id !== data.id) {
          throw new Error("Unauthorized access");
        }

        const result = await userService.updateUserProfile(user.id, data);
        return c.json({ success: true, data: result }, 200);
      } catch (error) {
        return c.json(
          {
            success: false,
            error:
              error instanceof Error ? error.message : "Update profile failed",
          },
          400
        );
      }
    }
  );

export default app;
