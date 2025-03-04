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
import toast from "react-hot-toast";
import { LogOutIcon } from "lucide-react";
import UserAvatar from "../UserAvatar";

const SettingsDropdown = () => {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut();
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
      <Command className="w-44">
        <CommandItem className="flex flex-col space-y-1 p-3 items-start hover:!bg-transparent data-[selected=true]:bg-transparent">
          <p className="font-medium  capitalize">
            {session?.user?.name.split(" ").slice(0, 2).join(" ")}
          </p>
          <p className="]">{session?.user?.email}</p>
        </CommandItem>

        <CommandSeparator />
        <CommandList className="hover:!bg-transparent">
          <CommandGroup>
            <CommandItem
            //   onSelect={() => navigate("/settings?tab=profile")}
            >
              Profile
            </CommandItem>
            <CommandItem
            //   onSelect={() => navigate("/settings?tab=security")}
            >
              Security
            </CommandItem>
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
