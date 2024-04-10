import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const TasksPagination = ({
  tasksPerPage,
  setTasksPerPage,
  totalTasks,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-[1000px] flex items-center gap-3 justify-between my-8">
      <div className="flex gap-2 items-center">
        <p>Rows per page</p>
        <Select
          onValueChange={(value) => setTasksPerPage(value)}
          defaultValue={tasksPerPage}
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder={`${tasksPerPage}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={10}>10</SelectItem>
              <SelectItem value={20}>20</SelectItem>
              <SelectItem value={30}>30</SelectItem>
              <SelectItem value={40}>40</SelectItem>
              <SelectItem value={50}>50</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 items-center">
        <p>
          Page {currentPage} of {pageNumbers.length}
        </p>
        <Button
          className="opacity-80"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => paginate(1)}
        >
          <ChevronsLeft />
        </Button>
        <Button
          className="opacity-80"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          <ChevronLeft />
        </Button>
        <Button
          className="opacity-80"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          <ChevronRight />
        </Button>
        <Button
          className="opacity-80"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => paginate(totalPages)}
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
};

export default TasksPagination;
