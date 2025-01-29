import { z } from "zod";
import {
  selectTodoSchema,
  insertTodoSchema,
  updateTodoSchema,
} from "@/database/schemas/todos.schema";

export type Todo = Omit<z.infer<typeof selectTodoSchema>, "userId"> & {
  optimisticOperation?: "create" | "update" | "delete";
};

export type NewTodo = Omit<
  z.infer<typeof insertTodoSchema>,
  "userId" | "createdAt" | "updatedAt"
>;

export type UpdateTodo = Omit<
  z.infer<typeof updateTodoSchema>,
  "userId" | "createdAt" | "updatedAt"
>;

// Define valid sort fields
export const VALID_TODO_SORT_FIELDS = [
  "title",
  "status",
  "priority",
  "dueDate",
  "createdAt",
  "updatedAt",
  "completedAt",
  "isStarred",
] as const;

export type TodoStatus = "todo" | "in_progress" | "completed" | "archived";

export const TodoStatusEnum = z.enum([
  "todo",
  "in_progress",
  "completed",
  "archived",
]);

export type Priority = "low" | "medium" | "high";

export const PriorityEnum = z.enum(["low", "medium", "high"]);
