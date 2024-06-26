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
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  Edit,
  Copy,
  MoreVertical,
  MoreHorizontal,
} from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import DeleteAlertDialog from "./DeleteAlertDialog";
import CustomDropdownMenuSub from "./CustomDropdownMenuSub";
import { labels, statuses, priorities } from "../constants/comboboxData";
import { Checkbox } from "@/components/ui/checkbox";
import DropdownMenuSubBulk from "./DropdownMenuSubBulk";

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
  const [deletedSelectedTask, setDeletedSelectedTask] = useState(null);
  const [deletedTaskIndex, setDeletedTaskIndex] = useState(null);
  const [restoreTask, setRestoreTask] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [bulkSelectOpen, setBulkSelectOpen] = useState(false);
  const [restoreDeletedSelectedTasks, setRestoreDeletedSelectedTasks] =
    useState(false);
  const [deletedSelectedTaskIndices, setDeletedSelectedTaskIndices] = useState(
    []
  );

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

  const toggleTaskSelect = (taskItem) => {
    setSelectedTasks((prevStatus) =>
      prevStatus.includes(taskItem)
        ? prevStatus.filter((item) => item !== taskItem)
        : [...prevStatus, taskItem]
    );

    // Check if all tasks are selected
    const allTasksSelected = selectedTasks.length + 1 === tasks.length;

    // Update select all checkbox
    setSelectAllChecked(allTasksSelected);
  };

  const toggleTaskSelectAll = () => {
    if (selectAllChecked) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map((task) => task)); // Select all tasks
    }

    setSelectAllChecked((prev) => !prev);
  };

  const handleBulkDeleteAction = () => {
    if (selectedTasks.length > 0) {
      const filteredTasks = tasks.filter(
        (task) => !selectedTasks.includes(task)
      );
      // Store deleted tasks and their indices
      setDeletedSelectedTask(selectedTasks);
      setDeletedSelectedTaskIndices(
        selectedTasks.map((task) => tasks.indexOf(task))
      );
      setTasks(filteredTasks);
      setSelectedTasks([]);
      toast({
        title: "Selected Tasks Deleted",
        description: "All selected tasks have been deleted successfully ",
        action: (
          <ToastAction
            onClick={() => setRestoreDeletedSelectedTasks(true)}
            altText="Undo"
          >
            Undo
          </ToastAction>
        ),
      });
    }
    setBulkSelectOpen(false);
  };

  const undoDeleteSelectTasks = () => {
    const updatedTasks = [...tasks];
    deletedSelectedTask?.forEach((task, index) => {
      updatedTasks.splice(deletedSelectedTaskIndices[index], 0, task);
    });
    setTasks(updatedTasks);
    setDeletedSelectedTask([]);
    setDeletedSelectedTaskIndices([]);
  };

  useEffect(() => {
    undoDeleteSelectTasks();
  }, [restoreDeletedSelectedTasks]);

  // Function to handle bulk copy action
  const handleBulkCopyAction = () => {
    if (selectedTasks.length > 0) {
      const copiedTasks = selectedTasks.map((task) => {
        return { ...task };
      });
      setTasks([...tasks, ...copiedTasks]); // Add copied tasks to the task list
      toast({
        title: "Selected Tasks Copied",
        description: "All selected tasks have been copied successfully",
      });
      setSelectedTasks([]);
    }
  };

  useEffect(() => {
    if (tasks.length > 0) {
      // Check if all tasks are selected
      const allTasksSelected = selectedTasks.length === tasks.length;

      // Update select all checkbox
      setSelectAllChecked(allTasksSelected);
    } else {
      // If there are no tasks, uncheck the "Select All" checkbox
      setSelectAllChecked(false);
    }
  }, [selectedTasks, tasks]);

  // Function to handle applying or changing the status for selected tasks
  const handleApplyStatusBulk = (statusToApply) => {
    selectedTasks.forEach((task) => {
      const taskIndex = tasks.indexOf(task);
      handleApplyStatus(taskIndex, statusToApply);
    });
    toast({
      title: "Status Applied to Selected Tasks",
      description: "The status has been applied to all selected tasks.",
    });
  };

  // Function to handle applying or changing the priority for selected tasks
  const handleApplyPriorityBulk = (priorityToApply) => {
    selectedTasks.forEach((task) => {
      const taskIndex = tasks.indexOf(task);
      handleApplyPriority(taskIndex, priorityToApply);
    });
    toast({
      title: "Priority Applied to Selected Tasks",
      description: "The priority has been applied to all selected tasks.",
    });
  };

  // Function to handle applying or changing the priority for selected tasks
  const handleApplyLabelBulk = (labelToApply) => {
    selectedTasks.forEach((task) => {
      const taskIndex = tasks.indexOf(task);
      handleApplyLabel(taskIndex, labelToApply);
    });
    toast({
      title: "Priority Applied to Selected Tasks",
      description: "The priority has been applied to all selected tasks.",
    });
  };

  return (
    <>
      <div className="w-[1100px] m-0 border border-1 rounded-t-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[100px] flex items-center">
                <Checkbox
                  disabled={tasks.length === 0}
                  checked={
                    tasks.length === selectedTasks.length && selectAllChecked
                  }
                  className="h-4 w-4 mr-2"
                  onCheckedChange={() => {
                    toggleTaskSelectAll();
                  }}
                />
                Task ID
              </TableHead>
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
              <TableHead>
                <div className="flex items-center justify-end">
                  <DropdownMenu
                    open={bulkSelectOpen}
                    onOpenChange={setBulkSelectOpen}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        disabled={selectedTasks.length === 0}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {/* Apply Status (Bulk) */}
                      <DropdownMenuSubBulk
                        type="Apply Status"
                        data={statuses}
                        triggerFunction={handleApplyStatusBulk}
                        setOpen={setBulkSelectOpen}
                        open={bulkSelectOpen}
                      />
                      {/* Apply Priority (Bulk) */}
                      <DropdownMenuSubBulk
                        type="Apply Priority"
                        data={priorities}
                        triggerFunction={handleApplyPriorityBulk}
                        setOpen={setBulkSelectOpen}
                        open={bulkSelectOpen}
                      />
                      {/* Apply Labels (Bulk) */}
                      <DropdownMenuSubBulk
                        type="Apply Label"
                        data={labels}
                        triggerFunction={handleApplyLabelBulk}
                        setOpen={setBulkSelectOpen}
                        open={bulkSelectOpen}
                      />
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleBulkCopyAction}>
                        <Copy className="h-4 w-4" />
                        <span className="ml-2">Make Copies</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DeleteAlertDialog
                        triggerFunction={handleBulkDeleteAction}
                        desc={`This action cannot be undone. This will permanently delete all your
                     tasks.`}
                        btnText="Delete Tasks"
                        btnYesText="Yes"
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((taskItem, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Checkbox
                      className="h-4 w-4 mr-2"
                      checked={selectedTasks?.includes(taskItem)}
                      onCheckedChange={() => {
                        toggleTaskSelect(taskItem);
                      }}
                    />
                    <span>{index + 1}</span>
                  </div>
                </TableCell>

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
                      <DropdownMenuSeparator />
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
                        btnText="Delete Task"
                        btnYesText="Yes"
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
