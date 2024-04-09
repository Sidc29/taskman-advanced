import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
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
  selectedFilter,
  setSelectedFilter,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);

  const toggleFilter = (filterOption) => {
    if (selectedFilter.includes(filterOption)) {
      setSelectedFilter((prevStatus) =>
        prevStatus.filter((item) => item !== filterOption)
      );
    } else {
      setSelectedFilter((prevStatus) => [...prevStatus, filterOption]);
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSelectedFilter([]); // Clear the selected status
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            className="flex gap-2 justify-between border border-dashed"
            variant="ghost"
          >
            <ListFilter className="h-4 w-4" />
            {type}
            {selectedFilter?.length > 0 && <Separator orientation="vertical" />}
            {selectedFilter?.length > 1 ? (
              <Badge className="rounded-sm" variant="secondary">
                {selectedFilter?.length + " " + "selected"}
              </Badge>
            ) : (
              selectedFilter?.map((filterOption, index) => (
                <Badge key={index} className="rounded-sm" variant="secondary">
                  {filterOption}
                </Badge>
              ))
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" side="down" align="start">
          <Command>
            <CommandList>
              <CommandGroup>
                {data?.map((dataItem, index) => (
                  <div key={index}>
                    <CommandItem
                      className="flex items-center gap-2 justify-between"
                      value={dataItem.value}
                      onSelect={(currentValue) => {
                        toggleFilter(currentValue);
                      }}
                    >
                      <div className="flex gap-2">
                        <Checkbox
                          checked={selectedFilter?.includes(dataItem.value)}
                          onChange={() => {
                            toggleFilter(dataItem.value);
                          }}
                        />
                        {dataItem.icon && (
                          <dataItem.icon className="h-4 w-4 opacity-40" />
                        )}
                        {dataItem.label}
                      </div>
                    </CommandItem>
                    {index === data?.length - 1 &&
                      selectedFilter?.length > 0 && (
                        <Separator className="my-1" />
                      )}
                  </div>
                ))}
                {selectedFilter?.length > 0 && (
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
    </>
  );
};

export default MultiSelect;
