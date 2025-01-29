// External imports
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Internal imports
import { client } from "@/lib/hono";
import { getAppliedFilters, todoKeys } from "./todos.queries";
import { Todo } from "@server/src/types/todos.types";

/**
 * Custom hook for deleting a single todo item
 * Handles optimistic updates, error handling, and cache invalidation
 * @returns Mutation object for deleting a todo
 */
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const filters = getAppliedFilters();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await client.api.todos[":id"].$delete({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Error in deleting todo");
      }

      return response.json();
    },

    // Optimistic update handler
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
              totalCount: page.data.totalCount - 1,
              todos: page.data.todos.filter((item: Todo) => item.id !== id),
              optimisticOperation: "delete",
            },
          })),
          pageParams: old?.pageParams,
        }));
      }

      if (previousTodo) {
        queryClient.removeQueries({ queryKey: todoKeys.detail(id) });
      }

      return { previousTodos };
    },

    onError: (err, _, context) => {
      queryClient.setQueryData(todoKeys.lists(filters), context?.previousTodos);
      console.error("Error deleting todo:", err);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.lists(filters) });
    },
  });
};

/**
 * Custom hook for bulk deleting multiple todo items
 * Handles optimistic updates, error handling, and cache invalidation for multiple items
 * @returns Mutation object for bulk deleting todos
 */
export const useDeleteTodosBulk = () => {
  const queryClient = useQueryClient();
  const filters = getAppliedFilters();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await client.api.todos["bulk-delete"].$post({
        json: { ids },
      });

      if (!response.ok) {
        throw new Error("Error in deleting todos");
      }

      return response.json();
    },

    // Optimistic update handler
    onMutate: async (ids) => {
      await queryClient.cancelQueries({ queryKey: todoKeys.lists(filters) });

      const previousTodos = queryClient.getQueryData(todoKeys.lists(filters));

      if (previousTodos) {
        queryClient.setQueryData(todoKeys.lists(filters), (old: any) => ({
          pages: old?.pages?.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              totalCount: page.data.totalCount - ids.length,
              todos: page.data.todos.filter(
                (item: Todo) => !ids.includes(item.id),
              ),
              optimisticOperation: "delete",
            },
          })),
          pageParams: old?.pageParams,
        }));
      }

      ids.forEach((id) => {
        queryClient.removeQueries({ queryKey: todoKeys.detail(id) });
      });

      return { previousTodos };
    },

    onError: (err, _, context) => {
      queryClient.setQueryData(todoKeys.lists(filters), context?.previousTodos);
      console.error("Error deleting todos:", err);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.lists(filters) });
    },
  });
};
