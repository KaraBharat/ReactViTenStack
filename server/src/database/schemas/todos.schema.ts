// External Dependencies
import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * Todo Table Schema Definition
 * Represents the structure of the todos table in the database
 * Includes fields for basic todo information, status tracking,
 * time management, and additional features
 */
export const todos = pgTable("todos", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  userId: uuid("user_id").notNull(),
  status: text("status", {
    enum: ["todo", "in_progress", "completed", "archived"],
  })
    .notNull()
    .default("todo"),
  priority: text("priority", {
    enum: ["low", "medium", "high"],
  })
    .notNull()
    .default("low"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  dueDate: timestamp("due_date", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  isStarred: boolean("is_starred").notNull().default(false),
});

/**
 * Schema for validating todo creation
 * Includes special handling for date fields using zod coercion
 */
export const insertTodoSchema = createInsertSchema(todos, {
  dueDate: z.coerce.date().optional(),
  completedAt: z.coerce.date().optional(),
});

/**
 * Schema for validating todo updates
 * Maintains consistency with insert schema for date handling
 */
export const updateTodoSchema = createInsertSchema(todos, {
  dueDate: z.coerce.date().optional(),
  completedAt: z.coerce.date().optional(),
});

/**
 * Schema for selecting and validating todo records
 * Ensures proper date typing for retrieved records
 */
export const selectTodoSchema = createSelectSchema(todos, {
  createdAt: z.date(),
  updatedAt: z.date(),
  dueDate: z.date().optional(),
  completedAt: z.date().optional(),
});
