// External library imports
import { Plus } from "lucide-react";

// Internal component imports
import { TodoForm } from "./components/todo-form";

/**
 * TodoNewPage Component
 * Renders a page for creating new todo items with a header and form
 */
const TodoNewPage = () => {
  return (
    <main className="max-w-2xl" role="main">
      <section className="mb-8">
        <header className="mb-8 flex items-center gap-2">
          <Plus className="size-6" aria-hidden="true" />
          <h1 className="text-xl font-semibold text-neutral-950">
            Add New Todo
          </h1>
        </header>
        <TodoForm edit={false} />
      </section>
    </main>
  );
};

export default TodoNewPage;
