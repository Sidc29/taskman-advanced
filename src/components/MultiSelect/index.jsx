import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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

const MultiSelect = ({
  type,
  data,
  selectedStatus,
  setSelectedStatus,
  selectedPriority,
  setSelectedPriority,
}) => {
  const [open, setOpen] = useState(false);

  const toggleStatus = (status) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus((prevStatus) =>
        prevStatus.filter((item) => item !== status)
      );
    } else {
      setSelectedStatus((prevStatus) => [...prevStatus, status]);
    }
  };

  const togglePriority = (priority) => {
    if (selectedPriority.includes(priority)) {
      setSelectedPriority((prevPriority) =>
        prevPriority.filter((item) => item !== priority)
      );
    } else {
      setSelectedPriority((prevPriority) => [...prevPriority, priority]);
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSelectedStatus([]); // Clear the selected status
  };

  return (
    <div className="border border-dashed flex items-center gap-2 rounded-md">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="flex gap-2 justify-between" variant="ghost">
            <PlusCircle className="h-4 w-4" />
            {type}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[150px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {data?.map((dataItem, index) => (
                  <div key={index}>
                    <CommandItem
                      className="flex items-center gap-2"
                      value={dataItem.value}
                      onSelect={(currentValue) => {
                        if (type === "Status") {
                          toggleStatus(currentValue);
                        } else if (type === "Priority") {
                          togglePriority(currentValue);
                        }
                      }}
                    >
                      <Checkbox
                        checked={
                          type === "Status"
                            ? selectedStatus?.includes(dataItem.value)
                            : selectedPriority?.includes(dataItem.value)
                        }
                        onChange={() => {
                          if (type === "Status") {
                            toggleStatus(dataItem.value);
                          } else if (type === "Priority") {
                            togglePriority(dataItem.value);
                          }
                        }}
                      />
                      {dataItem.label}
                    </CommandItem>
                    {index === data?.length - 1 &&
                      (type === "Status"
                        ? selectedStatus?.length > 0
                        : selectedPriority?.length > 0) && (
                        <Separator className="my-1" />
                      )}
                  </div>
                ))}
                {(type === "Status"
                  ? selectedStatus?.length > 0
                  : selectedPriority?.length > 0) && (
                  <CommandItem
                    className="justify-center"
                    onSelect={() => {
                      clearFilters();
                    }}
                  >
                    Clear filters
                  </CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {(
        type === "Status"
          ? selectedStatus?.length > 2
          : selectedPriority?.length > 2
      ) ? (
        <Badge className="rounded-sm" variant="secondary">
          {(type === "Status"
            ? selectedStatus?.length
            : selectedPriority?.length) +
            " " +
            "selected"}
        </Badge>
      ) : type === "Status" ? (
        selectedStatus?.map((status, index) => (
          <Badge key={index} className="rounded-sm" variant="secondary">
            {status}
          </Badge>
        ))
      ) : (
        selectedPriority?.map((priority, index) => (
          <Badge key={index} className="rounded-sm" variant="secondary">
            {priority}
          </Badge>
        ))
      )}
    </div>
  );
};

export default MultiSelect;
