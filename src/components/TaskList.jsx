import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  ArrowUpCircle,
  HelpCircle,
  Pen,
  CheckCircle2,
  XCircle,
  Edit,
} from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import DeleteAlertDialog from "./DeleteAlertDialog";
import CustomDropdownMenuSub from "./CustomDropdownMenuSub";
import { labels, statuses, priorities } from "../constants/comboboxData";
const TaskList = ({
  tasks,
  setTasks,
  setInputValue,
  inputStatus,
  setInputStatus,
  inputPriority,
  setInputPriority,
  inputLabel,
  setInputLabel,
  setEditMode,
  setEditIndex,
  noResultsFound,
}) => {
  const [labelOpen, setLabelOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const { toast } = useToast();

  // Deleting a task
  const deleteTask = (toDeleteIndex) => {
    const tasksCopy = [...tasks];
    tasksCopy.splice(toDeleteIndex, 1);
    setTasks(tasksCopy);
    toast({
      title: "Task Deleted",
      description: "Task has been deleted successfully",
    });
    // Close dropdown menu after task deletion
    setSelectedIndex(null);
    setLabelOpen(false);
    setStatusOpen(false);
    setPriorityOpen(false);
  };

  // Editing a Task
  const editTask = (taskIndex) => {
    setEditIndex(taskIndex);
    setEditMode(true);
    setInputValue(tasks[taskIndex].name);
    setInputStatus(tasks[taskIndex].status);
    setInputPriority(tasks[taskIndex].priority);
    setInputLabel(tasks[taskIndex].label);
  };

  // To render status icons
  const getStatusData = (task) => {
    if (task.status === "In Progress") {
      return (
        <div className="flex row items-center">
          <ArrowUpCircle className="opacity-40 mr-2 h-10 w-4" />
          <span>{task.status ? task.status : "-"}</span>
        </div>
      );
    } else if (task.status === "Backlog") {
      return (
        <div className="flex row items-center">
          <HelpCircle className="opacity-40 mr-2 h-10 w-4" />
          <span>{task.status ? task.status : "-"}</span>
        </div>
      );
    } else if (task.status === "Todo") {
      return (
        <div className="flex row items-center">
          <Pen className="opacity-40 mr-2 h-10 w-4" />
          <span>{task.status ? task.status : "-"}</span>
        </div>
      );
    } else if (task.status === "Done") {
      return (
        <div className="flex row items-center">
          <CheckCircle2 className="opacity-40 mr-2 h-10 w-4" />
          <span>{task.status ? task.status : "-"}</span>
        </div>
      );
    } else if (task.status === "Canceled") {
      return (
        <div className="flex row items-center">
          <XCircle className="opacity-40 mr-2 h-10 w-4" />
          <span>{task.status ? task.status : "-"}</span>
        </div>
      );
    } else {
      return;
    }
  };

  // To render priority icons
  const getPriorityData = (task) => {
    if (task.priority === "Low") {
      return (
        <div className="flex row items-center">
          <ArrowDown className="opacity-40 mr-2 h-10 w-4" />
          <span> {task.priority ? task.priority : "-"}</span>
        </div>
      );
    } else if (task.priority === "Medium") {
      return (
        <div className="flex row items-center">
          <ArrowRight className="opacity-40 mr-2 h-10 w-4" />
          <span> {task.priority ? task.priority : "-"}</span>
        </div>
      );
    } else if (task.priority === "High") {
      return (
        <div className="flex row items-center">
          <ArrowUp className="opacity-40 mr-2 h-10 w-4" />
          <span> {task.priority ? task.priority : "-"}</span>
        </div>
      );
    } else {
      return;
    }
  };

  // Applying label on a particular task
  const handleApplyLabel = (index, labelToApply) => {
    const tasksCopy = [...tasks];
    tasksCopy[index].label = labelToApply;
    setTasks(tasksCopy);
  };

  // Applying status on a particular task
  const handleApplyStatus = (index, statusToApply) => {
    const tasksCopy = [...tasks];
    tasksCopy[index].status = statusToApply;
    setTasks(tasksCopy);
  };

  // Applying priority on a particular task
  const handleApplyPriority = (index, priorityToApply) => {
    const tasksCopy = [...tasks];
    tasksCopy[index].priority = priorityToApply;
    setTasks(tasksCopy);
  };

  // Function to toggle sorting order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Function to sort tasks based on the selected column
  const sortTasks = (sortBy) => {
    let sortedTasks = [...tasks];
    sortedTasks.sort((a, b) => {
      const valueA = a[sortBy].toLowerCase();
      const valueB = b[sortBy].toLowerCase();
      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
    setTasks(sortedTasks);
  };

  useEffect(() => {
    if (sortBy) {
      sortTasks(sortBy);
    }
  }, [sortOrder]); // Trigger sort when sortOrder changes

  return (
    <div className="w-[1000px] m-auto border border-1 rounded-t-lg">
      <Toaster />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Task ID</TableHead>
            <TableHead
              onClick={() => {
                setSortBy("name");
                toggleSortOrder();
              }}
            >
              <Button className="flex items-center" variant="ghost">
                Task
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead
              onClick={() => {
                setSortBy("status");
                toggleSortOrder();
              }}
            >
              <Button className="flex items-center" variant="ghost">
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead
              onClick={() => {
                setSortBy("priority");
                toggleSortOrder();
              }}
            >
              <Button className="flex items-center" variant="ghost">
                Priority
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((taskItem, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">
                <div className="flex gap-2">
                  <span>
                    {taskItem.label ? (
                      <Badge className="rounded-md" variant="outline">
                        {taskItem.label}
                      </Badge>
                    ) : (
                      ""
                    )}
                  </span>
                  <span>{taskItem.name}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium ">
                {taskItem.status ? getStatusData(taskItem) : "-"}
              </TableCell>
              <TableCell className="font-medium">
                {taskItem.priority ? getPriorityData(taskItem) : "-"}
              </TableCell>
              <TableCell>
                <DropdownMenu
                  open={
                    selectedIndex === index &&
                    labelOpen &&
                    statusOpen &&
                    priorityOpen
                  }
                  onOpenChange={(newState) => {
                    setLabelOpen(newState);
                    setStatusOpen(newState);
                    setPriorityOpen(newState);
                    setSelectedIndex(index);
                  }}
                >
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => editTask(index)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {/* Apply Label */}
                    <CustomDropdownMenuSub
                      type="Apply Label"
                      placeholder="Search labels..."
                      taskItem={taskItem}
                      triggerFunction={handleApplyLabel}
                      setOpen={setLabelOpen}
                      index={index}
                      data={labels}
                      value={inputLabel}
                    />
                    {/* Apply Status */}
                    <CustomDropdownMenuSub
                      type="Apply Status"
                      taskItem={taskItem}
                      triggerFunction={handleApplyStatus}
                      setOpen={setStatusOpen}
                      index={index}
                      data={statuses}
                      value={inputStatus}
                    />
                    {/* Apply Priority */}
                    <CustomDropdownMenuSub
                      type="Apply Priority"
                      taskItem={taskItem}
                      triggerFunction={handleApplyPriority}
                      setOpen={setPriorityOpen}
                      index={index}
                      data={priorities}
                      value={inputPriority}
                    />
                    <DropdownMenuSeparator />

                    <DeleteAlertDialog
                      index={index}
                      triggerFunction={deleteTask}
                      desc={`This action cannot be undone. This will permanently delete your
                     task.`}
                      btnText="Yes"
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!noResultsFound && tasks.length === 0 ? (
        <div className="flex items-center justify-center my-12">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no tasks currently
            </h3>
            <p className="text-sm text-muted-foreground w-3/4">
              Feel free to begin adding tasks, including details such as their
              status, priority, and labels. You can also edit or delete tasks as
              needed.
            </p>
          </div>
        </div>
      ) : (
        noResultsFound && (
          <div className="flex items-center justify-center my-12">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-xl font-bold tracking-tight">
                No tasks found for this query
              </h3>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default TaskList;
