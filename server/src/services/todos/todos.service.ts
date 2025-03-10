// External imports
import { and, AnyColumn, asc, desc, eq, gte, ilike, inArray, lte, or, sql } from "drizzle-orm";

// Internal imports
import { todos } from "@/database/schemas/todos.schema";
import { db } from "@/database/drizzle";
import {
  VALID_TODO_SORT_FIELDS,
  TodoStatus,
  NewTodo,
  UpdateTodo,
  Priority,
  TodoStatusEnum,
} from "@/types/todos.types";

/**
 * Parameters for retrieving todos with filtering, pagination, and sorting
 */
export type GetTodosParams = {
  page: number;
  pageSize: number;
  userId: string;
  status?: TodoStatus;
  priority?: Priority;
  search?: string;
  fromDueDate?: string;
  toDueDate?: string;
  fromCompletedDate?: string;
  toCompletedDate?: string;
  isStarred?: boolean;
  sortBy?: (typeof VALID_TODO_SORT_FIELDS)[number];
  sortOrder?: "asc" | "desc";
};

type SortField = (typeof VALID_TODO_SORT_FIELDS)[number];

/**
 * Type guard to validate sort field
 */
function isValidSortField(field: string | undefined): field is SortField {
  return VALID_TODO_SORT_FIELDS.includes(field as SortField);
}

/**
 * Service class handling all todo-related operations
 */
export class TodosService {
  /**
   * Builds query conditions based on provided filters
   */
  private getQueryConditions(params: {
    userId: string;
    status?: TodoStatus;
    priority?: Priority;
    isStarred?: boolean;
    search?: string;
    fromDueDateToApply?: Date;
    toDueDateToApply?: Date;
    fromCompletedDateToApply?: Date;
    toCompletedDateToApply?: Date;
  }) {
    const conditions = [];

    // Always add userId condition as it's required
    conditions.push(eq(todos.userId, params.userId));

    if (params.status) {
      conditions.push(eq(todos.status, params.status));
    }
    if (params.priority !== undefined) {
      conditions.push(eq(todos.priority, params.priority));
    }
    if (params.isStarred === true) {
      conditions.push(eq(todos.isStarred, true));
    }
    if (params.search) {
      conditions.push(
        or(
          ilike(todos.title, `%${params.search}%`),
          ilike(todos.description || "", `%${params.search}%`)
        )
      );
    }
    if (params.fromDueDateToApply) {
      conditions.push(gte(todos.dueDate, params.fromDueDateToApply));
    }
    if (params.toDueDateToApply) {
      conditions.push(lte(todos.dueDate, params.toDueDateToApply));
    }
    if (params.fromCompletedDateToApply) {
      conditions.push(gte(todos.completedAt, params.fromCompletedDateToApply));
    }
    if (params.toCompletedDateToApply) {
      conditions.push(lte(todos.completedAt, params.toCompletedDateToApply));
    }
    return and(...conditions);
  }

  /**
   * Processes and normalizes date inputs
   */
  private processDate(date: string | undefined, isEndDate: boolean = false): Date | undefined {
    if (!date) return undefined;

    const processedDate = new Date(date);
    if (isEndDate) {
      processedDate.setHours(23, 59, 59, 999);
    } else {
      processedDate.setHours(0, 0, 0, 0);
    }
    return processedDate;
  }

  /**
   * Determines the sorting field and order
   */
  private getSortingField = (sortBy: SortField, sortOrder: "asc" | "desc") => {
    if (!sortBy || !isValidSortField(sortBy)) {
      // Default sorting
      return desc(todos.createdAt);
    }

    const sortColumn = todos[sortBy as keyof typeof todos] as AnyColumn;
    return sortOrder === "desc"
      ? sql`${sortColumn} DESC NULLS LAST` // Keep nulls at bottom for desc
      : sql`${sortColumn} ASC NULLS FIRST`; // Keep nulls at top for asc
  };

  /**
   * Retrieves todos with pagination and filtering
   */
  async getTodos(params: GetTodosParams) {
    const sortingField = this.getSortingField(
      params.sortBy as SortField,
      params.sortOrder as "asc" | "desc"
    );

    const dateParams = {
      fromDueDateToApply: this.processDate(params.fromDueDate, false),
      toDueDateToApply: this.processDate(params.toDueDate, true),
      fromCompletedDateToApply: this.processDate(params.fromCompletedDate, false),
      toCompletedDateToApply: this.processDate(params.toCompletedDate, true),
    };

    const queryConditions = this.getQueryConditions({
      ...params,
      ...dateParams,
    });

    const [total] = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(todos)
      .where(queryConditions);

    const data = await db
      .select()
      .from(todos)
      .where(queryConditions)
      .orderBy(sortingField)
      .limit(params.pageSize)
      .offset((params.page - 1) * params.pageSize);

    return {
      todos: data,
      totalCount: total?.count ? Number(total.count) : 0,
    };
  }

  /**
   * Retrieves a single todo by ID
   */
  async getTodoById(id: string, userId: string) {
    const [data] = await db
      .select()
      .from(todos)
      .where(and(eq(todos.id, id), eq(todos.userId, userId)));

    return data;
  }

  /**
   * Creates a new todo
   */
  async createTodo(values: NewTodo, userId: string) {
    const completedAt = this.determineCompletedAt(values.status, null);

    const [data] = await db
      .insert(todos)
      .values({
        ...values,
        userId,
        dueDate: values.dueDate ? new Date(values.dueDate) : null,
        completedAt,
      })
      .returning();

    return data;
  }

  /**
   * Updates an existing todo
   */
  async updateTodo(id: string, userId: string, values: UpdateTodo) {
    const currentTodo = await this.getTodoById(id, userId);

    if (!currentTodo) {
      throw new Error("Todo not found");
    }

    const completedAt = this.determineCompletedAt(values.status, currentTodo.completedAt);

    const [data] = await db
      .update(todos)
      .set({
        ...values,
        updatedAt: new Date(),
        dueDate: values.dueDate ? new Date(values.dueDate) : null,
        completedAt,
      })
      .where(and(eq(todos.id, id), eq(todos.userId, userId)))
      .returning();

    return data;
  }

  /**
   * Determines the completedAt date based on todo status
   */
  private determineCompletedAt(status?: TodoStatus, currentCompletedAt?: Date | null): Date | null {
    if (status === TodoStatusEnum.Enum.completed) {
      return new Date();
    }
    if (status === TodoStatusEnum.Enum.todo || status === TodoStatusEnum.Enum.in_progress) {
      return null;
    }
    return currentCompletedAt || null;
  }

  /**
   * Deletes a todo
   */
  async deleteTodo(id: string, userId: string) {
    const [data] = await db
      .delete(todos)
      .where(and(eq(todos.id, id), eq(todos.userId, userId)))
      .returning();

    return data;
  }

  /**
   * Toggles todo status
   */
  async toggleTodoStatus(id: string, userId: string, status: TodoStatus) {
    const currentTodo = await this.getTodoById(id, userId);

    if (!currentTodo) {
      throw new Error("Todo not found");
    }

    const completedAt = this.determineCompletedAt(status, currentTodo.completedAt);

    const [data] = await db
      .update(todos)
      .set({
        status,
        updatedAt: new Date(),
        completedAt,
      })
      .where(and(eq(todos.id, id), eq(todos.userId, userId)))
      .returning();

    return data;
  }

  /**
   * Toggles starred status
   */
  async toggleStarred(id: string, userId: string) {
    const [todo] = await db
      .select({ isStarred: todos.isStarred })
      .from(todos)
      .where(and(eq(todos.id, id), eq(todos.userId, userId)));

    if (!todo) {
      throw new Error("Todo not found");
    }

    const [data] = await db
      .update(todos)
      .set({
        isStarred: !todo.isStarred,
        updatedAt: new Date(),
      })
      .where(and(eq(todos.id, id), eq(todos.userId, userId)))
      .returning();
    return data;
  }

  /**
   * Updates status for multiple todos
   */
  async bulkUpdateStatus(ids: string[], userId: string, status: TodoStatus) {
    const completedAt = status === TodoStatusEnum.Enum.completed ? new Date() : null;

    return db
      .update(todos)
      .set({
        status,
        updatedAt: new Date(),
        completedAt,
      })
      .where(and(inArray(todos.id, ids), eq(todos.userId, userId)))
      .returning();
  }

  /**
   * Deletes multiple todos
   */
  async bulkDelete(ids: string[], userId: string) {
    return db
      .delete(todos)
      .where(and(inArray(todos.id, ids), eq(todos.userId, userId)))
      .returning();
  }
}

export const todosService = new TodosService();
