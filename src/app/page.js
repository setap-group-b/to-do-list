import { Posts } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/create">Create</Link>
      <Posts />
    </div>
  );
}
