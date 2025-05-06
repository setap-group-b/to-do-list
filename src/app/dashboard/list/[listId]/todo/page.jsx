import Link from "next/link";
import { Todos } from "@/components";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ListDelete } from "@/components/ListDelete";
import { getServerSessionWrapper, getUserList } from "@/utils";

import AddCollaborators from "@/components/AddCollaborators";

export default async function UserList({ params }) {
  const session = await getServerSessionWrapper();

  if (!session) {
    return <section>Please sign in!</section>;
  }

  const { listId } = await params;

  const getCachedUserList = async () => {
    "use cache";
    const todo = await getUserList(session.user, listId);
    return todo;
  };

  const userList = await getCachedUserList();

  if (!userList) {
    return <section>Not found!</section>;
  }

  const collaborators = userList.collaborators.map((user) => user.email);
  return (
    <div className="flex flex-col h-full gap-6 p-4 md:p-6 list">
      <div className="flex gap-4 justify-between flex-wrap">
        <PageHeader title={`${userList.title} List tasks`} />
        <div className="flex items-center gap-4 flex-wrap w-full md:w-max *:flex-1 md:*:flex-none">
          <Button className={"cursor-pointer"}>
            <Link href={`/dashboard/list/${listId}/todo/add`}>Add Task</Link>
          </Button>
          <AddCollaborators
            user={session.user}
            listId={listId}
            listCollaborators={collaborators}
          />
          <Button className={"cursor-pointer"}>
            <Link href={`/dashboard/list/${listId}/edit`}>Edit List</Link>
          </Button>
          <ListDelete listId={listId} className={"w-full sm:w-max"} />
        </div>
      </div>

      <Todos listId={listId} />
    </div>
  );
}
