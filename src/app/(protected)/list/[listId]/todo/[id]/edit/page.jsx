import { TodoForm } from "@/components";
import { updateTodo } from "@/app/actions/todo";
import { getServerSessionWrapper, getUserTodo } from "@/utils";

export default async function PostsEdit({ params }) {
  const session = await getServerSessionWrapper();

  if (!session) {
    return <section>Please sign in!</section>;
  }

  const { listId, id } = await params;

  const userTodo = await getUserTodo(session.user, id, listId);

  if (!userTodo) {
    return <>Not found!</>;
  }

  const updateAction = updateTodo.bind(null, id, listId);

  return (
    <TodoForm
      formAction={updateAction}
      initialData={{
        title: userTodo?.title ?? "",
        content: userTodo?.content ?? "",
      }}
      listId={listId}
    />
  );
}
