import { Skeleton } from "@/components/ui/skeleton";

export const TodoFormSkeleton = () => {
  return (
    <div className="max-w-2xl space-y-8">
      <div className="mb-8">
        <header className="mb-8 flex items-center gap-2">
          <h2 className="text-xl font-semibold">Edit Todo</h2>
        </header>
      </div>

      {/* Title Field */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-[40px]" /> {/* Label */}
        <Skeleton className="h-10 w-full" /> {/* Input */}
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-[80px]" /> {/* Label */}
        <Skeleton className="h-[100px] w-full" /> {/* Textarea */}
      </div>

      {/* Status and Priority Fields */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Status Select */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-[50px]" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Select */}
        </div>

        {/* Priority Select */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-[60px]" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Select */}
        </div>
      </div>

      {/* Due Date Field */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Skeleton className="h-6 w-[70px]" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* DatePicker */}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4 pt-4">
        {/* Back Button */}
        <Skeleton className="h-10 w-[120px]" />

        {/* Action Buttons Group */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[100px]" /> {/* Reset Button */}
          <Skeleton className="h-10 w-[120px]" /> {/* Submit Button */}
        </div>
      </div>
    </div>
  );
};
