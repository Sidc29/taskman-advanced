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
import { Input } from "@/components/ui/input";
import {
  statuses,
  priorities,
  labels,
  viewOpts,
} from "../constants/comboboxData";
import { Button } from "@/components/ui/button";
import { X, Check, SlidersHorizontal } from "lucide-react";
import MultiSelect from "./MultiSelectFilter";
import { useEffect, useState } from "react";

const TaskFilters = ({
  tasks,
  query,
  setQuery,
  selectedStatus,
  setSelectedStatus,
  selectedPriority,
  setSelectedPriority,
  noResultsFound,
  selectedLabel,
  setSelectedLabel,
  selectedView,
  setSelectedView,
}) => {
  const [filtersActive, setFiltersActive] = useState(false);
  const [open, setOpen] = useState(false);

  const ResetFilters = () => {
    setSelectedStatus([]);
    setSelectedPriority([]);
    setSelectedLabel([]);
  };

  // To toggle view
  useEffect(() => {
    const filtersActived =
      selectedStatus?.length > 0 ||
      selectedPriority?.length > 0 ||
      selectedLabel?.length > 0;
    setFiltersActive(filtersActived);
  }, [selectedStatus, selectedPriority, selectedLabel]);

  const toggleView = (filterOption) => {
    if (selectedView.includes(filterOption)) {
      setSelectedView((prevStatus) =>
        prevStatus.filter((item) => item !== filterOption)
      );
    } else {
      setSelectedView((prevStatus) => [...prevStatus, filterOption]);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center space-x-2 mt-11 mb-3 w-[1000px]">
        <div className="flex gap-2">
          {/* Text filter */}
          <Input
            disabled={tasks?.length === 0 && !noResultsFound}
            className="w-56"
            type="text"
            placeholder="Search for tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* Status Filter */}
          <MultiSelect
            disabled={tasks?.length === 0 && !noResultsFound}
            type="Status"
            data={statuses}
            selectedFilter={selectedStatus}
            setSelectedFilter={setSelectedStatus}
            noResultsFound={noResultsFound}
          />
          {/* Priority Filter */}
          <MultiSelect
            disabled={tasks?.length === 0 && !noResultsFound}
            type="Priority"
            data={priorities}
            selectedFilter={selectedPriority}
            setSelectedFilter={setSelectedPriority}
            noResultsFound={noResultsFound}
          />
          {/* Label Filter */}
          <MultiSelect
            disabled={tasks?.length === 0 && !noResultsFound}
            type="Label"
            data={labels}
            selectedFilter={selectedLabel}
            setSelectedFilter={setSelectedLabel}
            noResultsFound={noResultsFound}
          />
          {filtersActive && (
            <Button
              variant="ghost"
              className="flex gap-2"
              onClick={ResetFilters}
            >
              Reset
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {/* View Toggle */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button className="flex gap-2 justify-between" variant="outline">
              <SlidersHorizontal className="h-4 w-4" />
              View
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" side="left" align="start">
            <Command>
              <CommandList>
                <CommandGroup>
                  {viewOpts?.map((viewOption, index) => (
                    <div key={index}>
                      <CommandItem
                        className="flex items-center gap-2 justify-between"
                        value={viewOption.value}
                        onSelect={(currentValue) => {
                          toggleView(currentValue);
                          setOpen(false);
                        }}
                      >
                        <div className="flex gap-2">{viewOption.label}</div>
                        {selectedView.includes(viewOption.value) && (
                          <Check className="h-4 w-4" />
                        )}
                      </CommandItem>
                    </div>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default TaskFilters;
