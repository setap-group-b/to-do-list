import { Todos } from "@/components";
import Link from "next/link";

export default function UserTodos() {
  return (
    <div>
      <Link href="/user/todo/add">Add To-do</Link>
      <Todos />
    </div>
  );
}
