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
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
const CustomCombox = ({
  tasks,
  value,
  setValue,
  open,
  setOpen,
  data,
  placeholder,
  icon,
}) => {
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    setSelectedStatus({});
  }, [tasks]);

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
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
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
                      selectedStatus && selectedStatus.value === dataItem.value;
                    setSelectedStatus(isSelected ? null : dataItem);
                    setValue(isSelected ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {icon && (
                    <dataItem.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        dataItem.value === selectedStatus?.value
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
