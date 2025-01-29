// External Library Imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

// UI Component Imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/shared/date-picker";

// Type and Schema Imports
import {
  PriorityEnum,
  TodoStatusEnum,
  UpdateTodo,
} from "@server/src/types/todos.types";
import { TodoFormValues, todoSchema } from "../schemas/todo.schema";

// Query/Mutation Imports
import { useCreateTodo } from "../queries/todos.create.queries";
import { useUpdateTodo } from "../queries/todos.update.queries";

// Types and Interfaces
interface TodoFormProps {
  edit?: boolean;
  todo?: UpdateTodo;
}

/**
 * TodoForm Component
 * Handles both creation and editing of todo items
 * @param {TodoFormProps} props - Component props
 */
export const TodoForm = ({ edit, todo }: TodoFormProps) => {
  const router = useRouter();

  // Mutations
  const { mutateAsync: createTodo, isPending: isCreating } = useCreateTodo();
  const { mutateAsync: updateTodo, isPending: isUpdating } = useUpdateTodo(
    todo?.id ?? "",
  );

  // Form initialization
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todo?.title ?? "",
      description: todo?.description ?? "",
      status: todo?.status ?? TodoStatusEnum.Enum.todo,
      priority: todo?.priority ?? PriorityEnum.Enum.low,
      dueDate: todo?.dueDate?.toISOString(),
    },
  });

  /**
   * Handles form submission and navigation
   * @param {TodoFormValues} data - Form data
   */
  const onSubmit = async (data: TodoFormValues): Promise<void> => {
    handleSaveData(data);
    router.navigate({ to: "/dashboard/todos" });
  };

  /**
   * Processes form data and makes API calls
   * @param {TodoFormValues} data - Form data to be saved
   */
  const handleSaveData = async (data: TodoFormValues): Promise<void> => {
    try {
      const formattedData = {
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      };

      if (edit && todo) {
        await updateTodo({ ...formattedData, id: todo.id });
        toast.success("Todo updated successfully");
      } else {
        await createTodo({ ...formattedData, id: uuidv4() });
        toast.success("Todo created successfully");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while saving the todo",
      );
    }
  };

  /**
   * Renders a form field (text input or textarea)
   */
  const renderTextField = (
    name: keyof TodoFormValues,
    label: string,
    placeholder: string,
    isTextarea = false,
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isTextarea ? (
              <Textarea
                placeholder={placeholder}
                className="min-h-[100px]"
                {...field}
              />
            ) : (
              <Input placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  /**
   * Renders a select field
   */
  const renderSelectField = (
    name: "status" | "priority",
    label: string,
    options: string[],
    formatOption?: (option: string) => string,
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {formatOption ? formatOption(option) : option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        aria-label={`${edit ? "Edit" : "Create"} Todo Form`}
      >
        {renderTextField("title", "Title", "Enter todo title")}
        {renderTextField(
          "description",
          "Description",
          "Enter todo description",
          true,
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {renderSelectField(
            "status",
            "Status",
            TodoStatusEnum.options,
            (status) =>
              status
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
          )}
          {renderSelectField(
            "priority",
            "Priority",
            PriorityEnum.options,
            (priority) => priority.charAt(0).toUpperCase() + priority.slice(1),
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value ? new Date(field.value) : undefined}
                    setDate={(date) => {
                      if (date) {
                        field.onChange(date.toISOString());
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.navigate({ to: "/dashboard/todos" })}
            aria-label="Back to todo list"
          >
            <ArrowLeft className="h-4 w-4" />
            Back To List
          </Button>

          <div className="flex items-center gap-2">
            {form.formState.isDirty && (
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                aria-label="Reset form"
              >
                <X className="h-4 w-4" />
                Reset
              </Button>
            )}
            <Button
              type="submit"
              disabled={isCreating || isUpdating}
              className="bg-neutral-950 text-white hover:bg-neutral-800"
              aria-label={edit ? "Update todo" : "Create todo"}
            >
              {(isCreating || isUpdating) && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              <Save className="h-4 w-4" />
              {edit ? "Update Todo" : "Add Todo"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
