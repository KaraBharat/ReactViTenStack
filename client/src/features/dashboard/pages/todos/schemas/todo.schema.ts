import { PriorityEnum, TodoStatusEnum } from "@server/src/types/todos.types";
import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  status: z.enum(TodoStatusEnum.options, {
    required_error: "Status is required",
    invalid_type_error: "Status is invalid",
  }),
  priority: z.enum(PriorityEnum.options, {
    required_error: "Priority is required",
    invalid_type_error: "Priority is invalid",
  }),
  dueDate: z.string().datetime().optional(),
  description: z.string().optional(),
});

export type TodoFormValues = z.infer<typeof todoSchema>;
