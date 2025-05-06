"use server";

import GroupsList from "./GroupsList";
import { getServerSessionWrapper, getUserGroups } from "@/utils";

const Groups = async () => {
  const session = await getServerSessionWrapper();

  const getCachedUserGroups = async () => {
    "use cache";
    const groups = await getUserGroups(session?.user);
    return groups;
  };

  const userGroups = await getCachedUserGroups();
  return <GroupsList groups={userGroups} />;
};

export default Groups;
