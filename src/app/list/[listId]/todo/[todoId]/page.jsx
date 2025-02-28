import { getServerSessionWrapper, getUserTodo } from "@/utils";
import { TodoDelete } from "@/components";
import Link from "next/link";

export default async function UserTodo({ params }) {
  const session = await getServerSessionWrapper();

  if (!session) {
    return <section>Please sign in!</section>;
  }

  const { listId, todoId } = await params;

  const userTodo = await getUserTodo(session.user, todoId);

  if (!userTodo) {
    return <>Not found!</>;
  }

  return (
    <>
      <h1>{userTodo.title}</h1>
      <p>{userTodo.content}</p>
      <Link href={`/list/${listId}/todo/${todoId}/edit`}>Edit</Link>
      <TodoDelete id={todoId} />
    </>
  );
}
