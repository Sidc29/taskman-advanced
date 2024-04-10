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
import { ArrowUpDown, Edit, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
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
  selectedView,
}) => {
  const [labelOpen, setLabelOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [deletedTask, setDeletedTask] = useState(null);
  const [deletedTaskIndex, setDeletedTaskIndex] = useState(null);
  const [restoreTask, setRestoreTask] = useState(false);

  const { toast } = useToast();

  // Deleting a task
  const deleteTask = (deleteTaskIndex) => {
    const tasksCopy = [...tasks];
    tasksCopy.splice(deleteTaskIndex, 1);
    setDeletedTask(tasks[deleteTaskIndex]);
    setDeletedTaskIndex(deleteTaskIndex);
    setTasks(tasksCopy);
    toast({
      title: "Task Deleted",
      description: "Task has been deleted successfully ",
      action: (
        <ToastAction onClick={() => setRestoreTask(true)} altText="Undo">
          Undo
        </ToastAction>
      ),
    });
    // Close dropdown menu after task deletion
    setSelectedIndex(null);
    setLabelOpen(false);
    setStatusOpen(false);
    setPriorityOpen(false);
  };

  const undoDeleteTask = () => {
    if (deletedTask) {
      const tasksCopy = [...tasks];
      tasksCopy.splice(deletedTaskIndex, 0, deletedTask);
      setTasks(tasksCopy);
      setDeletedTask(null);
      setRestoreTask(false);
    }
  };

  useEffect(() => {
    undoDeleteTask();
  }, [restoreTask]);

  // Editing a Task
  const editTask = (editTaskIndex) => {
    setEditIndex(editTaskIndex);
    setEditMode(true);
    setInputValue(tasks[editTaskIndex].name);
    setInputStatus(tasks[editTaskIndex].status);
    setInputPriority(tasks[editTaskIndex].priority);
    setInputLabel(tasks[editTaskIndex].label);
  };

  // Function to copy a task
  const copyTask = (copyTaskIndex) => {
    const taskToCopy = tasks[copyTaskIndex];
    const newTask = { ...taskToCopy };
    setTasks([...tasks, newTask]);
    toast({
      title: "Task Copied",
      description: "Task has been copied successfully ",
    });
  };

  // To render Status and Priority cell data
  const getData = (type, taskItem) => {
    const ObjectType = type.find((item) => item.value === taskItem);

    if (ObjectType) {
      const Icon = ObjectType.icon;
      return (
        <div className="flex row items-center">
          {<Icon className="opacity-40 mr-2 h-10 w-4" />}
          <span> {taskItem && taskItem}</span>
        </div>
      );
    }
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

  // Applying label on a particular task
  const handleApplyLabel = (index, labelToApply) => {
    const tasksCopy = [...tasks];
    tasksCopy[index].label = labelToApply;
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
    <>
      <div className="w-[1000px] m-0 border border-1 rounded-t-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
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
              {/* Status */}
              {selectedView.includes("Status") && (
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
              )}

              {/* Priority */}
              {selectedView.includes("Priority") && (
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
              )}
              {selectedView.includes("Label") && (
                <TableHead className="w-[100px]">Label</TableHead>
              )}

              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((taskItem, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>

                <TableCell className="font-medium">
                  <span>{taskItem.name}</span>
                </TableCell>
                {selectedView.includes("Status") && (
                  <TableCell className="font-medium ">
                    {getData(statuses, taskItem.status)
                      ? getData(statuses, taskItem.status)
                      : "-"}
                  </TableCell>
                )}

                {selectedView.includes("Priority") && (
                  <TableCell className="font-medium ">
                    {getData(priorities, taskItem.priority)
                      ? getData(priorities, taskItem.priority)
                      : "-"}
                  </TableCell>
                )}

                {selectedView.includes("Label") && (
                  <TableCell className="font-medium">
                    {taskItem.label ? (
                      <Badge className="rounded-md">{taskItem.label}</Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                )}

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
                      <DropdownMenuSeparator />
                      {/* Copy a task*/}
                      <DropdownMenuItem onClick={() => copyTask(index)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Make a Copy
                      </DropdownMenuItem>
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
                You have no tasks right now
              </h3>
              <p className="text-sm text-muted-foreground w-3/4">
                Feel free to begin adding tasks, including details such as their
                status, priority, and labels.
              </p>
            </div>
          </div>
        ) : (
          noResultsFound && (
            <div className="flex items-center justify-center my-12">
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-xl font-bold tracking-tight">
                  No tasks found
                </h3>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default TaskList;
