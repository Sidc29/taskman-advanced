import { useState } from "react";
import { Input } from "@/components/ui/input";
import { statuses, priorities } from "../constants/comboboxData";
import MultiSelect from "./MultiSelect";

const TaskFilters = ({
  query,
  setQuery,
  selectedStatus,
  setSelectedStatus,
  selectedPriority,
  setSelectedPriority,
}) => {
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
          type="Status"
          data={statuses}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
        <MultiSelect
          type="Priority"
          data={priorities}
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
        />
      </div>
    </>
  );
};

export default TaskFilters;
