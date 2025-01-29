/**
 * Internal Imports
 */
import { AUTH_CONSTANTS } from "@/constants/auth.constants";

/**
 * Types & Interfaces
 */
interface RateLimitEntry {
  count: number;
  firstAttempt: number;
}

/**
 * Rate Limiter Service
 * Manages request rate limiting using a memory-based storage approach.
 * Tracks attempts per key within a specified time window.
 */
export class RateLimiter {
  private static attempts = new Map<string, RateLimitEntry>();

  /**
   * Checks if the current request exceeds rate limit for the given key
   * Returns true if request is allowed, false if rate limit exceeded
   * @param key - Unique identifier for rate limit tracking
   */
  static checkRateLimit(key: string): boolean {
    const now = Date.now();
    const entry = this.attempts.get(key);

    if (!entry) {
      this.attempts.set(key, { count: 1, firstAttempt: now });
      return true;
    }

    if (now - entry.firstAttempt > AUTH_CONSTANTS.RATE_LIMIT.WINDOW) {
      this.attempts.set(key, { count: 1, firstAttempt: now });
      return true;
    }

    entry.count++;
    this.attempts.set(key, entry);

    return entry.count <= AUTH_CONSTANTS.RATE_LIMIT.MAX_ATTEMPTS;
  }

  /**
   * Removes rate limit tracking for the specified key
   * @param key - Unique identifier to clear from tracking
   */
  static clearRateLimit(key: string): void {
    this.attempts.delete(key);
  }
}
