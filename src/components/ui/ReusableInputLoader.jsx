import Spinner from "./spinner";
import { cn } from "@/utils/utils";

const ReusableInputLoader = ({ className, spinnerClassName }) => {
  return (
    <div
      className={cn(
        "flex justify-between w-full max-h-full items-center py-3",
        className
      )}
    >
      <p className="text-pc1/20 !m-0">Loading...</p>
      <Spinner className={cn("!justify-end ", spinnerClassName)} size={"sm"} />
    </div>
  );
};

export default ReusableInputLoader;
