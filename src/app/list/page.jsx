import { Lists } from "@/components";
import Link from "next/link";

export default function UserLists() {
  return (
    <div>
      <Link href="/list/add">Create list</Link>
      <Lists />
    </div>
  );
}
