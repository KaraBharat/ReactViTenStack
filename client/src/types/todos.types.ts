import {
  TodoStatus,
  Priority,
  VALID_TODO_SORT_FIELDS,
} from "@server/src/types/todos.types";

export type TodoFiltersType = {
  status?: TodoStatus;
  priority?: Priority;
  search?: string;
  fromdue?: string;
  todue?: string;
  fromcompleted?: string;
  tocompleted?: string;
  isstarred?: boolean;
  sortBy?: (typeof VALID_TODO_SORT_FIELDS)[number];
  sortOrder?: "asc" | "desc";
  pageSize?: number;
};