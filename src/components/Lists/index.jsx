import { List } from "@/components/List";
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

  return (
    <>
      {userLists.map((list) => (
        <div key={list.id}>
          <List list={list} />
        </div>
      ))}
    </>
  );
};
