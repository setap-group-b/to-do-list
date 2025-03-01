import { cn } from "@/lib/utils";
import { LuListTodo } from "react-icons/lu";

const Logo = ({ className }) => {
  return (
    <div
      className={cn("flex items-center gap-2, font-bold text-xl", className)}
    >
      <LuListTodo size={22} />
      <p>To-do-list</p>
    </div>
  );
};

export default Logo;
