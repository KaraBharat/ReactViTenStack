import { z } from "zod";
import {
  selectUserSchema,
  insertUserSchema,
  selectSessionSchema,
  insertSessionSchema,
} from "@/database/schemas/auth.schema";

export type User = z.infer<typeof selectUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema> & {
  passwordHash: string;
  passwordSalt: string;
};

export type Session = z.infer<typeof selectSessionSchema>;
export type NewSession = z.infer<typeof insertSessionSchema> & {
  userId: string;
};

export type SelectUser = Omit<User, "passwordHash" | "passwordSalt" | "createdAt" | "updatedAt">;

export type UpdateUserProfile = {
  id: string;
  name: string;
  avatar?: string;
};
