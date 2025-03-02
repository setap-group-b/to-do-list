import { getServerSessionWrapper, getUserList } from "@/utils";
import { TodoDelete } from "@/components";
import { Todos } from "@/components";
import Link from "next/link";

export default async function UserList({ params }) {
  const session = await getServerSessionWrapper();

  if (!session) {
    return <section>Please sign in!</section>;
  }

  const { listId } = await params;

  const userList = await getUserList(session.user, listId);

  if (!userList) {
    return <>Not found!</>;
  }

  const userTodos = userList.todos;

  if (!userTodos) {
    return (
      <>
        <Link href={`/list/${listId}/todo/add`}>Add To-do</Link>
        <p>Create a To-do to get started!</p>
      </>
    );
  }

  return (
    <>
      <Link href={`/list/${listId}/todo/add`}>Add To-do</Link>
      <Todos />
    </>
  );
}
