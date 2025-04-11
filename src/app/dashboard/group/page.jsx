import Link from "next/link";
import Groups from "@/components/Groups";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

export default function UserGroups() {
  return (
    <div className="flex flex-col gap-8 h-full !overflow-hidden">
      <div className="flex items-center gap-4 justify-between">
        <PageHeader title={"Groups"} />
        <Button>
          <Link className="p-5" href="/dashboard/group/create">
            Create Group
          </Link>
        </Button>
      </div>
      <div className="flexx flex-col gap-4 flex-1 overflow-y-auto">
        <div></div>
        <Groups />
      </div>
    </div>
  );
}
