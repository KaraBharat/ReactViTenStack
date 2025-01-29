/**
 * External Dependencies
 */
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

/**
 * Internal Dependencies
 */
import { config } from "@/env";
import { AUTH_CONSTANTS } from "@/constants/auth.constants";

// Validate JWT secret at startup
const JWT_SECRET = config.jwt.secret;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

/**
 * Type Definitions
 */
interface JWTPayload {
  user: {
    id: string;
    email: string;
    name: string;
  };
  sessionId: string;
}

interface JWTHeader {
  alg: string;
  typ: string;
  kid: string;
  jti: string;
  env: string;
  iat: number;
}

/**
 * Creates a new JWT token with enhanced security headers and claims
 * Implements Promise-based JWT signing with comprehensive token metadata
 */
export async function createJWT(payload: JWTPayload): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const environment = config.env;

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        algorithm: "HS256",
        expiresIn: AUTH_CONSTANTS.JWT.EXPIRY,
        header: {
          typ: "JWT",
          kid: environment,
          jti: randomUUID(),
          env: environment,
          iat: now,
        } as JWTHeader,
        issuer: AUTH_CONSTANTS.APP_NAME,
        audience: AUTH_CONSTANTS.APP_NAME,
        subject: payload.user.id,
      },
      (error, token) => {
        if (error || !token) {
          reject(error || new Error("Token generation failed"));
          return;
        }
        resolve(token);
      }
    );
  });
}

/**
 * Verifies and decodes a JWT token
 * Includes additional security checks for environment and header validation
 */
export async function verifyJWT(token: string): Promise<JWTPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      JWT_SECRET,
      {
        algorithms: ["HS256"],
        issuer: AUTH_CONSTANTS.APP_NAME,
        audience: AUTH_CONSTANTS.APP_NAME,
      },
      (error, decoded) => {
        if (error || !decoded) {
          reject(error || new Error("Token verification failed"));
          return;
        }

        const header = jwt.decode(token, { complete: true })
          ?.header as JWTHeader;
        if (!header) {
          reject(new Error("Invalid token header"));
          return;
        }

        if (header.env !== config.env) {
          reject(new Error("Invalid token environment"));
          return;
        }

        resolve(decoded as JWTPayload);
      }
    );
  });
}

/**
 * Utility function to decode and inspect token without verification
 * Useful for debugging and token inspection purposes
 */
export function decodeJWT(token: string) {
  return jwt.decode(token, { complete: true });
}
