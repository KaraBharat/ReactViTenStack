// External imports
import { randomBytes, pbkdf2, timingSafeEqual } from "crypto";
import { promisify } from "util";

// Internal imports
import { config } from "@/env";
import { AUTH_CONSTANTS } from "@/constants/auth.constants";

// Convert pbkdf2 to promise-based function
const pbkdf2Async = promisify(pbkdf2);

/**
 * Authentication Utility Class
 * Provides methods for password hashing, verification, and user data management
 * Implements cryptographic security best practices using PBKDF2
 */
export class AuthUtils {
  private static secretKey = config.auth.secretKey;

  /**
   * Initializes the authentication system by validating the secret key
   * @throws Error if secret key is missing or less than 32 characters
   */
  static initialize(): void {
    if (!this.secretKey || this.secretKey.length < 32) {
      throw new Error("Invalid or missing AUTH_SECRET_KEY");
    }
  }

  /**
   * Generates a cryptographically secure random salt for password hashing
   * @returns Hexadecimal string representation of the salt
   */
  static generateSalt(): string {
    return randomBytes(AUTH_CONSTANTS.CRYPTO.SALT_BYTES).toString("hex");
  }

  /**
   * Hashes a password using PBKDF2 with the provided salt
   * @param password - Plain text password to hash
   * @param salt - Salt value to use in hashing
   * @returns Promise resolving to the hashed password
   * @throws Error if AUTH_SECRET_KEY is not initialized
   */
  static async hashPassword(password: string, salt: string): Promise<string> {
    if (!this.secretKey) {
      throw new Error("AUTH_SECRET_KEY not initialized");
    }

    const derivedKey = await pbkdf2Async(
      password,
      salt + this.secretKey,
      AUTH_CONSTANTS.CRYPTO.ITERATIONS,
      AUTH_CONSTANTS.CRYPTO.KEY_BYTES,
      AUTH_CONSTANTS.CRYPTO.DIGEST
    );

    return derivedKey.toString("hex");
  }

  /**
   * Verifies a password against a stored hash using timing-safe comparison
   * @param password - Plain text password to verify
   * @param storedHash - Previously stored password hash
   * @param storedSalt - Previously stored salt
   * @returns Promise resolving to boolean indicating if password matches
   */
  static async verifyPassword(
    password: string,
    storedHash: string,
    storedSalt: string
  ): Promise<boolean> {
    try {
      const hashedPassword = await this.hashPassword(password, storedSalt);
      const storedHashBuffer = Buffer.from(storedHash, "hex");
      const generatedHashBuffer = Buffer.from(hashedPassword, "hex");

      return timingSafeEqual(storedHashBuffer, generatedHashBuffer);
    } catch (error) {
      return false;
    }
  }

  /**
   * Generates a cryptographically secure session token
   * @returns Hexadecimal string representation of the session token
   */
  static generateSessionToken(): string {
    return randomBytes(AUTH_CONSTANTS.SESSION.TOKEN_LENGTH).toString("hex");
  }

  /**
   * Validates email format using regex
   * @param email - Email address to validate
   * @returns Boolean indicating if email format is valid
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validates password strength against security requirements
   * @param password - Password to validate
   * @returns Boolean indicating if password meets all requirements
   */
  static validatePassword(password: string): boolean {
    const hasMinLength = password.length >= AUTH_CONSTANTS.PASSWORD.MIN_LENGTH;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      hasMinLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  }

  /**
   * Sanitizes user data by removing sensitive fields
   * @param user - User object to sanitize
   * @param excludeFields - Array of field names to exclude from the result
   * @returns Sanitized user object
   */
  static sanitizeUserData<T extends Record<string, any>>(
    user: T,
    excludeFields: string[] = [
      "passwordHash",
      "passwordSalt",
      "createdAt",
      "updatedAt",
    ]
  ): Omit<T, "passwordHash" | "passwordSalt" | "createdAt" | "updatedAt"> {
    const sanitized = { ...user };
    excludeFields.forEach((field) => delete sanitized[field]);
    return sanitized;
  }
}
