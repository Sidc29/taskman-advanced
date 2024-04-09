import { Input } from "@/components/ui/input";
import { statuses, priorities } from "../constants/comboboxData";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import MultiSelect from "./MultiSelect";
import { useEffect, useState } from "react";

const TaskFilters = ({
  tasks,
  query,
  setQuery,
  selectedStatus,
  setSelectedStatus,
  selectedPriority,
  setSelectedPriority,
}) => {
  const [filtersActive, setFiltersActive] = useState(false);

  const ResetFilters = () => {
    setQuery("");
    setSelectedStatus([]);
    setSelectedPriority([]);
  };

  // To check if filters have been selected
  useEffect(() => {
    const filtersActived =
      selectedStatus?.length > 0 || selectedPriority?.length > 0;
    setFiltersActive(filtersActived);
  }, [selectedStatus, selectedPriority]);

  return (
    <>
      <div className="flex w-full items-center space-x-2 mt-11 mb-3">
        <Input
          className="w-56"
          type="text"
          placeholder="Search for tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <MultiSelect
          tasks={tasks}
          type="Status"
          data={statuses}
          selectedFilter={selectedStatus}
          setSelectedFilter={setSelectedStatus}
        />
        <MultiSelect
          tasks={tasks}
          type="Priority"
          data={priorities}
          selectedFilter={selectedPriority}
          setSelectedFilter={setSelectedPriority}
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
