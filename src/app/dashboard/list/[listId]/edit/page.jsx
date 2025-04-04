import { ListForm } from "@/components";
import { updateList } from "@/app/actions/list";
import { getServerSessionWrapper, getUserList } from "@/utils";

export default async function PostsEdit({ params }) {
  const session = await getServerSessionWrapper();

  if (!session) {
    return <section>Please sign in!</section>;
  }

  const { listId } = await params;

  const userList = await getUserList(session.user, listId);

  if (!userList) {
    return <>Not found!</>;
  }

  const updateAction = updateList.bind(null, listId);

  return (
    <ListForm
      formAction={updateAction}
      initialData={{
        title: userList.title,
        backgroundColour: userList.backgroundColour,
      }}
    />
  );
}
