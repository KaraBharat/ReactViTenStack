// External imports
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

// Internal imports
import { client } from "@/lib/hono";
import { handleApiError } from "@/lib/utils";
import { TodoFiltersType } from "@/types/todos.types";
import { setAppliedFilters, todoKeys } from "./todos.queries";

/**
 * Custom hook for fetching paginated todos with filtering
 * @param filters - Object containing filter criteria for todos
 * @returns InfiniteQuery result with todo list data and pagination
 */
export const useTodos = (filters: TodoFiltersType) => {
  setAppliedFilters(filters);

  return useInfiniteQuery({
    queryKey: todoKeys.lists(filters),
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await client.api.todos.$get({
          query: {
            ...filters,
            page: pageParam.toString(),
            pageSize: filters.pageSize?.toString(),
            isstarred: filters.isstarred?.toString(),
          },
        });

        if (!response.ok) {
          throw new Error("Error in fetching todos");
        }

        return await response.json();
      } catch (error) {
        handleApiError(error);
      }
    },
    getNextPageParam: (lastPage) =>
      lastPage?.data.hasNextPage ? lastPage.data.page + 1 : undefined,
    initialPageParam: 1,
  });
};

/**
 * Custom hook for fetching a single todo by ID
 * @param id - Unique identifier of the todo
 * @returns Query result with single todo data
 */
export const useTodo = (id: string) => {
  return useQuery({
    queryKey: todoKeys.detail(id),
    queryFn: async () => {
      try {
        const response = await client.api.todos[":id"].$get({
          param: { id },
        });

        if (!response.ok) {
          throw new Error("Error in fetching todo");
        }

        return await response.json();
      } catch (error) {
        handleApiError(error);
      }
    },
    enabled: !!id,
  });
};
