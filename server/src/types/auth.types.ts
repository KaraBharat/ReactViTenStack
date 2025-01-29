export interface RegisterInput {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
  expiresAt: Date;
}

export interface SessionValidationResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  expiresAt: Date;
}

export interface AuthErrorResponse {
  success: false;
  error: string;
}

export interface UpdatePasswordInput {
  id: string;
  currentPassword: string;
  newPassword: string;
}