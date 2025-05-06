import { cn } from "@/lib/utils";
import Link from "next/link";
import { LuListTodo } from "react-icons/lu";

const Logo = ({ className }) => {
  return (
    <Link
      href={"/"}
      className={cn("flex items-center gap-2 font-bold text-xl", className)}
    >
      <span>
        <LuListTodo size={22} />
      </span>
      <span>To-do-list</span>
    </Link>
  );
};

export default Logo;
