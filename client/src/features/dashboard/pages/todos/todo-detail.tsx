// External library imports
import { ArrowLeft, Loader2, Pencil, Star, Trash } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { format } from "date-fns";

// Internal component imports
import { Button } from "@/components/ui/button";

// Hooks and utilities
import { cn } from "@/lib/utils";
import { useConfirm } from "@/hooks/use-confirm";
import { useTodo } from "./queries/todos.get.queries";
import { useToggleTodoStarred } from "./queries/todos.update.queries";
import { useDeleteTodo } from "./queries/todos.delete.queries";
import { toast } from "sonner";
import { Priority } from "./components/priority";
import { Status } from "./components/status";

// Constants
const DATE_FORMAT = "MMM d, yyyy";

interface TodoDetailPageProps {
  todoId: string;
}

// Component sections for better organization
const LoadingSpinner = () => (
  <div className="flex h-[400px] items-center justify-center" role="status">
    <Loader2 className="h-8 w-8 animate-spin text-neutral-600" />
    <span className="sr-only">Loading todo details...</span>
  </div>
);

const DetailField = ({
  label,
  value,
  children,
}: {
  label: string;
  value?: string | null;
  children?: React.ReactNode;
}) => (
  <div>
    <label className="text-sm font-medium text-neutral-600">{label}</label>
    <div className="mt-1">{children || <p>{value || "-"}</p>}</div>
  </div>
);

const TodoDetailPage = ({ todoId }: TodoDetailPageProps) => {
  const router = useRouter();
  const { data: todo, isLoading } = useTodo(todoId);
  const { mutateAsync: deleteTodo } = useDeleteTodo();
  const toggleStarred = useToggleTodoStarred(todoId);

  const [ConfirmationDialog, confirm] = useConfirm({
    title: "Delete Todo",
    message:
      "Are you sure you want to delete this todo? This action cannot be undone.",
  });

  const handleDelete = async () => {
    try {
      const confirmed = await confirm();
      if (!confirmed) return;

      await deleteTodo(todoId);
      router.navigate({ to: "/dashboard/todos" });
      toast.success("Todo deleted successfully");
    } catch (error) {
      console.error("Delete todo error:", error);
      toast.error("Failed to delete todo");
    }
  };

  const handleToggleStarred = async () => {
    try {
      await toggleStarred.mutateAsync(todoId);
      toast.success(
        `Todo ${todo?.data?.isStarred ? "unstarred" : "starred"} successfully`,
      );
    } catch (error) {
      console.error("Toggle todo starred error:", error);
      toast.error("Failed to update todo starred status");
    }
  };

  const handleEdit = () => {
    router.navigate({
      to: "/dashboard/todos/edit/$id",
      params: { id: todoId },
    });
  };

  if (isLoading) return <LoadingSpinner />;

  const todoData = todo?.data;

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Todo Details</h2>
          <Button
            variant={todoData?.isStarred ? "default" : "outline"}
            className={cn(
              todoData?.isStarred && "bg-orange-500 hover:bg-orange-600",
            )}
            size="sm"
            onClick={handleToggleStarred}
            aria-label={todoData?.isStarred ? "Unstar todo" : "Star todo"}
          >
            <Star
              className={cn(
                "size-4",
                todoData?.isStarred && "fill-white text-white",
              )}
            />
            {todoData?.isStarred ? "Starred" : "Star"}
          </Button>
        </div>

        <div className="space-y-6">
          <DetailField label="Title" value={todoData?.title} />
          <DetailField label="Status">
            <Status status={todoData?.status!} size="sm" />
          </DetailField>
          <DetailField label="Priority">
            <Priority priority={todoData?.priority!} size="sm" />
          </DetailField>
          <DetailField
            label="Due Date"
            value={
              todoData?.dueDate
                ? format(new Date(todoData.dueDate), DATE_FORMAT)
                : undefined
            }
          />
          <DetailField
            label="Completed At"
            value={
              todoData?.completedAt
                ? format(new Date(todoData.completedAt), DATE_FORMAT)
                : undefined
            }
          />
          <DetailField label="Description" value={todoData?.description} />

          <div className="mt-8 flex items-center justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.navigate({ to: "/dashboard/todos" })}
              aria-label="Back to todos list"
            >
              <ArrowLeft className="h-4 w-4" />
              Back To List
            </Button>
            <div className="flex items-center gap-2">
              <Button
                className="bg-neutral-950 text-white hover:bg-neutral-800"
                onClick={handleEdit}
                aria-label="Edit todo"
              >
                <Pencil className="size-4" />
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                aria-label="Delete todo"
              >
                <Trash className="size-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationDialog />
    </div>
  );
};

export default TodoDetailPage;
