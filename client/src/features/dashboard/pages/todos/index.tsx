// External library imports
import { Link } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";

// Internal component imports
import { Button } from "@/components/ui/button";
import TodoList from "./components/todo-list";

/**
 * TodosPage Component
 * Renders the main todos page with action buttons and todo list
 */
const TodosPage = () => {
  return (
    <main className="flex flex-col gap-6">
      {/* Action Section - Contains todo creation controls */}
      <section className="flex items-center">
        <Link to="/dashboard/todos/new" aria-label="Create new todo">
          <Button
            className="flex items-center gap-2 bg-neutral-950 text-white hover:bg-neutral-800"
            aria-label="Add new todo item"
          >
            <PlusCircle className="h-4 w-4" aria-hidden="true" />
            <span>Add Todo</span>
          </Button>
        </Link>
      </section>

      {/* Todo List Section - Displays all todos */}
      <section className="w-full">
        <TodoList />
      </section>
    </main>
  );
};

export default TodosPage;
