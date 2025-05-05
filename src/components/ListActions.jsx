"use client";

import ReusablePopover from "@/components/ui/ReusablePopover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import Link from "next/link";
import { ListDelete } from "./ListDelete";

const ListActions = ({ listId }) => {
  return (
    <ReusablePopover
      actionsContainerClassName="rounded-lg"
      trigger={
        <Button className="!bg-transparent shadow-none w-max p-0">
          More ...
          {/* <UserAvatar image={session?.user.image} name={session?.user.name} /> */}
        </Button>
      }
    >
      <Command className="w-max min-w-44">
        <CommandItem className={"p-3"}>
          <Link href={`/dashboard/list/${listId}/edit`}>Edit List</Link>
        </CommandItem>
        <CommandItem>
          <ListDelete listId={listId} />
        </CommandItem>
      </Command>
    </ReusablePopover>
  );
};

export default ListActions;
