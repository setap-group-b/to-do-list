import { getServerSessionWrapper } from "@/utils";
import { Todos } from "@/components";
import Link from "next/link";

export default async function UserList({ params }) {
  const session = await getServerSessionWrapper();

  if (!session) {
    return <section>Please sign in!</section>;
  }

  const { listId } = await params;

  return (
    <>
      <Link href={`/user/list/${listId}/todo/add`}>Add To-do</Link>
      <Todos listId={listId} />
    </>
  );
}
