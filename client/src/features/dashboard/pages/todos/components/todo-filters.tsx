import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useDebounce } from "@uidotdev/usehooks";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DateRangePicker } from "@/components/shared/date-range-picker";

// Icons
import { Filter, Search, Star, X } from "lucide-react";

// Utils and Types
import { cn } from "@/lib/utils";
import {
  Priority,
  PriorityEnum,
  TodoStatus,
  TodoStatusEnum,
} from "@server/src/types/todos.types";
import { TodoFiltersType } from "@/types/todos.types";

// Constants
const DEBOUNCE_DELAY = 300;
const DATE_FORMAT = "yyyy-MM-dd";

interface TodoFilterControlsProps {
  search: TodoFiltersType;
  updateQueryParams: (updates: Partial<TodoFiltersType>) => void;
  className?: string;
}

/**
 * Main TodoFilters component that handles filtering of todos
 */
export const TodoFilters = () => {
  const search: TodoFiltersType = useSearch({ from: "/(app)/dashboard/todos" });
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState(search.search || "");
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const debouncedSearchTerm = useDebounce(searchValue, DEBOUNCE_DELAY);

  // Update search params when search term changes
  useEffect(() => {
    updateQueryParams({ search: debouncedSearchTerm || undefined });
  }, [debouncedSearchTerm]);

  /**
   * Updates URL query parameters while maintaining existing filters
   */
  const updateQueryParams = (updates: Partial<TodoFiltersType>) => {
    if (!Object.keys(updates).length) {
      navigate({
        to: "/dashboard/todos",
        search: {},
      });
      return;
    }

    const currentParams = {
      status: search.status,
      priority: search.priority,
      isstarred: search.isstarred === true,
      search: search.search,
      fromdue: search.fromdue,
      todue: search.todue,
      fromcompleted: search.fromcompleted,
      tocompleted: search.tocompleted,
    };

    const newParams = {
      ...currentParams,
      ...updates,
      ...formatDateParams(updates),
    };

    // Remove falsy values
    const cleanedParams = removeEmptyParams(newParams);

    navigate({
      to: "/dashboard/todos",
      search: cleanedParams,
    });
  };

  /**
   * Formats date parameters to the required format
   */
  const formatDateParams = (updates: Partial<TodoFiltersType>) => ({
    fromdue: updates.fromdue
      ? format(new Date(updates.fromdue), DATE_FORMAT)
      : undefined,
    todue: updates.todue
      ? format(new Date(updates.todue), DATE_FORMAT)
      : undefined,
    fromcompleted: updates.fromcompleted
      ? format(new Date(updates.fromcompleted), DATE_FORMAT)
      : undefined,
    tocompleted: updates.tocompleted
      ? format(new Date(updates.tocompleted), DATE_FORMAT)
      : undefined,
  });

  /**
   * Removes undefined and false values from params
   */
  const removeEmptyParams = (params: Record<string, any>) => {
    const cleaned = { ...params };
    Object.keys(cleaned).forEach((key) => {
      if (cleaned[key] === undefined || cleaned[key] === false) {
        delete cleaned[key];
      }
    });
    return cleaned;
  };

  const handleClearFilters = () => {
    setSearchValue("");
    updateQueryParams({});
  };

  const hasActiveFilters =
    search.status ||
    search.priority ||
    search.isstarred ||
    search.fromdue ||
    search.todue ||
    search.fromcompleted ||
    search.tocompleted ||
    search.search;

  return (
    <div className="flex w-full flex-wrap items-center gap-4">
      {/* Search Input */}
      <div className="relative flex w-full max-w-md flex-1 items-center md:min-w-[300px]">
        <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search todos..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateQueryParams({ search: searchValue || undefined });
            }
          }}
          className="pl-10"
          aria-label="Search todos"
        />
      </div>

      {/* Desktop Filters */}
      <div className="hidden flex-wrap items-center gap-4 xl:flex">
        <TodoFilterControls
          search={search}
          updateQueryParams={updateQueryParams}
          className="flex w-full flex-wrap items-center gap-4"
        />
      </div>

      {/* Mobile Filters Sheet */}
      <Sheet open={isOpenFilters} onOpenChange={setIsOpenFilters}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="font-normal xl:hidden"
            aria-label="Open filters"
          >
            <Filter />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Filter todos by status, priority, due date, completed date, and
              starred.
            </SheetDescription>
          </SheetHeader>
          <TodoFilterControls
            search={search}
            updateQueryParams={updateQueryParams}
            className="mt-4 flex w-full flex-col justify-center gap-4"
          />
          <Button
            className="mt-4 w-full"
            onClick={() => setIsOpenFilters(false)}
          >
            Apply
          </Button>
        </SheetContent>
      </Sheet>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              onClick={handleClearFilters}
              aria-label="Clear all filters"
            >
              <X />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Clear all filters</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

/**
 * TodoFilterControls component that contains all filter controls
 */
const TodoFilterControls = ({
  search,
  updateQueryParams,
  className,
}: TodoFilterControlsProps) => {
  const handleDateRangeChange = (
    type: "due" | "completed",
    dateRange: DateRange | undefined,
  ) => {
    const updates = {
      [`from${type}`]: dateRange?.from?.toISOString(),
      [`to${type}`]: dateRange?.to?.toISOString(),
    };
    updateQueryParams(updates);
  };

  return (
    <div className={className}>
      {/* Status Filter */}
      <Select
        value={search.status || "ALL"}
        onValueChange={(value) =>
          updateQueryParams({
            status: value === "ALL" ? undefined : (value as TodoStatus),
          })
        }
      >
        <SelectTrigger className="w-full xl:w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Status</SelectItem>
          {Object.values(TodoStatusEnum.options).map((status) => (
            <SelectItem key={status} value={status}>
              {status
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Priority Filter */}
      <Select
        value={search.priority || "ALL"}
        onValueChange={(value) =>
          updateQueryParams({
            priority: value === "ALL" ? undefined : (value as Priority),
          })
        }
      >
        <SelectTrigger className="w-full xl:w-[150px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Priority</SelectItem>
          {PriorityEnum.options.map((priority) => (
            <SelectItem key={priority} value={priority}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Date Range Pickers */}
      <DateRangePicker
        label="Due Date :"
        from={search.fromdue ? new Date(search.fromdue) : undefined}
        to={search.todue ? new Date(search.todue) : undefined}
        onChange={(dateRange) => handleDateRangeChange("due", dateRange)}
        onReset={() =>
          updateQueryParams({ fromdue: undefined, todue: undefined })
        }
      />

      <DateRangePicker
        label="Completed Date :"
        from={search.fromcompleted ? new Date(search.fromcompleted) : undefined}
        to={search.tocompleted ? new Date(search.tocompleted) : undefined}
        onChange={(dateRange) => handleDateRangeChange("completed", dateRange)}
        onReset={() =>
          updateQueryParams({
            fromcompleted: undefined,
            tocompleted: undefined,
          })
        }
      />

      {/* Starred Filter */}
      <Button
        variant="outline"
        className="w-full font-normal xl:w-[40px]"
        onClick={() =>
          updateQueryParams({
            isstarred: search.isstarred === true ? undefined : true,
          })
        }
        aria-label={`${search.isstarred ? "Remove star filter" : "Show starred items only"}`}
      >
        <Star
          className={cn(
            "h-4 w-4",
            search.isstarred === true && "fill-orange-500 text-orange-500",
          )}
        />
        <span className="inline-block xl:hidden">
          {search.isstarred ? "Starred" : "All"}
        </span>
      </Button>
    </div>
  );
};
