// External Dependencies
import { z } from "zod";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

/**
 * User Table Schema
 * Represents the core user data structure including authentication and profile information
 */
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  passwordSalt: text("password_salt").notNull(),
  name: text("name").notNull(),
  avatar: text("avatar").default(""),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/**
 * Session Table Schema
 * Manages user authentication sessions with token-based authentication
 */
export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  token: text("token").unique().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/**
 * Database Relations Configuration
 * Defines the relationships between tables for ORM operations
 */
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

/**
 * Zod Validation Schemas
 * Provides type-safe validation for database operations
 */
export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(),
  passwordHash: z.string().min(6),
  passwordSalt: z.string().min(6),
  name: z.string().min(2),
});

export const selectUserSchema = createSelectSchema(users);
export const insertSessionSchema = createInsertSchema(sessions);
export const selectSessionSchema = createSelectSchema(sessions);
