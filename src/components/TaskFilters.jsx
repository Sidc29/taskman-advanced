import { Input } from "@/components/ui/input";
import { statuses, priorities, labels } from "../constants/comboboxData";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
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
}) => {
  const [filtersActive, setFiltersActive] = useState(false);

  const ResetFilters = () => {
    setSelectedStatus([]);
    setSelectedPriority([]);
    setSelectedLabel([]);
  };

  // To check if filters have been selected
  useEffect(() => {
    const filtersActived =
      selectedStatus?.length > 0 ||
      selectedPriority?.length > 0 ||
      selectedLabel?.length > 0;
    setFiltersActive(filtersActived);
  }, [selectedStatus, selectedPriority, selectedLabel]);

  return (
    <>
      <div className="flex items-center space-x-2 mt-11 mb-3 w-[1000px]">
        <Input
          disabled={tasks?.length === 0 && !noResultsFound}
          className="w-56"
          type="text"
          placeholder="Search for tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <MultiSelect
          disabled={tasks?.length === 0 && !noResultsFound}
          type="Status"
          data={statuses}
          selectedFilter={selectedStatus}
          setSelectedFilter={setSelectedStatus}
          noResultsFound={noResultsFound}
        />
        <MultiSelect
          disabled={tasks?.length === 0 && !noResultsFound}
          type="Priority"
          data={priorities}
          selectedFilter={selectedPriority}
          setSelectedFilter={setSelectedPriority}
          noResultsFound={noResultsFound}
        />
        <MultiSelect
          disabled={tasks?.length === 0 && !noResultsFound}
          type="Label"
          data={labels}
          selectedFilter={selectedLabel}
          setSelectedFilter={setSelectedLabel}
          noResultsFound={noResultsFound}
        />

        {filtersActive && (
          <Button variant="ghost" className="flex gap-2" onClick={ResetFilters}>
            Reset
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </>
  );
};

export default TaskFilters;
