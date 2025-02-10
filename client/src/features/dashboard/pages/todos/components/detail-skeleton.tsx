import { Skeleton } from "@/components/ui/skeleton";

export const TodoDetailSkeleton = () => {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Todo Details</h2>
          <Skeleton className="h-9 w-[100px]" /> {/* Star button */}
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <div className="text-sm font-medium text-neutral-600">Title</div>
            <div className="mt-1">
              <Skeleton className="h-8 w-[200px]" />
            </div>
          </div>


          {/* Status */}
          <div>
            <div className="text-sm font-medium text-neutral-600">Status</div>
            <div className="mt-1">
              <Skeleton className="h-8 w-[100px]" />
            </div>
          </div>

          {/* Priority */}
          <div>
            <div className="text-sm font-medium text-neutral-600">Priority</div>
            <div className="mt-1">
              <Skeleton className="h-8 w-[100px]" />
            </div>
          </div>

          {/* Due Date */}
          <div>
            <div className="text-sm font-medium text-neutral-600">Due Date</div>
            <div className="mt-1">
              <Skeleton className="h-8 w-[120px]" />
            </div>
          </div>

          {/* Completed At */}
          <div>
            <div className="text-sm font-medium text-neutral-600">
              Completed At
            </div>
            <div className="mt-1">
              <Skeleton className="h-8 w-[120px]" />
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="text-sm font-medium text-neutral-600">
              Description
            </div>
            <div className="mt-1">
              <Skeleton className="h-20 w-full" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <Skeleton className="h-10 w-[120px]" /> {/* Back button */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-[100px]" /> {/* Edit button */}
              <Skeleton className="h-10 w-[100px]" /> {/* Delete button */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
