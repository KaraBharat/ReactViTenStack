/**
 * Authentication related constants and configurations
 * Contains settings for password policies, session management,
 * rate limiting, cryptographic operations, and JWT
 */

export const AUTH_CONSTANTS = {
  // Application Identity
  APP_NAME: "modern-full-stack-starter-template",

  // Password & Token Configuration
  SALT_ROUNDS: 16,
  TOKEN_LENGTH: 32,
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 100,
    HASH_LENGTH: 64,
  },

  // Session Management
  SESSION: {
    TOKEN_LENGTH: 64,
    EXPIRY: {
      DEFAULT: 24 * 60 * 60, // 24 hours in seconds
      REMEMBER_ME: 30 * 24 * 60 * 60, // 30 days in seconds
    },
  },

  // Rate Limiting Configuration
  RATE_LIMIT: {
    MAX_ATTEMPTS: 10,
    WINDOW: 15 * 60 * 1000, // 15 minutes
  },

  // Cryptographic Settings
  CRYPTO: {
    SALT_BYTES: 32,
    KEY_BYTES: 64,
    ITERATIONS: 100000,
    DIGEST: "sha512",
  },

  // JWT Configuration
  JWT: {
    EXPIRY: "7d",
  },
} as const;