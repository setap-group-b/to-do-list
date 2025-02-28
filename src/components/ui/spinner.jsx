import { cn } from "@/utils/utils";
import { ImSpinner2 } from "react-icons/im";

const Spinner = ({ className, containerStyle, size, ...props }) => {
  return (
    <div
      className={cn(
        "flex-1 w-full h-full, flex items-center justify-center",
        className
      )}
      style={containerStyle}
    >
      <ImSpinner2 {...props} size={size || "lg"} className="animate-spin" />
    </div>
  );
};

export default Spinner;
