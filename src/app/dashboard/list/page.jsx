import { Lists } from "@/components";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UserLists() {
  return (
    <div className="flex flex-col gap-8 h-full !overflow-hidden">
      <div className="flex items-center gap-4 justify-between">
        <PageHeader title={"Owned Lists"} />
        <Button>
          <Link className="p-5" href="/dashboard/list/add">
            Create list
          </Link>
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Lists />
      </div>
    </div>
  );
}
