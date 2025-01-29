// External library imports
import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useReactTable, flexRender } from "@tanstack/react-table";
import { Loader2, PackageSearch } from "lucide-react";

// Internal component imports
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Hooks and utilities
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, getRowClassName } from "@/lib/utils";
import { DEFAULT_PAGE_SIZE } from "@/constants/page.constants";
import { TodoTableSkeleton } from "./todo-table-skeleton";

// Types
import { Todo } from "@server/src/types/todos.types";

interface TodoTableProps {
  table: ReturnType<typeof useReactTable<Todo>>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  loadMore: () => void;
  isLoading?: boolean;
}

/**
 * EmptyState Component
 * Displays when no todos match the current filters
 */
const EmptyState = ({ onClearFilters }: { onClearFilters: () => void }) => (
  <div
    className="flex h-[400px] flex-col items-center justify-center p-8 text-center"
    role="status"
    aria-label="No todos found"
  >
    <PackageSearch
      className="mb-4 h-16 w-16 text-muted-foreground"
      aria-hidden="true"
    />
    <h3 className="mb-2 text-lg font-semibold">No Matching Todos</h3>
    <p className="mb-4 text-muted-foreground">
      Try adjusting your filters to find what you're looking for
    </p>
    <Button variant="outline" onClick={onClearFilters}>
      Clear Filters
    </Button>
  </div>
);

/**
 * TodoTable Component
 * Main component for displaying todos in a table format with infinite scrolling
 */
export const TodoTable = ({
  table,
  hasNextPage,
  isFetchingNextPage,
  loadMore,
  isLoading,
}: TodoTableProps) => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { open } = useSidebar();
  const isMobile = useIsMobile();

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    const currentRef = loadingRef.current;
    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        loadMore();
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, loadMore]);

  const handleClearFilters = () => {
    navigate({
      to: "/dashboard/todos",
      search: {},
    });
  };

  // Show empty state when no todos are found
  if (!isLoading && !table.getRowModel().rows.length) {
    return <EmptyState onClearFilters={handleClearFilters} />;
  }

  // Calculate table container width based on sidebar state
  const tableContainerClassName = cn(
    "max-h-[calc(100vh-22rem)] overflow-auto rounded-none bg-card",
    open && !isMobile
      ? "max-w-[calc(100vw-22rem)]"
      : "max-w-[calc(100vw-2rem)]",
    !open && !isMobile && "max-w-[calc(100vw-8rem)]",
  );

  return (
    <div className={tableContainerClassName}>
      <Table role="grid" aria-busy={isLoading}>
        <TableHeader className="bg-neutral-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              role="row"
              className="hover:bg-neutral-900"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="whitespace-nowrap text-white"
                  role="columnheader"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TodoTableSkeleton headerCount={8} rowCount={DEFAULT_PAGE_SIZE} />
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={getRowClassName({
                  isSelected: row.getIsSelected(),
                  optimisticOperation: row.original.optimisticOperation,
                })}
                role="row"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="whitespace-nowrap py-2"
                    role="cell"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>

        <TableFooter className="border-0">
          <TableRow>
            <TableCell
              colSpan={8}
              className={cn(
                "w-full p-0 text-center",
                isFetchingNextPage && "p-4",
              )}
            >
              <div
                ref={loadingRef}
                className="flex items-center justify-center"
                role="status"
                aria-label={isFetchingNextPage ? "Loading more todos" : ""}
              >
                {isFetchingNextPage && (
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
