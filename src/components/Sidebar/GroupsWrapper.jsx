"use server";

import GroupsList from "./GroupsList";
import { getServerSessionWrapper, getUserGroups } from "@/utils";

const Groups = async () => {
  const session = await getServerSessionWrapper();
  const userGroups = await getUserGroups(session.user);
  return <GroupsList groups={userGroups} />;
};

export default Groups;
