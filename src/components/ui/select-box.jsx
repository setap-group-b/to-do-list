import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import * as React from "react";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea } from "./scroll-area";
import { PiCaretDown } from "react-icons/pi";
import ReusableInputLoader from "./ReusableInputLoader";
import { ChevronDown } from "lucide-react";
import { Badge } from "./badge";
import { capitalizeString } from "@/utils/functions";

const SelectBox = (
  {
    inputBoxClassName,
    inputPlaceholder,
    emptyPlaceholder,
    selectAllOption,
    placeholder,
    disabled,
    className,
    options,
    value,
    selectOnePerGroup,
    defaultValue,
    isLoading,
    onChange,
    onError,
    multiple,
    ...props
  },
  ref
) => {
  // const prevValue = React.useRef(value);
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [expandedGroups, setExpandedGroups] = React.useState([]);

  const flattenedOptions = (options || []).flatMap((option) =>
    "options" in option ? option.options : option
  );

  React.useEffect(() => {
    if (
      multiple &&
      options.some((option) => "options" in option) &&
      selectOnePerGroup
    ) {
      const groupOptions = options.filter((option) => "options" in option);
      if (
        !groupOptions.every((group) =>
          group.options.some((option) => value?.includes(option.value))
        )
      ) {
        const unselectedGroups = groupOptions
          .filter(
            (group) =>
              !group.options.some((option) => value?.includes(option.value))
          )
          .map((group) => group.label);
        onError?.(
          `Select at least one option under each of these: ${unselectedGroups.join(
            ", "
          )}`
        );
      }
    }

    // Handling Edge case, if value not in options
    // const optionValues = flattenedOptions.map((opt) => opt.value);
    // const selectedValue = defaultValue && !value ? defaultValue : value;
    // if (
    //   typeof selectedValue === "string" &&
    //   selectedValue !== prevValue.current
    // ) {
    //   prevValue.current = value;
    //   if (!optionValues.includes(selectedValue)) {
    //     onChange?.("");
    //   }
    // } else if (
    //   Array.isArray(selectedValue) &&
    //   !selectedValue.every((val) => prevValue.current?.includes(val))
    // ) {
    //   prevValue.current = value;
    //   const valuesInOptions = selectedValue.filter((val) =>
    //     optionValues.includes(val)
    //   );
    //   onChange?.(valuesInOptions);
    // }
  }, [value]);

  const toggleGroup = (groupLabel) => {
    setExpandedGroups((prev) =>
      prev.includes(groupLabel)
        ? prev.filter((label) => label !== groupLabel)
        : [...prev, groupLabel]
    );
  };

  const handleSelect = (selectedObj) => {
    const selectedValue = selectedObj.value;
    if (multiple) {
      const newValue =
        value?.includes(selectedValue) && Array?.isArray(value)
          ? value?.filter((v) => v !== selectedValue)
          : [...(value ?? []), selectedValue];
      onChange?.(newValue);
    } else {
      onChange?.(selectedValue);
      setIsOpen(false);
    }
  };

  const handleSelectAll = (group) => {
    if (multiple) {
      const groupOptions = group
        ? options.find(
            (option) => "options" in option && option.label === group
            // @ts-ignore
          )?.options
        : [];
      let newValue;
      if (group) {
        // If there is group toggle between removing group and adding group to values
        if (
          groupOptions.every((option) => value?.includes(option.value)) &&
          Array?.isArray(value)
        ) {
          newValue = value?.filter(
            (item) => !groupOptions.map((opt) => opt.value).includes(item)
          );
        } else {
          newValue = [
            ...(value || []),
            ...groupOptions.map((option) => option.value),
          ];
        }
      } else {
        // If there is no group toggle between removing all item and adding all items to values
        if (flattenedOptions.every((option) => value?.includes(option.value))) {
          newValue = [];
        } else {
          newValue = flattenedOptions.map((option) => option.value);
        }
      }

      onChange?.(newValue);
    }
  };

  const handleClear = () => {
    onChange?.(multiple ? [] : "");
  };

  const filterOptions = (optionsToFilter, search) => {
    return optionsToFilter.reduce((acc, item) => {
      if ("options" in item) {
        const filteredOptions = item.options.filter((option) =>
          option.label.toLowerCase().includes(search.toLowerCase())
        );
        if (filteredOptions.length > 0) {
          acc.push({ ...item, options: filteredOptions });
        }
      } else if (item.label.toLowerCase().includes(search.toLowerCase())) {
        acc.push(item);
      }
      return acc;
    }, []);
  };

  const filteredOptions = React.useMemo(() => {
    return searchTerm ? filterOptions(options, searchTerm) : options;
  }, [options, searchTerm]);

  const renderOptions = (optionsToRender) => {
    return optionsToRender.map((item, index) => {
      if ("options" in item) {
        const isExpanded = expandedGroups.includes(item.label) || !!searchTerm;
        const allGroupIsSelected = item?.options?.every((option) =>
          value?.includes(option.value)
        );
        const selectedGroupOptions = item?.options?.filter((option) =>
          value?.includes(option.value)
        );
        return (
          <CommandGroup
            key={index}
            heading={
              <div
                className="flex items-center justify-between cursor-pointer py-2"
                onClick={() => !searchTerm && toggleGroup(item.label)}
              >
                {item.label}
                <div className="flex gap-2">
                  <Badge className="rounded-full">
                    {selectedGroupOptions.length} selected
                  </Badge>
                  {!searchTerm && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isExpanded ? "transform rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </div>
            }
          >
            <div
              className={`overflow-hidden transition-all duration-200 ${
                isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {item.selectAllOption &&
                item.options.length > 1 &&
                !searchTerm && (
                  <CommandItem
                    key={`all ${item.label}`}
                    value={`all ${item.label}`}
                    className="py-3"
                    onSelect={() => handleSelectAll(item.label)}
                  >
                    {multiple && (
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          allGroupIsSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className="" />
                      </div>
                    )}
                    <span className="text-pc1 text-[.95rem]">
                      Select all items in {item.label}
                    </span>
                  </CommandItem>
                )}
              {renderOptions(item.options)}
            </div>
          </CommandGroup>
        );
      } else {
        const isSelected = Array.isArray(value)
          ? value.includes(item.value)
          : item.value === value;
        return (
          <CommandItem
            key={index}
            value={item.value}
            className="py-3"
            onSelect={() => handleSelect(item)}
          >
            {multiple && (
              <div
                className={cn(
                  "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "opacity-50 [&_svg]:invisible"
                )}
              >
                <CheckIcon className="" />
              </div>
            )}
            <span className="text-pc1 text-[.95rem]">
              {capitalizeString(item.label)}
            </span>
            {!multiple && isSelected && (
              <CheckIcon className={cn("ml-auto text-pc1")} />
            )}
          </CommandItem>
        );
      }
    });
  };

  const allIsSelected = flattenedOptions.every((option) =>
    value?.includes(option.value)
  );

  return (
    <Popover
      open={disabled ? false : isOpen}
      onOpenChange={setIsOpen}
      modal={true}
    >
      <PopoverTrigger asChild disabled={disabled}>
        <div
          className={cn(
            "flex max-h-[3.3rem] cursor-pointer items-center justify-between rounded-md shadow-sm border p-3.5 ml-1",
            disabled ? "bg-gray-100 cursor-not-allowed" : "",
            className
          )}
        >
          {isLoading ? (
            <ReusableInputLoader />
          ) : (
            <>
              <div
                className={cn(
                  "items-center gap-1 overflow-hidden text-[.95rem] overflow-x-auto",
                  multiple
                    ? "flex flex-grow "
                    : "inline-flex whitespace-nowrap",
                  inputBoxClassName
                )}
              >
                {value && value?.length > 0 ? (
                  multiple ? (
                    flattenedOptions
                      ?.filter(
                        (option) =>
                          Array?.isArray(value) && value?.includes(option.value)
                      )
                      ?.map((option) => (
                        <span
                          key={option?.value}
                          className="inline-flex w-max items-center gap-1 rounded-md border py-1 pl-2 pr-2 text-[.9rem] font-medium text-pc1 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2  bg-background "
                        >
                          <span className="text-nowrap capitalize">
                            {option?.label}
                          </span>
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              handleSelect(option);
                            }}
                            className="flex items-center rounded-sm px-[2px] text-muted-foreground/60"
                          >
                            <Cross2Icon className="w-4" />
                          </span>
                        </span>
                      ))
                  ) : (
                    capitalizeString(
                      flattenedOptions?.find((opt) => opt?.value === value)
                        ?.label ||
                        defaultValue ||
                        ""
                    )
                  )
                ) : (
                  <span className="mr-auto text-muted-foreground text-[.95rem]">
                    {placeholder}
                  </span>
                )}
              </div>
              <div className="flex items-center self-stretch pl-3 border-l [&>div]:flex [&>div]:items-center [&>div]:self-stretch">
                {value && value?.length > 0 ? (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      if (!disabled) handleClear();
                    }}
                  >
                    <Cross2Icon className="size-4" />
                  </div>
                ) : (
                  <div>
                    <PiCaretDown className="size-4" />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <Command shouldFilter={false} autoFocus={true}>
          {flattenedOptions.length > 6 && (
            <div className="relative">
              <CommandInput
                value={searchTerm}
                onValueChange={(val) => setSearchTerm(val)}
                ref={ref}
                placeholder={inputPlaceholder ?? "Search..."}
                className="h-9 text-[.95rem]"
              />
              {searchTerm && (
                <div
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-muted-foreground"
                  onClick={() => setSearchTerm("")}
                >
                  <Cross2Icon className="size-4" />
                </div>
              )}
            </div>
          )}
          <CommandList autoFocus={isOpen} tabIndex={0}>
            <CommandEmpty>
              <p className="text-[.95rem]">
                {emptyPlaceholder ?? "No results found."}
              </p>
            </CommandEmpty>
            <CommandGroup>
              <ScrollArea>
                <div className="max-h-64">
                  {multiple &&
                    selectAllOption &&
                    options.length > 1 &&
                    multiple &&
                    !searchTerm && (
                      <CommandItem
                        key={"all"}
                        value={"all"}
                        className="py-3"
                        onSelect={() => handleSelectAll()}
                      >
                        {multiple && (
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              allIsSelected
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50 [&_svg]:invisible"
                            )}
                          >
                            <CheckIcon className="" />
                          </div>
                        )}
                        <span className="text-pc1 text-[.95rem]">
                          Select all
                        </span>
                      </CommandItem>
                    )}
                  {renderOptions(filteredOptions)}
                </div>
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

SelectBox.displayName = "SelectBox";

export default SelectBox;
