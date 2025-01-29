// External imports
import { Circle, Timer, CheckCircle2, Archive, HelpCircle } from "lucide-react";

// Internal imports
import { cn } from "@/lib/utils";
import { TodoStatusEnum } from "@server/src/types/todos.types";

// Component props interface
interface StatusProps {
  status: string;
  size?: "sm" | "md" | "lg";
}

// Status configuration mapping for different todo states
const statusConfig = {
  [TodoStatusEnum.Enum.todo]: {
    label: "Todo",
    icon: Circle,
    className: "text-yellow-700 bg-yellow-50 border-yellow-200",
  },
  [TodoStatusEnum.Enum.in_progress]: {
    label: "In Progress",
    icon: Timer,
    className: "text-blue-700 bg-blue-50 border-blue-200",
  },
  [TodoStatusEnum.Enum.completed]: {
    label: "Completed",
    icon: CheckCircle2,
    className: "text-green-700 bg-green-50 border-green-200",
  },
  [TodoStatusEnum.Enum.archived]: {
    label: "Archived",
    icon: Archive,
    className: "text-gray-700 bg-gray-50 border-gray-200",
  },
} as const;

// Size configuration mapping for different display sizes
const sizeClasses = {
  sm: "text-xs px-2 py-1 gap-1",
  md: "text-sm px-3 py-1.5 gap-1.5",
  lg: "text-base px-4 py-2 gap-2",
} as const;

// Icon size mapping based on component size
const iconSizes = {
  sm: "size-3",
  md: "size-4",
  lg: "size-5",
} as const;

/**
 * Status Component
 * Displays a status badge with an icon and label
 * Supports different sizes and status types
 */
export const Status = ({ status, size = "md" }: StatusProps) => {
  const config = statusConfig[status as keyof typeof statusConfig] ?? {
    label: "Unknown Status",
    icon: HelpCircle,
    className: "text-gray-500 bg-gray-50 border-gray-200",
  };

  const IconComponent = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border-2 font-medium",
        config.className,
        sizeClasses[size],
      )}
    >
      <IconComponent className={iconSizes[size]} />
      <span>{config.label}</span>
    </div>
  );
}
