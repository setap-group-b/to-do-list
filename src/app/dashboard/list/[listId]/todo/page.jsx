import { getServerSessionWrapper } from "@/utils";
import { Todos } from "@/components";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

export default async function UserList({ params }) {
  const session = await getServerSessionWrapper();

  if (!session) {
    return <section>Please sign in!</section>;
  }

  const { listId } = await params;

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex gap-4 justify-between">
        <PageHeader title={`List Tasks`} />
        <Button>
          <Link href={`/dashboard/list/${listId}/todo/add`}>Add Tasks</Link>
        </Button>
      </div>
      <div className="flex-1 flex flex-col">
        <Todos listId={listId} />
      </div>
    </div>
  );
}
