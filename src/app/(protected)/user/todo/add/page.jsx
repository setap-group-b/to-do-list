import { TodoForm } from "@/components";
import { createTodo } from "@/app/actions/todo";

export default function UserTodoAdd() {
  return (
    <TodoForm
      formAction={createTodo}
      initialData={{ title: "", content: "" }}
    />
  );
}
