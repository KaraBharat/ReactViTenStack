// Internal imports
import { TodoForm } from "./components/todo-form";
import { useTodo } from "./queries/todos.get.queries";
import { TodoFormSkeleton } from "./components/form-skeleton";

interface TodoEditPageProps {
  todoId: string;
}

/**
 * TodoEditPage Component
 * Handles the editing of an existing todo item
 *
 * @param {string} todoId - The unique identifier of the todo item
 */
const TodoEditPage = ({ todoId }: TodoEditPageProps) => {
  const { data: todo, isLoading } = useTodo(todoId);

  // Loading state handler
  if (isLoading) return <TodoFormSkeleton />;

  // Error state handler
  if (!todo) {
    return (
      <p className="text-base font-semibold text-red-500" role="alert">
        Todo not found
      </p>
    );
  }

  // Transform dates from string to Date objects
  const transformedTodo = {
    ...todo.data,
    dueDate: todo.data.dueDate ? new Date(todo.data.dueDate) : undefined,
    completedAt: todo.data.completedAt
      ? new Date(todo.data.completedAt)
      : undefined,
  };

  return (
    <section className="max-w-2xl">
      <div className="mb-8">
        <header className="mb-8 flex items-center gap-2">
          <h2 className="text-xl font-semibold">Edit Todo</h2>
        </header>
        <TodoForm edit={true} todo={transformedTodo} />
      </div>
    </section>
  );
};

export default TodoEditPage;
