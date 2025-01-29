// External dependencies
import { useQueryClient } from "@tanstack/react-query";

// Internal dependencies
import { DEFAULT_PAGE_SIZE } from "@/constants/page.constants";
import { TodoFiltersType } from "@/types/todos.types";

/**
 * Query key factory for todo-related queries
 * Provides consistent query keys for React Query cache management
 * Structure follows recommended React Query key factory pattern
 */
export const todoKeys = {
  all: ["todos"] as const,
  lists: (filters: TodoFiltersType) =>
    [...todoKeys.all, "list", filters] as const,
  details: () => [...todoKeys.all, "detail"] as const,
  detail: (id: string) => [...todoKeys.details(), id] as const,
  appliedFilters: () => [...todoKeys.all, "applied-filters"] as const,
};

/**
 * Default filter settings for todo queries
 */
export const DEFAULT_FILTERS: TodoFiltersType = {
  pageSize: DEFAULT_PAGE_SIZE,
  sortBy: "createdAt",
  sortOrder: "desc",
};

/**
 * Updates the applied filters in the React Query cache
 * @param filters - The filter settings to be applied
 */
export const setAppliedFilters = (filters: TodoFiltersType): void => {
  const queryClient = useQueryClient();
  queryClient.setQueryData(todoKeys.appliedFilters(), filters);
};

/**
 * Retrieves the currently applied filters from the React Query cache
 * @param defaultFilters - Flag to force return of default filters
 * @returns The current filter settings or default filters
 */
export const getAppliedFilters = (defaultFilters = false): TodoFiltersType => {
  if (defaultFilters) {
    return DEFAULT_FILTERS;
  }

  const queryClient = useQueryClient();
  const filters = queryClient.getQueryData(
    todoKeys.appliedFilters(),
  ) as TodoFiltersType;

  return filters || DEFAULT_FILTERS;
};
