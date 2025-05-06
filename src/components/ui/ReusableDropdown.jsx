import React from "react";
import { cn } from "@/lib/utils";
import { modifyOptions } from "@/utils/functions";
import { FormLabel } from "./form";
import SelectBox from "./select-box";

const ReusableDropdown = ({
  placeholder,
  value,
  loading,
  defaultValue,
  onChange,
  name,
  label,
  required,
  autoModifyOptions = true,
  disabled,
  children,
  useFormLabel,
  options = [],
  containerClassName,
  inputClassName,
  ...props
}) => {
  const dropdownOptions = autoModifyOptions ? modifyOptions(options) : options;

  return (
    <div className={cn("space-y-2 w-full", containerClassName)}>
      {label &&
        (useFormLabel ? (
          <FormLabel htmlFor={props?.id || name}>
            {label}
            {required ? "*" : ""}
          </FormLabel>
        ) : (
          <label htmlFor={props?.id || name}>
            {label}
            {required ? "*" : ""}
          </label>
        ))}
      <SelectBox
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        isLoading={loading}
        className={cn(inputClassName)}
        options={Array.from(new Set(dropdownOptions))}
      />
      {children}
    </div>
  );
};

export default ReusableDropdown;
