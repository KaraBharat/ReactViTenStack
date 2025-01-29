// External imports
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { SortingState } from "@tanstack/react-table";
import { useSearch } from "@tanstack/react-router";

// Internal imports
import { useConfirm } from "@/hooks/use-confirm";
import { TodoFiltersType } from "@/types/todos.types";
import { DEFAULT_PAGE_SIZE } from "@/constants/page.constants";
import { VALID_TODO_SORT_FIELDS } from "@server/src/types/todos.types";
import { useTodos } from "../queries/todos.get.queries";
import { useDeleteTodosBulk } from "../queries/todos.delete.queries";
import { DEFAULT_FILTERS } from "../queries/todos.queries";

/**
 * Custom hook for managing todos page functionality
 * Handles data fetching, filtering, sorting, and bulk operations
 * @returns Object containing todos data and related functions
 */
const useTodosPage = () => {
  // Get filters from URL search params
  const filters: TodoFiltersType = useSearch({
    from: "/(app)/dashboard/todos",
  });

  // Table sorting state
  const [sorting, setSorting] = useState<SortingState>([]);

  // Compute sort parameters based on sorting state
  const sortParams = useMemo(
    () => ({
      sortBy: sorting.length
        ? (sorting[0]?.id as (typeof VALID_TODO_SORT_FIELDS)[number])
        : DEFAULT_FILTERS.sortBy,
      sortOrder: sorting.length
        ? sorting[0]?.desc
          ? "desc"
          : "asc"
        : DEFAULT_FILTERS.sortOrder,
    }),
    [sorting],
  );

  // Fetch todos with pagination and filtering
  const {
    data: todosResponse,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTodos({
    ...filters,
    pageSize: DEFAULT_PAGE_SIZE,
    ...sortParams,
  });

  // Bulk delete mutation
  const { mutateAsync: deleteTodosBulk, isPending: isDeletingTodosBulk } =
    useDeleteTodosBulk();

  // Confirmation dialog for delete operation
  const [ConfirmationDialog, confirm] = useConfirm({
    title: "Delete Todos",
    message:
      "Are you sure you want to delete these todos? This action cannot be undone.",
  });

  /**
   * Transform API response data to match Todo type with proper date objects
   */
  const todos = useMemo(() => {
    if (!todosResponse?.pages) return [];

    return todosResponse.pages.flatMap((page) => {
      if (!page?.data.todos) return [];

      return page.data.todos.map((todo) => ({
        ...todo,
        dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
        completedAt: todo.completedAt ? new Date(todo.completedAt) : null,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
      }));
    });
  }, [todosResponse]);

  /**
   * Handles bulk deletion of todos
   * @param ids Array of todo IDs to delete
   */
  const deleteTodos = async (ids: string[]) => {
    try {
      await deleteTodosBulk(ids);
      toast.success("Todos deleted successfully");
    } catch (error) {
      console.error("Delete todos error:", error);
      toast.error("Failed to delete todos");
    }
  };

  /**
   * Loads more todos when scrolling
   */
  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  /**
   * Checks if any filters are currently active
   * @returns boolean indicating if any filters are applied
   */
  const hasActiveFilters = () => {
    const activeFilters = [
      filters.status,
      filters.priority,
      filters.sortBy,
      filters.sortOrder,
      filters.fromdue,
      filters.todue,
      filters.fromcompleted,
      filters.tocompleted,
      filters.search,
    ];

    return (
      activeFilters.some(Boolean) ||
      filters.isstarred === true ||
      filters.isstarred === false
    );
  };

  return {
    todos,
    totalTodos: todosResponse?.pages[0]?.data.totalCount,
    isLoading,
    deleteTodos,
    isDeletingTodosBulk,
    hasNextPage,
    isFetchingNextPage,
    loadMore,
    ConfirmationDialog,
    confirm,
    filters,
    hasActiveFilters,
    sorting,
    setSorting,
  };
};

export default useTodosPage;
