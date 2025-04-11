"use server";

import { getServerSessionWrapper, getUserLists } from "@/utils";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";

const ListItems = async () => {
  const session = await getServerSessionWrapper();
  const userLists = await getUserLists(session.user);
  return userLists.slice(0, 5).map((list, idx) => {
    return (
      <SidebarMenuItem key={idx}>
        <SidebarMenuButton
          size="l"
          className={"p-2 flex items-center gap-4 justify-between"}
          style={{
            backgroundColor: list.backgroundColour,
          }}
        >
          <Link
            href={`/dashboard/list/${list.id}/todo`}
            className="flex items-center gap-4 w-full capitalize"
          >
            <span className="text-lg">✅</span>
            <span>{list.title}</span>
          </Link>
          <span className="bg-accent p-2 rounded-sm h-5 w-6 flex items-center justify-center">
            {list?.Todo?.length || 0}
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  });
};

export default ListItems;
