import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Define types for variant options
type VariantType = "default" | "light" | "dark";
type SizeType = "default" | "sm" | "lg";

// Overlay styling variants with improved organization
const overlayVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-black/20 backdrop-blur-[2px]",
        light: "bg-white/40 backdrop-blur-[1px]",
        dark: "bg-black/40 backdrop-blur-[3px]",
      } satisfies Record<VariantType, string>,
      size: {
        default: "",
        sm: "p-2",
        lg: "p-4",
      } satisfies Record<SizeType, string>,
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// Spinner container styling variants
const spinnerVariants = cva(
  "flex flex-col items-center gap-2 rounded-lg p-4 shadow-lg backdrop-blur-md",
  {
    variants: {
      variant: {
        default: "bg-white/80",
        light: "bg-white/90",
        dark: "bg-gray-900/80",
      } satisfies Record<VariantType, string>,
      size: {
        default: "p-4",
        sm: "p-2",
        lg: "p-6",
      } satisfies Record<SizeType, string>,
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface LoadingOverlayProps extends VariantProps<typeof overlayVariants> {
  /** Controls the visibility of the overlay */
  isLoading: boolean;
  /** Optional message to display below the spinner */
  message?: string;
  /** Additional classes for the overlay container */
  className?: string;
  /** Additional classes for the spinner container */
  spinnerClassName?: string;
  /** Controls whether to show the loading spinner */
  showLoader?: boolean;
}

/**
 * LoadingOverlay Component
 *
 * A customizable loading overlay that can be used to indicate loading states
 * with optional message display and styling variants.
 */
export const LoadingOverlay = ({
  isLoading,
  message,
  className,
  spinnerClassName,
  variant,
  size,
  showLoader = true,
}: LoadingOverlayProps) => {
  if (!isLoading) return null;

  // Simple overlay without spinner
  if (!showLoader) {
    return (
      <div
        role="alert"
        aria-busy="true"
        className={cn(overlayVariants({ variant, size }), className)}
      />
    );
  }

  // Memoize common classes
  const messageTextColor =
    variant === "dark" ? "text-neutral-200" : "text-neutral-700";

  return (
    <div
      role="alert"
      aria-busy="true"
      aria-label={message || "Loading"}
      className={cn(overlayVariants({ variant, size }), className)}
    >
      <div className={cn(spinnerVariants({ variant, size }), spinnerClassName)}>
        <div className="relative">
          {/* Glow effect container */}
          <div
            className={cn(
              "absolute inset-0 rounded-full",
              "bg-neutral-600/20 blur-xl",
              "animate-pulse",
            )}
            aria-hidden="true"
          />

          {/* Shadow effect */}
          <div
            className={cn(
              "absolute -bottom-2 left-1/2 h-2 w-8",
              "-translate-x-1/2 rounded-full",
              "bg-neutral-600/20 blur-sm",
              "animate-[shadow_2s_ease-in-out_infinite]",
            )}
            aria-hidden="true"
          />

          {/* Spinner */}
          <div className="relative">
            <Loader2
              aria-hidden="true"
              className={cn("size-8 animate-spin text-neutral-600")}
            />
          </div>
        </div>

        {message && (
          <span
            className={cn(
              "mt-2 text-sm font-medium",
              "animate-[fade_2s_ease-in-out_infinite]",
              messageTextColor,
            )}
          >
            {message}
          </span>
        )}
      </div>
    </div>
  );
};
