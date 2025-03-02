import { cn } from "@/lib/utils";
import { LuListTodo } from "react-icons/lu";

const Logo = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-2 font-bold text-xl", className)}>
      <span>
        <LuListTodo size={22} />
      </span>
      <span>To-do-list</span>
    </div>
  );
};

export default Logo;
