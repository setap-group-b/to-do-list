import { Lists } from "@/components";
import Link from "next/link";

export default function UserLists() {
  return (
    <div>
      <Link href="/user/list/add">Create list</Link>
      <Lists />
    </div>
  );
}
