import { getServerSessionWrapper, getUserList } from "@/utils";
import { TodoDelete } from "@/components";
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
        <Link href={`/user/list/${listId}/todo/add`}>Add To-do</Link>
        Create a To-do to get started!
      </>
    );
  }

  return (
    <>
      <Link href={`/user/list/${listId}/todo/add`}>Add To-do</Link>
    </>
  );
}
