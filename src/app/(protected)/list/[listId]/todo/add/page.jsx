import { TodoForm } from "@/components";
import { createTodo } from "@/app/actions/todo";

export default async function UserTodoAdd({ params }) {
  const { listId } = await params;

  const createAction = createTodo.bind(null, listId);

  return (
    <TodoForm
      formAction={createAction}
      initialData={{
        backgroundColour: "",
        title: "",
        state: "",
        priority: "",
        content: "",
        deadline: { getDates },
      }}
      listId={listId}
    />
  );
}
