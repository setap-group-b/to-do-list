import Link from "next/link";
import { Todos } from "@/components";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ListDelete } from "@/components/ListDelete";
import { getServerSessionWrapper, getUserList } from "@/utils";

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
      className="flex flex-col h-full gap-6 p-4 md:p-6 list"
    >
      <div className="flex gap-4 justify-between">
        <PageHeader title={`${userList.title} List tasks`} />
        <div className="flex items-center gap-4">
          <Button>
            <Link href={`/dashboard/list/${listId}/edit`}>Edit List</Link>
          </Button>
          <Button>
            <Link href={`/dashboard/list/${listId}/todo/add`}>Add Task</Link>
          </Button>
          <ListDelete />
        </div>
      </div>

      <Todos listId={listId} />
    </div>
  );
}
