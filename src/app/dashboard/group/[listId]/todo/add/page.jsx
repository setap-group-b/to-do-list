import { TodoForm } from "@/components";
import { createTodo } from "@/app/actions/todo";

export default async function UserTodoAdd({ params }) {
  const { listId } = await params;

  const createAction = createTodo.bind(null, listId, "group");

  return (
    <TodoForm
      formAction={createAction}
      initialData={{
        title: "",
        content: "",
        priority: "",
        status: "",
        // deadline: { getDate }
      }}
      listId={listId}
    />
  );
}
