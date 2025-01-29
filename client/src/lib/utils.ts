import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Helper function to handle API errors
 */
export const handleApiError = (error: unknown): never => {
  if (error instanceof Error) {
    throw new Error(`API Error: ${error.message}`);
  }
  throw new Error("An unknown error occurred");
};

type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
};

export function formatDateRange(period?: Period) {
  if (!period?.from || !period?.to) {
    return "Select Date Range";
  }

  if (!period?.to) {
    return `${format(period.from, "LLL dd")} - ${format(
      period.from,
      "LLL dd, y",
    )}`;
  }

  if (period.to) {
    return `${format(period.from, "LLL dd")} - ${format(
      period.to,
      "LLL dd, y",
    )}`;
  }

  return `${format(period.from, "LLL dd, y")}`;
}

type OptimisticOperation = "create" | "update" | "delete" | undefined;
export const getRowClassName = ({
  isSelected,
  optimisticOperation,
}: {
  isSelected: boolean;
  optimisticOperation?: OptimisticOperation;
}) => {
  return cn(
    "transition-colors duration-1000 hover:bg-neutral-100",
    isSelected && "bg-muted",
    optimisticOperation && "animate-highlight",
    optimisticOperation === "create" && "from-green-300",
    optimisticOperation === "update" && "from-blue-300",
    optimisticOperation === "delete" && "from-red-300",
  );
};
