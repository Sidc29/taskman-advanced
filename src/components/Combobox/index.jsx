import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
const CustomCombox = ({
  tasks,
  value,
  setValue,
  open,
  setOpen,
  data,
  placeholder,
  icon,
  selectedOptions,
  setSelectedOptions,
}) => {
  const clearSelection = () => {
    setSelectedOptions({});
    setValue("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[350px] justify-between"
        >
          {value
            ? data.find((dataItem) => dataItem.value === value)?.label
            : placeholder}

          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <div>
        {selectedOptions.value === value && (
          <XCircle
            className="h-4 w-4 cursor-pointer"
            onClick={clearSelection}
          />
        )}
      </div>
      <PopoverContent className="w-[150px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {data.map((dataItem, index) => (
                <CommandItem
                  key={index}
                  value={dataItem.value}
                  onSelect={(currentValue) => {
                    const isSelected =
                      selectedOptions &&
                      selectedOptions.value === dataItem.value;
                    // If the clicked option is already selected, do nothing
                    if (isSelected) {
                      setOpen(false);
                      return;
                    }
                    // Otherwise, update the selected status and value
                    setSelectedOptions(dataItem);
                    setValue(currentValue);
                    setOpen(false);
                  }}
                >
                  {icon && (
                    <dataItem.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        dataItem.value === selectedOptions?.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
                  )}
                  {dataItem.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CustomCombox;
