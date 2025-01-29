// External imports
import { eq } from "drizzle-orm";

// Internal imports
import { db } from "@/database/drizzle";
import { users } from "@/database/schemas/auth.schema";
import { SelectUser, UpdateUserProfile } from "@/types/users.types";

/**
 * Service class handling user-related operations
 * Manages user profile data operations including retrieval and updates
 */
export class UserService {
  /**
   * Retrieves a user's profile information by their ID
   * @param id - The unique identifier of the user
   * @returns Promise containing the user's profile data
   */
  async getUserProfile(id: string): Promise<SelectUser> {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    return user as SelectUser;
  }

  /**
   * Updates a user's profile information
   * @param id - The unique identifier of the user
   * @param profile - Object containing the profile updates (name and avatar)
   */
  async updateUserProfile(
    id: string,
    profile: UpdateUserProfile
  ): Promise<void> {
    await db
      .update(users)
      .set({
        name: profile.name,
        avatar: profile.avatar,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id));
  }

  /**
   * Updates a user's avatar
   * @param id - The unique identifier of the user
   * @param avatar - The new avatar URL or identifier
   */
  async updateUserAvatar(id: string, avatar: string): Promise<void> {
    await db
      .update(users)
      .set({ avatar, updatedAt: new Date() })
      .where(eq(users.id, id));
  }
}

// Singleton instance of UserService
export const userService = new UserService();
