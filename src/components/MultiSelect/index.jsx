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

const MultiSelect = ({ type, data, selectedFilter, setSelectedFilter }) => {
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
    setSelectedFilter([]);
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
                        toggleFilter(currentValue);
                      }}
                    >
                      <Checkbox
                        checked={selectedFilter?.includes(dataItem.value)}
                        onChange={() => {
                          toggleFilter(dataItem.value);
                        }}
                      />
                      {dataItem.label}
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
      {selectedFilter?.length > 2 ? (
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
    </div>
  );
};

export default MultiSelect;
