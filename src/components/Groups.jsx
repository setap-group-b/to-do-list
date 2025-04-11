import { getServerSessionWrapper, getUserGroups } from "@/utils";
import Group from "./Group";

const Groups = async () => {
  const session = await getServerSessionWrapper();

  if (!session) {
    return <section>Please sign in to see your groups!</section>;
  }

  const userGroups = await getUserGroups(session.user);

  if (!userGroups) {
    return <>Create a group to get started!</>;
  }

  return userGroups?.length ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {userGroups.map((group) => (
        <Group key={group.id} group={group} />
      ))}
    </div>
  ) : (
    <div className="flex-1 h-full flex items-center justify-center">
      {" "}
      No Groups yet
    </div>
  );
};

export default Groups;
