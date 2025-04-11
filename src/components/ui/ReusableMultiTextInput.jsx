import { CSSProperties } from "react";
import { MultiTextInput } from "./multi-text-input";
import { cn } from "@/lib/utils";
import { FormLabel } from "./form";

const ReusableMultiTextInput = ({
  changeValue,
  containerStyle,
  value = [],
  placeholder,
  badgeClassName,
  containerClassName,
  inputClassName,
  useFormLabel,
  label,
}) => {
  return (
    <div
      className={cn("flex flex-col gap-2", containerClassName)}
      style={{ ...containerStyle }}
    >
      {label &&
        (useFormLabel ? (
          <FormLabel className="font-medium capitalize text-base">
            {label}
          </FormLabel>
        ) : (
          <label htmlFor="" className="font-medium capitalize text-base">
            {label}
          </label>
        ))}
      <MultiTextInput
        badgeClassName={badgeClassName}
        className={cn(inputClassName)}
        // className={`${inputClassName} ${styles.multi_text_input} max-h-[2rem]`}
        onValueChange={(newValue) => changeValue(newValue)}
        placeholder={placeholder || "Type something and press enter..."}
        value={value}
      />
    </div>
  );
};

export default ReusableMultiTextInput;
