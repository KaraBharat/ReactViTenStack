// External Dependencies
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Internal Dependencies
import { client } from "@/lib/hono";
import { getAppliedFilters, todoKeys } from "./todos.queries";
import {
  Todo,
  TodoStatus,
  TodoStatusEnum,
  UpdateTodo,
} from "@server/src/types/todos.types";

/**
 * Custom hook for managing todo updates
 * Handles optimistic updates and error rollbacks
 * Supports updating todo properties like title, description, due date, etc.
 * @param id - The unique identifier of the todo
 */
export const useUpdateTodo = (id: string) => {
  const queryClient = useQueryClient();
  const filters = getAppliedFilters(true);

  return useMutation({
    mutationFn: async (data: UpdateTodo) => {
      const response = await client.api.todos[":id"].$put({
        param: { id },
        json: { ...data, title: data.title },
      });

      if (!response.ok) {
        throw new Error("Error in updating todo");
      }

      return response.json();
    },
    onMutate: async (updatedTodo) => {
      // Cancel ongoing queries to prevent race conditions
      await queryClient.cancelQueries({ queryKey: todoKeys.lists(filters) });
      await queryClient.cancelQueries({ queryKey: todoKeys.detail(id) });

      const previousTodos = queryClient.getQueryData(todoKeys.lists(filters));
      const previousTodo = queryClient.getQueryData(todoKeys.detail(id));

      // Optimistically update the lists view
      if (previousTodos) {
        queryClient.setQueryData(todoKeys.lists(filters), (old: any) => ({
          pages: old?.pages?.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              todos: page.data.todos.map((item: Todo) =>
                item.id === id
                  ? {
                      ...item,
                      ...updatedTodo,
                      optimisticOperation: "update",
                      updatedAt: new Date(),
                      dueDate: updatedTodo.dueDate
                        ? new Date(updatedTodo.dueDate)
                        : null,
                    }
                  : item,
              ),
            },
          })),
          pageParams: old?.pageParams,
        }));
      }

      // Optimistically update the detail view
      if (previousTodo) {
        queryClient.setQueryData(todoKeys.detail(id), (old: any) => ({
          ...old,
          data: {
            ...old.data,
            ...updatedTodo,
            updatedAt: new Date(),
          },
        }));
      }

      return { previousTodos, previousTodo };
    },
    onError: (err, _, context) => {
      console.error("Todo update failed:", err);
      queryClient.setQueryData(todoKeys.lists(filters), context?.previousTodos);
      queryClient.setQueryData(todoKeys.detail(id), context?.previousTodo);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
      queryClient.invalidateQueries({ queryKey: todoKeys.detail(id) });
    },
  });
};

/**
 * Custom hook for toggling a todo's starred status
 * Implements optimistic updates for immediate UI feedback
 * @param id - The unique identifier of the todo
 */
export const useToggleTodoStarred = (id: string) => {
  const queryClient = useQueryClient();
  const filters = getAppliedFilters();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await client.api.todos[":id"]["toggle-starred"].$post({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Error in toggling todo starred status");
      }

      return response.json();
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: todoKeys.lists(filters) });
      await queryClient.cancelQueries({ queryKey: todoKeys.detail(id) });

      const previousTodos = queryClient.getQueryData(todoKeys.lists(filters));
      const previousTodo = queryClient.getQueryData(todoKeys.detail(id));

      if (previousTodos) {
        queryClient.setQueryData(todoKeys.lists(filters), (old: any) => ({
          pages: old?.pages?.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              todos: page.data.todos.map((item: Todo) =>
                item.id === id
                  ? {
                      ...item,
                      isStarred: !item.isStarred,
                      optimisticOperation: "update",
                    }
                  : item,
              ),
            },
          })),
          pageParams: old?.pageParams,
        }));
      }

      if (previousTodo) {
        queryClient.setQueryData(todoKeys.detail(id), (old: any) => ({
          ...old,
          data: {
            ...old.data,
            isStarred: !old.data.isStarred,
            updatedAt: new Date(),
          },
        }));
      }

      return { previousTodos, previousTodo };
    },
    onError: (err, _, context) => {
      console.error("Toggle starred status failed:", err);
      queryClient.setQueryData(todoKeys.lists(filters), context?.previousTodos);
      queryClient.setQueryData(todoKeys.detail(id), context?.previousTodo);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
      queryClient.invalidateQueries({ queryKey: todoKeys.detail(id) });
    },
  });
};

/**
 * Custom hook for toggling a todo's status (todo/in_progress/completed)
 * Handles status transitions and updates completion timestamps
 * @param id - The unique identifier of the todo
 */
export const useToggleTodoStatus = (id: string) => {
  const queryClient = useQueryClient();
  const filters = getAppliedFilters();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: TodoStatus }) => {
      const response = await client.api.todos[":id"]["toggle-status"].$post({
        param: { id },
        json: { status },
      });

      if (!response.ok) {
        throw new Error("Error in toggling todo status");
      }

      return response.json();
    },
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: todoKeys.lists(filters) });
      await queryClient.cancelQueries({ queryKey: todoKeys.detail(id) });

      const previousTodos = queryClient.getQueryData(todoKeys.lists(filters));
      const previousTodo = queryClient.getQueryData(todoKeys.detail(id));

      if (previousTodos) {
        queryClient.setQueryData(todoKeys.lists(filters), (old: any) => ({
          pages: old?.pages?.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              todos: page.data.todos.map((item: Todo) =>
                item.id === id
                  ? {
                      ...item,
                      status,
                      completedAt:
                        status === TodoStatusEnum.Enum.completed
                          ? new Date()
                          : status === TodoStatusEnum.Enum.in_progress ||
                              status === TodoStatusEnum.Enum.todo
                            ? null
                            : item.completedAt,
                      optimisticOperation: "update",
                    }
                  : item,
              ),
            },
          })),
          pageParams: old?.pageParams,
        }));
      }

      if (previousTodo) {
        queryClient.setQueryData(todoKeys.detail(id), (old: any) => ({
          ...old,
          data: {
            ...old.data,
            status,
            completedAt:
              status === TodoStatusEnum.Enum.completed ? new Date() : null,
            updatedAt: new Date(),
          },
        }));
      }

      return { previousTodos, previousTodo };
    },
    onError: (err, _, context) => {
      console.error("Toggle status failed:", err);
      queryClient.setQueryData(todoKeys.lists(filters), context?.previousTodos);
      queryClient.setQueryData(todoKeys.detail(id), context?.previousTodo);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
      queryClient.invalidateQueries({ queryKey: todoKeys.detail(id) });
    },
  });
};
