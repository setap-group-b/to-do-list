import { Todos } from "@/components";
import Link from "next/link";

export default async function UserTodos({ params }) {
  const { listId } = await params;

  return (
    <div>
      <Link href={`/list/${listId}/todo/add`}>Add To-do</Link>
      <Todos />
    </div>
  );
}
