import Link from "next/link";
import { Todos } from "@/components";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ListDelete } from "@/components/ListDelete";
import { getServerSessionWrapper, getUserGroup, getUserList } from "@/utils";

export default async function UserList({ params }) {
  const session = await getServerSessionWrapper();

  if (!session) {
    return <section>Please sign in!</section>;
  }

  const { listId } = await params;

  const userGroup = await getUserGroup(session.user, listId);

  if (!userGroup) {
    return <section>Not found!</section>;
  }

  return (
    <div className="flex flex-col h-full gap-6 p-4 md:p-6 list">
      <div className="flex gap-4 justify-between">
        <PageHeader title={`${userGroup.title} group tasks`} />
        <div className="flex items-center gap-4">
          <Button>
            <Link href={`/dashboard/group/${listId}/todo/add`}>Add Task</Link>
          </Button>
        </div>
      </div>

      <Todos type="group" listId={listId} />
    </div>
  );
}
