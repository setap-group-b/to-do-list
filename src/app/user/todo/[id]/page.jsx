import { getServerSessionWrapper, getUserTodo } from "@/utils";

export default async function UserTodo({ params }) {
  const session = await getServerSessionWrapper();

  if (!session) {
    return <section>Please sign in!</section>;
  }

  const { id } = await params;

  const userTodo = await getUserTodo(session.user, id);

  if (!userTodo) {
    return <>Not found!</>;
  }

  return (
    <>
      <h1>{userTodo.title}</h1>
      <p>{userTodo.content}</p>
    </>
  );
}
