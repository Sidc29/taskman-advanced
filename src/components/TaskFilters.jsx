import { Input } from "@/components/ui/input";

const TaskFilters = ({ query, setQuery }) => {
  return (
    <Input
      className="w-fit relative top-12"
      placeholder="Search for tasks..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default TaskFilters;
