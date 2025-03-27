"use client"; // Ensure this is a client component

import { Button } from "@/components/ui/button";
import ReusablePopover from "@/components/ui/ReusablePopover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Ensure the correct import
import { LogOutIcon, SettingsIcon } from "lucide-react";
import UserAvatar from "../UserAvatar";

const SettingsDropdown = () => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    signOut();
  };

  const navigateToSettings = () => {
    if (mounted) {
      router.push("/dashboard/settings");
    }
  };

  return (
    <ReusablePopover
      actionsContainerClassName="rounded-lg"
      trigger={
        <Button className="!bg-transparent shadow-none w-max p-0">
          <UserAvatar image={session?.user.image} name={session?.user.name} />
        </Button>
      }
    >
      <Command className="w-max min-w-44">
        <CommandItem className="flex flex-col space-y-1 p-3 items-start hover:!bg-transparent data-[selected=true]:bg-transparent max-w-max">
          <p className="font-medium capitalize">
            {session?.user?.name.split(" ").slice(0, 2).join(" ")}
          </p>
          <p>{session?.user?.email}</p>
        </CommandItem>

        <CommandSeparator />
        <CommandList className="hover:!bg-transparent">
          <CommandGroup>
            <CommandItem onSelect={navigateToSettings}>
              <SettingsIcon size={"1.1rem"} className="mr-2" />
              Settings
            </CommandItem>
            <CommandItem>Profile</CommandItem>
            <CommandItem>Security</CommandItem>
          </CommandGroup>
          <CommandGroup>
            <CommandItem
              className="flex items-center justify-between"
              onSelect={handleLogout}
            >
              <p>Log out</p>
              <LogOutIcon size={"1.1rem"} />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </ReusablePopover>
  );
};

export default SettingsDropdown;
