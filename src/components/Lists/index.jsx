import List from "@/components/List";
import { getServerSessionWrapper, getUserLists } from "@/utils";

export const Lists = async () => {
  const session = await getServerSessionWrapper();

  if (!session) {
    return <section>Please sign in to see your lists!</section>;
  }

  const userLists = await getUserLists(session.user);

  if (!userLists) {
    return <>Create a list to get started!</>;
  }

  return userLists?.length ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {userLists.map((list) => (
        <List key={list.id} list={list} />
      ))}
    </div>
  ) : (
    <div className="flex-1 h-full flex items-center justify-center">
      {" "}
      No Lists yet
    </div>
  );
};
