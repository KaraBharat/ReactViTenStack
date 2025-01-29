import { useState } from "react";
import { ChevronDown } from "lucide-react";

// UI Components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

// Utils
import { formatDateRange } from "@/lib/date-utils";
import { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  /** Label displayed on the date picker button */
  label: string;
  /** Start date of the range */
  from: string | Date | undefined;
  /** End date of the range */
  to: string | Date | undefined;
  /** Callback fired when date range changes */
  onChange: (dateRange: DateRange | undefined) => void;
  /** Callback fired when date range is reset */
  onReset: () => void;
}

export const DateRangePicker = ({
  label,
  from,
  to,
  onChange,
  onReset,
}: DateRangePickerProps) => {
  // Local state to manage the selected date range
  const [date, setDate] = useState<DateRange | undefined>(() =>
    from && to
      ? {
          from: new Date(from),
          to: new Date(to),
        }
      : undefined,
  );

  // Derived state for button display
  const displayRange = {
    from: from ? new Date(from) : date?.from,
    to: to ? new Date(to) : date?.to,
  };

  // Handlers
  const handleDateChange = (dateRange: DateRange | undefined) => {
    onChange(dateRange);
  };

  const handleReset = () => {
    setDate(undefined);
    onReset();
  };

  const isDateRangeSelected = date?.from && date.to;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="text-left font-normal"
          aria-label={`Select date range: ${formatDateRange(displayRange)}`}
        >
          {label}
          <span className="w-auto" aria-live="polite">
            {formatDateRange(displayRange)}
          </span>
          <ChevronDown className="ml-2 size-4 opacity-50" aria-hidden="true" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-full p-0 lg:w-auto"
        align="center"
        role="dialog"
        aria-label="Date range calendar"
      >
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          aria-label="Select date range"
        />

        <div className="flex w-full items-center gap-x-2 p-4">
          <PopoverClose asChild>
            <Button
              onClick={handleReset}
              disabled={!isDateRangeSelected}
              className="w-full"
              variant="outline"
            >
              Reset
            </Button>
          </PopoverClose>

          <PopoverClose asChild>
            <Button
              onClick={() => handleDateChange(date)}
              disabled={!isDateRangeSelected}
              className="w-full"
              variant="default"
            >
              Apply
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
