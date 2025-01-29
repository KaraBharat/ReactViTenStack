// External library imports
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Eye,
  Highlighter,
  MoreHorizontal,
  Pencil,
  Star,
  Trash,
} from "lucide-react";

// Internal component imports
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Hooks and utilities
import { useConfirm } from "@/hooks/use-confirm";
import { cn } from "@/lib/utils";

import {
  useToggleTodoStarred,
  useToggleTodoStatus,
} from "../queries/todos.update.queries";
import { useDeleteTodo } from "../queries/todos.delete.queries";
import { TodoStatus, TodoStatusEnum } from "@server/src/types/todos.types";

interface TodoActionsProps {
  id: string;
  isStarred?: boolean;
  status?: TodoStatus;
  optimisticOperation?: "create" | "update" | "delete";
}

const STATUS_OPTIONS = [
  { value: TodoStatusEnum.Enum.todo, label: "Mark as Todo" },
  { value: TodoStatusEnum.Enum.in_progress, label: "Mark as In Progress" },
  { value: TodoStatusEnum.Enum.completed, label: "Mark as Completed" },
  { value: TodoStatusEnum.Enum.archived, label: "Mark as Archived" },
] as const;

export const TodoActions = ({
  id,
  isStarred,
  status,
  optimisticOperation,
}: TodoActionsProps) => {
  const router = useRouter();
  const deleteTodo = useDeleteTodo();
  const toggleStarred = useToggleTodoStarred(id);
  const toggleStatus = useToggleTodoStatus(id);

  const [ConfirmationDialog, confirm] = useConfirm({
    title: "Delete Todo",
    message:
      "Are you sure you want to delete this todo? This action cannot be undone.",
  });

  const handleView = () => {
    router.navigate({
      to: "/dashboard/todos/detail/$id",
      params: { id },
    });
  };

  const handleEdit = () => {
    router.navigate({
      to: "/dashboard/todos/edit/$id",
      params: { id },
    });
  };

  const handleDelete = async () => {
    if (optimisticOperation === "delete") {
      toast.success("Todo deleted successfully");
      return;
    }

    try {
      const confirmed = await confirm();
      if (!confirmed) return;

      await deleteTodo.mutateAsync(id);
      toast.success("Todo deleted successfully");
    } catch (error) {
      console.error("Delete todo error:", error);
      toast.error("Failed to delete todo");
    }
  };

  const handleToggleStarred = async () => {
    try {
      await toggleStarred.mutateAsync(id);
      toast.success(`Todo ${isStarred ? "unstarred" : "starred"} successfully`);
    } catch (error) {
      console.error("Toggle starred error:", error);
      toast.error("Failed to update todo");
    }
  };

  const handleStatusChange = async (newStatus: TodoStatus) => {
    try {
      await toggleStatus.mutateAsync({ id, status: newStatus });
      toast.success("Todo status updated successfully");
    } catch (error) {
      console.error("Toggle status error:", error);
      toast.error("Failed to update todo status");
    }
  };

  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label="Todo actions"
    >
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Current status: ${status}`}
            >
              <Highlighter className="size-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {STATUS_OPTIONS.map(({ value, label }) => (
              <DropdownMenuItem
                key={value}
                disabled={toggleStatus.isPending}
                onClick={() => handleStatusChange(value)}
              >
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleStarred}
              aria-label={`${isStarred ? "Remove from" : "Mark as"} important`}
              aria-pressed={isStarred}
            >
              <Star
                className={cn(
                  "size-4",
                  isStarred && "fill-orange-500 text-orange-500",
                )}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mark as important</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="size-8 p-0"
            aria-label="More actions"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            disabled={deleteTodo.isPending}
            onClick={handleView}
          >
            <Eye className="size-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteTodo.isPending}
            onClick={handleEdit}
          >
            <Pencil className="size-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteTodo.isPending}
            onClick={handleDelete}
            className={cn(
              "text-destructive",
              optimisticOperation === "delete" &&
                "pointer-events-none opacity-50",
            )}
          >
            <Trash className="size-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmationDialog />
    </div>
  );
};
