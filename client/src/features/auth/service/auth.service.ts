// External imports
import { AUTH_STORAGE_KEY } from "@/constants/auth.constants";
import { AuthErrorResponse } from "@server/src/types/auth.types";

// Response type definitions for authentication operations
export interface AuthSuccessResponse {
  success: true;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
    };
    token: string;
    expiresAt: string;
  };
}

export type AuthResponse = AuthSuccessResponse | AuthErrorResponse;

/**
 * Service handling authentication-related operations including token management
 * and user authentication state.
 */
class AuthService {
  private readonly tokenKey = AUTH_STORAGE_KEY;

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    const token = localStorage.getItem(this.tokenKey);
    return token;
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated() {
    const hasToken = !!this.getToken();
    return hasToken;
  }

  async logout() {
    this.removeToken();
  }
}

export const authService = new AuthService();