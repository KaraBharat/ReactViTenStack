// External Dependencies
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Internal Dependencies
import { client } from "@/lib/hono";
import { getAppliedFilters, todoKeys } from "./todos.queries";
import { NewTodo } from "@server/src/types/todos.types";

/**
 * Custom hook for creating a todo item with optimistic updates
 * Handles the creation process, optimistic updates, and error handling
 *
 * Features:
 * - Optimistic updates for immediate UI feedback
 * - Automatic cache invalidation after mutation
 * - Error handling with rollback capability
 * - Maintains pagination state
 *
 * @returns {UseMutationResult} Mutation object for creating todos
 */
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const filters = getAppliedFilters(true);

  return useMutation({
    // API call to create todo
    mutationFn: async (data: NewTodo) => {
      const response = await client.api.todos.$post({
        json: { ...data, title: data.title },
      });

      if (!response.ok) {
        throw new Error("Error in creating todo");
      }

      return response.json();
    },

    // Optimistic update handler
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: todoKeys.lists(filters) });
      const previousTodos = queryClient.getQueryData(todoKeys.lists(filters));

      if (previousTodos) {
        queryClient.setQueryData(todoKeys.lists(filters), (old: any) => ({
          pages:
            old?.pages.map((page: any, index: number) => ({
              ...page,
              data: {
                ...page.data,
                // Increment total count for all pages
                totalCount: page.data.totalCount + 1,
                // Add new todo only to the first page
                todos:
                  index === 0
                    ? [
                        {
                          ...newTodo,
                          createdAt: new Date(),
                          optimisticOperation: "create",
                        },
                        ...page.data.todos,
                      ]
                    : page.data.todos,
              },
            })) || [],
          pageParams: old?.pageParams || [],
        }));
      }

      return { previousTodos };
    },

    // Error handling with state rollback
    onError: (err, _, context) => {
      queryClient.setQueryData(todoKeys.lists(filters), context?.previousTodos);
      console.error("Error creating todo:", err);
    },

    // Cache invalidation after mutation
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.lists(filters),
      });
    },
  });
};
