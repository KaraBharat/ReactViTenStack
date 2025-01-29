// External library imports
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";

// Types and utilities
import { Todo } from "@server/src/types/todos.types";

// UI Components
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { TodoActions } from "./todo-actions";
import { Priority } from "./priority";
import { Status } from "./status";
import { cn } from "@/lib/utils";

// Column helper initialization
const columnHelper = createColumnHelper<Todo>();

/**
 * Reusable sort button component for column headers
 */
const SortButton = ({
  label,
  isSorted,
  onClick,
}: {
  label: string;
  isSorted: string | boolean;
  onClick: () => void;
}) => {
  return (
    <Button
      variant="ghost"
      className="p-0 hover:bg-transparent hover:text-white"
      onClick={onClick}
      aria-label={`Sort by ${label}`}
    >
      {label}
      <ArrowUpDown
        className={cn("size-4 text-muted-foreground", isSorted && "text-white")}
        aria-hidden="true"
      />
    </Button>
  );
};

/**
 * Format date helper function
 */
const formatDate = (date: string | null | undefined): string => {
  return date ? format(new Date(date), "MMM d, yyyy") : "-";
};

/**
 * Table column definitions for Todo items
 */
export const todoColumns = [
  // Selection column
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all todos"
          className="border-white"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          disabled={row.original.optimisticOperation === "delete"}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={`Select todo: ${row.original.title}`}
        />
      </div>
    ),
    enableSorting: false,
  }),

  // Title column
  columnHelper.accessor("title", {
    header: ({ column }) => (
      <SortButton
        label="Title"
        isSorted={column.getIsSorted()}
        onClick={() => column.toggleSorting()}
      />
    ),
    cell: (info) => (
      <div className="flex items-center gap-2">
        <span>{info.getValue()}</span>
      </div>
    ),
  }),

  // Status column
  columnHelper.accessor("status", {
    header: ({ column }) => (
      <SortButton
        label="Status"
        isSorted={column.getIsSorted()}
        onClick={() => column.toggleSorting()}
      />
    ),
    cell: (info) => {
      return <Status status={info.getValue()} size="sm" />;
    },
  }),

  // Priority column
  columnHelper.accessor("priority", {
    header: ({ column }) => (
      <SortButton
        label="Priority"
        isSorted={column.getIsSorted()}
        onClick={() => column.toggleSorting()}
      />
    ),
    cell: (info) => {
      return <Priority priority={info.getValue()} size="sm" />;
    },
  }),

  // Due Date column
  columnHelper.accessor("dueDate", {
    header: ({ column }) => (
      <SortButton
        label="Due Date"
        isSorted={column.getIsSorted()}
        onClick={() => column.toggleSorting()}
      />
    ),
    cell: (info) => formatDate(info.getValue()?.toISOString()),
    sortingFn: "datetime",
  }),

  // Completed Date column
  columnHelper.accessor("completedAt", {
    header: ({ column }) => (
      <SortButton
        label="Completed Date"
        isSorted={column.getIsSorted()}
        onClick={() => column.toggleSorting()}
      />
    ),
    cell: (info) => formatDate(info.getValue()?.toISOString()),
    sortingFn: "datetime",
  }),

  // Created Date column
  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <SortButton
        label="Created Date"
        isSorted={column.getIsSorted()}
        onClick={() => column.toggleSorting()}
      />
    ),
    cell: (info) => formatDate(info.getValue()?.toISOString()),
    sortingFn: "datetime",
  }),

  // Actions column
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => (
      <TodoActions
        id={row.original.id}
        isStarred={row.original.isStarred}
        status={row.original.status}
        optimisticOperation={row.original.optimisticOperation}
      />
    ),
  }),
];
