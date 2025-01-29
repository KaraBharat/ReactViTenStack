// External imports
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

// Internal imports
import { todosService } from "@/services/todos/todos.service";
import { insertTodoSchema } from "@/database/schemas/todos.schema";
import { authMiddleware } from "@/middleware/auth.middleware";
import {
  VALID_TODO_SORT_FIELDS,
  TodoStatusEnum,
  PriorityEnum,
} from "@/types/todos.types";

/**
 * Todo Routes Handler
 * Provides REST API endpoints for todo operations
 */
const app = new Hono()
  /**
   * Create new todo
   * @route POST /api/todos
   * @auth Required
   * @body Todo data excluding id, timestamps, and userId
   */
  .post(
    "/",
    authMiddleware,
    zValidator(
      "json",
      insertTodoSchema.omit({
        createdAt: true,
        updatedAt: true,
        userId: true,
      })
    ),
    async (c) => {
      try {
        const user = c.get("user");
        const data = await c.req.json();
        const todo = await todosService.createTodo(data, user.id);

        return c.json({ success: true, data: todo }, 201);
      } catch (error) {
        return c.json(
          {
            success: false,
            error:
              error instanceof Error ? error.message : "Failed to create todo",
          },
          400
        );
      }
    }
  )

  /**
   * Update existing todo
   * @route PUT /api/todos/:id
   * @auth Required
   * @param id Todo ID
   * @body Updated todo data
   */
  .put(
    "/:id",
    authMiddleware,
    zValidator(
      "json",
      insertTodoSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      })
    ),
    async (c) => {
      try {
        const user = c.get("user");
        const id = c.req.param("id");
        const data = await c.req.json();

        const todo = await todosService.getTodoById(id, user.id);
        if (!todo) {
          return c.json(
            {
              success: false,
              error: "Todo not found",
            },
            404
          );
        }

        const updated = await todosService.updateTodo(id, user.id, data);
        return c.json({ success: true, data: updated });
      } catch (error) {
        return c.json(
          {
            success: false,
            error:
              error instanceof Error ? error.message : "Failed to update todo",
          },
          400
        );
      }
    }
  )

  /**
   * Delete todo by ID
   * @route DELETE /api/todos/:id
   * @auth Required
   * @param id Todo ID
   */
  .delete("/:id", authMiddleware, async (c) => {
    try {
      const user = c.get("user");
      const id = c.req.param("id");

      const todo = await todosService.getTodoById(id, user.id);
      if (!todo) {
        return c.json(
          {
            success: false,
            error: "Todo not found",
          },
          404
        );
      }

      await todosService.deleteTodo(id, user.id);
      return c.json({ success: true });
    } catch (error) {
      return c.json(
        {
          success: false,
          error:
            error instanceof Error ? error.message : "Failed to delete todo",
        },
        400
      );
    }
  })

  /**
   * Bulk update todo status
   * @route POST /api/todos/bulk-status
   * @auth Required
   * @body { ids: string[], status: TodoStatusEnum }
   */
  .post(
    "/bulk-status",
    authMiddleware,
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
        status: TodoStatusEnum,
      })
    ),
    async (c) => {
      try {
        const user = c.get("user");
        const { ids, status } = await c.req.json();

        const updated = await todosService.bulkUpdateStatus(
          ids,
          user.id,
          status
        );
        return c.json({ success: true, data: updated });
      } catch (error) {
        return c.json(
          {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to update todos status",
          },
          400
        );
      }
    }
  )

  /**
   * Bulk delete todos
   * @route POST /api/todos/bulk-delete
   * @auth Required
   * @body { ids: string[] }
   */
  .post(
    "/bulk-delete",
    authMiddleware,
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      try {
        const user = c.get("user");
        const { ids } = await c.req.json();

        await todosService.bulkDelete(ids, user.id);
        return c.json({ success: true });
      } catch (error) {
        return c.json(
          {
            success: false,
            error:
              error instanceof Error ? error.message : "Failed to delete todos",
          },
          400
        );
      }
    }
  )

  /**
   * Toggle todo status
   * @route POST /api/todos/:id/toggle-status
   * @auth Required
   * @param id Todo ID
   * @body { status: TodoStatusEnum }
   */
  .post(
    "/:id/toggle-status",
    authMiddleware,
    zValidator(
      "json",
      z.object({
        status: TodoStatusEnum,
      })
    ),
    async (c) => {
      try {
        const user = c.get("user");
        const id = c.req.param("id");
        const { status } = await c.req.json();

        const updated = await todosService.toggleTodoStatus(
          id,
          user.id,
          status
        );
        return c.json({ success: true, data: updated });
      } catch (error) {
        return c.json(
          {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to toggle todo status",
          },
          400
        );
      }
    }
  )

  /**
   * Toggle todo starred status
   * @route POST /api/todos/:id/toggle-starred
   * @auth Required
   * @param id Todo ID
   */
  .post("/:id/toggle-starred", authMiddleware, async (c) => {
    try {
      const user = c.get("user");
      const id = c.req.param("id");

      const updated = await todosService.toggleStarred(id, user.id);
      return c.json({ success: true, data: updated });
    } catch (error) {
      return c.json(
        {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to toggle todo starred",
        },
        400
      );
    }
  })

  /**
   * Get todo by ID
   * @route GET /api/todos/:id
   * @auth Required
   * @param id Todo ID
   */
  .get("/:id", authMiddleware, async (c) => {
    try {
      const user = c.get("user");
      const id = c.req.param("id");

      const todo = await todosService.getTodoById(id, user.id);
      if (!todo) {
        return c.json(
          {
            success: false,
            error: "Todo not found",
          },
          404
        );
      }

      return c.json({ success: true, data: todo });
    } catch (error) {
      return c.json(
        {
          success: false,
          error: error instanceof Error ? error.message : "Failed to get todo",
        },
        400
      );
    }
  })

  /**
   * List todos with filters
   * @route GET /api/todos
   * @auth Required
   * @query Various filter parameters (status, priority, search, etc.)
   */
  .get(
    "/",
    authMiddleware,
    zValidator(
      "query",
      z.object({
        status: TodoStatusEnum.optional(),
        priority: PriorityEnum.optional(),
        search: z.string().optional(),
        fromdue: z.string().optional(),
        todue: z.string().optional(),
        fromcompleted: z.string().optional(),
        tocompleted: z.string().optional(),
        isstarred: z
          .string()
          .optional()
          .transform((val) => {
            if (val === "true") return true;
            if (val === "false") return false;
            return undefined;
          }),
        sortBy: z.enum(VALID_TODO_SORT_FIELDS).optional(),
        sortOrder: z.enum(["asc", "desc"]).optional(),
        page: z.string().optional().default("1"),
        pageSize: z.string().optional().default("20"),
      })
    ),
    async (c) => {
      try {
        const user = c.get("user");
        const {
          status,
          priority,
          search,
          fromdue,
          todue,
          fromcompleted,
          tocompleted,
          isstarred,
          sortBy,
          sortOrder,
          page,
          pageSize,
        } = c.req.valid("query");

        const todos = await todosService.getTodos({
          userId: user.id,
          status,
          priority,
          search,
          fromDueDate: fromdue,
          toDueDate: todue,
          fromCompletedDate: fromcompleted,
          toCompletedDate: tocompleted,
          isStarred: isstarred,
          sortBy,
          sortOrder,
          page: parseInt(page),
          pageSize: parseInt(pageSize),
        });

        return c.json({
          success: true,
          data: {
            ...todos,
            hasNextPage: todos.totalCount > parseInt(page) * parseInt(pageSize),
            page: parseInt(page),
          },
        });
      } catch (error) {
        return c.json(
          {
            success: false,
            error:
              error instanceof Error ? error.message : "Failed to list todos",
          },
          400
        );
      }
    }
  );

export default app;
