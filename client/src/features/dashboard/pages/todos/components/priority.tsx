// External imports
import { cn } from "@/lib/utils";
import {
  ArrowUpCircle,
  ArrowRightCircle,
  ArrowDownCircle,
  HelpCircle,
} from "lucide-react";

// Internal imports
import { PriorityEnum } from "@server/src/types/todos.types";

// Component props type definition
interface PriorityProps {
  priority: string;
  size?: "sm" | "md" | "lg";
}

// Configuration for different priority levels with their respective styles and icons
const priorityConfig = {
  [PriorityEnum.Enum.high]: {
    label: "High",
    icon: ArrowUpCircle,
    className: "text-red-700 bg-red-50 border-red-200",
  },
  [PriorityEnum.Enum.medium]: {
    label: "Medium",
    icon: ArrowRightCircle,
    className: "text-yellow-700 bg-yellow-50 border-yellow-200",
  },
  [PriorityEnum.Enum.low]: {
    label: "Low",
    icon: ArrowDownCircle,
    className: "text-green-700 bg-green-50 border-green-200",
  },
} as const;

// Size configuration for different component sizes
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
 * Priority component displays a badge with icon and label indicating priority level
 * @param priority - Priority level of the todo item
 * @param size - Size variant of the component (sm, md, lg)
 */
export const Priority = ({ priority, size = "md" }: PriorityProps) => {
  const config = priorityConfig[priority as keyof typeof priorityConfig] ?? {
    label: "Unknown Priority",
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
