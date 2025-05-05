"use client";

import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";

const ListItems = ({ userLists, searchValue }) => {
  userLists = userLists.filter((list) => list.title.includes(searchValue));

  return userLists.slice(0, 5).map((list, idx) => {
    return (
      <Link href={`/dashboard/list/${list.id}/todo`} key={idx}>
        <SidebarMenuItem key={idx}>
          <SidebarMenuButton
            size="l"
            className="flex items-center gap-4 w-full capitalize *:text-nowrap justify-between"
          >
            <div className="flex items-center gap-4">
              <div
                className="size-4 rounded-sm"
                style={{
                  backgroundColor: list.backgroundColour,
                }}
              ></div>
              <p>{list.title}</p>
            </div>

            <span className="bg-accent p-2 rounded-sm size-6 flex items-center justify-center">
              {list?.Todo?.length || 0}
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </Link>
    );
  });
};

export default ListItems;
