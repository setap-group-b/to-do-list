import { TodoForm } from "@/components";
import { updateTodo } from "@/app/actions/todo";
import { getServerSessionWrapper, getUserTodo } from "@/utils";

export default async function PostsEdit({ params }) {
  const session = await getServerSessionWrapper();

  if (!session) {
    return <section>Please sign in!</section>;
  }

  const { listId, id } = await params;

  const getCachedUserTodo = async () => {
    "use cache";
    const todo = await getUserTodo(session.user, id, listId);
    return todo;
  };

  const userTodo = await getCachedUserTodo();

  if (!userTodo) {
    return <>Not found!</>;
  }

  const updateAction = updateTodo.bind(null, id, listId, "list");

  return (
    <TodoForm
      formAction={updateAction}
      initialData={{
        title: userTodo?.title ?? "",
        status: userTodo?.status ?? "",
        content: userTodo?.content ?? "",
        priority: userTodo?.priority ?? "",
        deadline: userTodo?.deadline ?? "",
        notification: userTodo?.notification ?? "",
      }}
      listId={listId}
    />
  );
}
