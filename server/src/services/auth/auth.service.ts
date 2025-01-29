// External imports
import { eq } from "drizzle-orm";

// Internal imports - Database
import { db } from "@/database/drizzle";
import { users, sessions } from "@/database/schemas/auth.schema";

// Internal imports - Types
import type {
  RegisterInput,
  LoginInput,
  AuthResponse,
  SessionValidationResponse,
} from "@/types/auth.types";
import { NewUser } from "@/types/users.types";

// Internal imports - Utils & Constants
import { AuthUtils } from "@/services/utils/auth.utils";
import { RateLimiter } from "@/services/utils/rate-limit.utils";
import { AUTH_CONSTANTS } from "@/constants/auth.constants";
import { AUTH_ERRORS } from "@/constants/auth.errors";
import { createJWT, verifyJWT } from "@/services/utils/jwt";

/**
 * AuthService handles all authentication-related operations including
 * user registration, login, session management, and password updates.
 */
export class AuthService {
  constructor() {
    AuthUtils.initialize();
  }

  /**
   * Registers a new user and creates their initial session
   * Includes email validation, password strength checking, and duplicate email prevention
   */
  async register(input: RegisterInput): Promise<AuthResponse> {
    if (!AuthUtils.validateEmail(input.email)) {
      throw new Error("Invalid email format");
    }

    if (!AuthUtils.validatePassword(input.password)) {
      throw new Error(AUTH_ERRORS.WEAK_PASSWORD);
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, input.email),
    });

    if (existingUser) {
      throw new Error(AUTH_ERRORS.EMAIL_EXISTS);
    }

    const passwordSalt = AuthUtils.generateSalt();
    const passwordHash = await AuthUtils.hashPassword(input.password, passwordSalt);

    const newUser: NewUser = {
      email: input.email,
      passwordHash,
      passwordSalt,
      name: input.name,
      isVerified: false,
    };

    const [createdUser] = await db.insert(users).values(newUser).returning();

    const sessionToken = AuthUtils.generateSessionToken();
    const expiresAt = new Date(Date.now() + AUTH_CONSTANTS.SESSION.EXPIRY.DEFAULT * 1000);

    if (!createdUser) {
      throw new Error(AUTH_ERRORS.UNAUTHORIZED);
    }

    const [session] = await db
      .insert(sessions)
      .values({
        userId: createdUser.id,
        token: sessionToken,
        expiresAt,
      })
      .returning();

    if (!session) {
      throw new Error(AUTH_ERRORS.UNAUTHORIZED);
    }

    const token = await createJWT({
      user: AuthUtils.sanitizeUserData(createdUser),
      sessionId: session.id,
    });

    return {
      user: AuthUtils.sanitizeUserData(createdUser),
      token,
      expiresAt,
    };
  }

  /**
   * Handles user login with rate limiting protection
   * Creates a new session and invalidates any existing sessions
   */
  async login({ email, password, rememberMe }: LoginInput): Promise<AuthResponse> {
    if (!RateLimiter.checkRateLimit(email)) {
      throw new Error(AUTH_ERRORS.RATE_LIMIT);
    }

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    const isValidPassword = await AuthUtils.verifyPassword(
      password,
      user.passwordHash,
      user.passwordSalt
    );

    if (!isValidPassword) {
      throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    RateLimiter.clearRateLimit(email);

    await db.delete(sessions).where(eq(sessions.userId, user.id));

    const sessionToken = AuthUtils.generateSessionToken();
    const expiresAt = new Date(
      Date.now() +
        (rememberMe
          ? AUTH_CONSTANTS.SESSION.EXPIRY.REMEMBER_ME
          : AUTH_CONSTANTS.SESSION.EXPIRY.DEFAULT) *
          1000
    );

    const [session] = await db
      .insert(sessions)
      .values({
        userId: user.id,
        token: sessionToken,
        expiresAt,
      })
      .returning();

    if (!session) {
      throw new Error(AUTH_ERRORS.UNAUTHORIZED);
    }

    const token = await createJWT({
      user: AuthUtils.sanitizeUserData(user),
      sessionId: session.id,
    });

    return {
      user: AuthUtils.sanitizeUserData(user),
      token,
      expiresAt,
    };
  }

  /**
   * Validates a session token and ensures it hasn't expired
   * Also verifies the JWT and user association
   */
  async validateSession(token: string): Promise<SessionValidationResponse> {
    const decodedToken = await verifyJWT(token);

    const session = await db.query.sessions.findFirst({
      where: eq(sessions.id, decodedToken.sessionId),
      with: {
        user: true,
      },
      orderBy: (sessions, { desc }) => [desc(sessions.createdAt)],
    });

    const now = new Date();

    if (!session || session.expiresAt < now) {
      throw new Error(AUTH_ERRORS.SESSION_EXPIRED);
    }

    if (session.user.id !== decodedToken.user.id) {
      throw new Error(AUTH_ERRORS.UNAUTHORIZED);
    }

    return {
      user: AuthUtils.sanitizeUserData(session.user),
      expiresAt: session.expiresAt,
    };
  }

  /**
   * Logs out a user by invalidating their current session
   */
  async logout(token: string): Promise<void> {
    const decodedToken = await verifyJWT(token);
    await db.delete(sessions).where(eq(sessions.id, decodedToken.sessionId));
  }

  /**
   * Updates a user's password after verifying their current password
   */
  async updateUserPassword(
    id: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      throw new Error(AUTH_ERRORS.UNAUTHORIZED);
    }

    const isValidPassword = await AuthUtils.verifyPassword(
      currentPassword,
      user.passwordHash,
      user.passwordSalt
    );

    if (!isValidPassword) {
      throw new Error(AUTH_ERRORS.UNAUTHORIZED);
    }

    const passwordSalt = AuthUtils.generateSalt();
    const passwordHash = await AuthUtils.hashPassword(newPassword, passwordSalt);

    await db
      .update(users)
      .set({ passwordHash, passwordSalt, updatedAt: new Date() })
      .where(eq(users.id, id));
  }
}

export const authService = new AuthService();
