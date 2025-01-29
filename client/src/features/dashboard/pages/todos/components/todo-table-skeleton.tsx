import { Skeleton } from "@/components/ui/skeleton";
import { TableCell } from "@/components/ui/table";
import { TableRow } from "@/components/ui/table";

interface SkeletonProps {
  headerCount: number;
  rowCount: number;
}

/**
 * TodoTableSkeleton Component
 * Renders a loading skeleton state for the todo table
 */
export const TodoTableSkeleton = ({ headerCount, rowCount }: SkeletonProps) => (
  <>
    {Array.from({ length: rowCount }).map((_, rowIndex) => (
      <TableRow key={rowIndex}>
        {Array.from({ length: headerCount }).map((_, colIndex) => (
          <TableCell
            key={colIndex}
            className="whitespace-nowrap"
            role="cell"
            aria-busy="true"
          >
            <Skeleton className="h-4 w-full" />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);
