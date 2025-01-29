// External Libraries
import { useState } from "react";
import { Trash2, PlusCircle, Loader2, ClipboardList } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody } from "@/components/ui/table";

// Internal Components
import { Button } from "@/components/ui/button";
import { DEFAULT_PAGE_SIZE } from "@/constants/page.constants";
import { TodoTable } from "./todo-table";
import { todoColumns } from "./todo-columns";
import { TodoFilters } from "./todo-filters";
import { TodoTableSkeleton } from "./todo-table-skeleton";

// Hooks
import useTodosPage from "../hooks/use-todos";

// Types
import { Todo } from "@server/src/types/todos.types";

/**
 * TodoList Component
 * Renders a comprehensive todo list with filtering, sorting, and bulk deletion capabilities
 */
const TodoList = () => {
  // Custom hook for todo management
  const {
    todos,
    isLoading,
    deleteTodos,
    isDeletingTodosBulk,
    hasNextPage,
    isFetchingNextPage,
    loadMore,
    totalTodos,
    ConfirmationDialog,
    confirm,
    hasActiveFilters,
    sorting,
    setSorting,
  } = useTodosPage();

  // Local state for row selection
  const [rowSelection, setRowSelection] = useState({});

  // Table configuration using TanStack Table
  const table = useReactTable({
    data: todos as Todo[],
    columns: todoColumns,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
    onSortingChange: setSorting,
  });

  /**
   * Handles bulk deletion of selected todos
   * Requires user confirmation before proceeding
   */
  const handleBulkDelete = async () => {
    const confirmed = await confirm();
    if (!confirmed) return;

    const selectedRows = table.getSelectedRowModel().rows;
    const selectedIds = selectedRows.map((row) => row.original.id);
    setRowSelection({});
    await deleteTodos(selectedIds);
  };

  // Loading state
  if (isLoading && !hasActiveFilters() && !sorting.length) {
    return (
      <Table role="grid" aria-busy={isLoading}>
        <TableBody>
          <TodoTableSkeleton headerCount={8} rowCount={DEFAULT_PAGE_SIZE} />
        </TableBody>
      </Table>
    );
  }

  // Empty state
  if (!todos.length && !isLoading && !hasActiveFilters() && !sorting.length) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center p-8 text-center">
        <h3 className="mb-2 text-lg font-semibold">No Todos Found</h3>
        <p className="mb-4 text-muted-foreground">
          Get started by creating your first todo
        </p>
        <Link to="/dashboard/todos/new">
          <Button
            className="bg-neutral-950 hover:bg-neutral-800"
            aria-label="Create new todo"
          >
            <PlusCircle className="h-4 w-4" />
            Create Todo
          </Button>
        </Link>
      </div>
    );
  }

  // Main content
  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex w-full items-center gap-4">
            <TodoFilters />
          </div>
          {!isLoading && table.getSelectedRowModel().rows.length > 0 && (
            <Button
              variant="destructive"
              className="ml-4"
              onClick={handleBulkDelete}
              disabled={isDeletingTodosBulk}
              aria-label={`Delete ${table.getSelectedRowModel().rows.length} selected todos`}
            >
              <Trash2 className="h-4 w-4" />
              {isDeletingTodosBulk ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                `Delete (${table.getSelectedRowModel().rows.length})`
              )}
            </Button>
          )}
        </div>
      </div>

      <div className="relative mt-4 w-full">
        <TodoTable
          table={table}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          loadMore={loadMore}
          isLoading={isLoading}
        />
      </div>

      {!isLoading && (
        <div className="bottom-2 mt-auto flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/30 px-4 py-2.5 backdrop-blur-sm md:sticky">
          <div className="flex items-center gap-2">
            <ClipboardList className="size-4 text-muted-foreground" />
            <p
              className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
              role="status"
            >
              <span>Displaying</span>
              {(isLoading || isFetchingNextPage) && (
                <Loader2 className="inline size-4 animate-spin text-muted-foreground" />
              )}
              <span className="font-medium text-foreground">
                {todos.length}
              </span>
              <span>items out of</span>
              <span className="font-medium text-foreground">
                {totalTodos ?? 0}
              </span>
              <span>total records</span>
            </p>
          </div>
        </div>
      )}

      <ConfirmationDialog />
    </>
  );
};

export default TodoList;
