import { SelectUser } from "@/types/users.types";

type AuthUser = SelectUser;

declare module "hono" {
  interface ContextVariableMap {
    user: AuthUser;
  }
}

export type { AuthUser };
