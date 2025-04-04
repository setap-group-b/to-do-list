import { TodoForm } from "@/components";
import { createTodo } from "@/app/actions/todo";

const getDate = () => {
  const date = new Date();

  // Values that could be used later in deadline setting  (mins rounded to the nearest ten)
  const hour = date.getHours();
  const minute = Math.round(date.getMinutes() / 10) * 10;

  return date;
};

export default async function UserTodoAdd({ params }) {
  const { listId } = await params;

  const createAction = createTodo.bind(null, listId);

  return (
    <TodoForm
      formAction={createAction}
      initialData={{
        title: "",
        content: "",
        priority: "Set Priority Here",
        status: "",
        // deadline: { getDate }
      }}
      listId={listId}
    />
  );
}
