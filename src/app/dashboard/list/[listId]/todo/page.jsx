import { getServerSessionWrapper, getUserList } from "@/utils";
import { Todos, ListDelete } from "@/components";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

export default async function UserList({ params }) {
  const session = await getServerSessionWrapper();

  if (!session) {
    return <section>Please sign in!</section>;
  }

  const { listId } = await params;

  const userList = await getUserList(session.user, listId);

  if (!userList) {
    return <section>Not found!</section>;
  }

  return (
    <div
      style={{
        backgroundColor: userList.backgroundColour,
      }}
      className="flex flex-col h-full gap-6 p-4 md:p-6"
    >
      <div className="flex gap-4 justify-between">
        <PageHeader title={`List Tasks`} />
        <div>
          <Button>
            <Link href={`/dashboard/list/${listId}/edit`}>Edit List</Link>
          </Button>
          <Button>
            <Link href={`/dashboard/list/${listId}/todo/add`}>Add Tasks</Link>
          </Button>
        </div>
      </div>
      <Todos listId={listId} />
      <ListDelete listId={listId} />
    </div>
  );
}
