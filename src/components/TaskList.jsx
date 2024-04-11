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
  AlarmClockIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import DeleteAlertDialog from "./DeleteAlertDialog";
import CustomDropdownMenuSub from "./CustomDropdownMenuSub";
import {
  labels,
  statuses,
  priorities,
  reminderOptions,
} from "../constants/comboboxData";
import { Checkbox } from "@/components/ui/checkbox";

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
  // inputReminder,
  setInputReminder,
  setEditMode,
  setEditIndex,
  noResultsFound,
  selectedView,
}) => {
  const [labelOpen, setLabelOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);
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
  const [reminderTimeouts, setReminderTimeouts] = useState([]);

  const { toast } = useToast();

  // Deleting a task
  const deleteTask = (deleteTaskIndex) => {
    const tasksCopy = [...tasks];
    const updatedTimeouts = [...reminderTimeouts];
    // Clear the timeout associated with the deleted task's reminder
    clearTimeout(updatedTimeouts[deleteTaskIndex]);
    tasksCopy.splice(deleteTaskIndex, 1);
    // Remove the deleted task's timeout ID from the state
    setReminderTimeouts(
      updatedTimeouts
        .slice(0, deleteTaskIndex)
        .concat(updatedTimeouts.slice(deleteTaskIndex + 1))
    );
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
    setInputReminder(tasks[editTaskIndex].reminder);
  };

  // Function to copy a task
  const copyTask = (copyTaskIndex) => {
    const taskToCopy = tasks[copyTaskIndex];
    const newTask = { ...taskToCopy, reminder: "" };
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

  // Setting Reminder on a task
  const handleSetReminder = (index, reminderToApply) => {
    const tasksCopy = [...tasks];
    tasksCopy[index].reminder = reminderToApply;
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
        // Create a copy of each selected task with the reminder field set to an empty string
        return { ...task, reminder: "" };
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

  // Function to schedule notification for a task's reminder
  const scheduleNotification = (
    taskName,
    reminderTime,
    timeUnit,
    taskIndex
  ) => {
    // Convert reminderTime to seconds based on the timeUnit
    let reminderInSeconds = 0;
    switch (timeUnit) {
      case "seconds":
        reminderInSeconds = reminderTime;
        break;
      case "minutes":
        reminderInSeconds = reminderTime * 60;
        break;
      case "hours":
        reminderInSeconds = reminderTime * 60 * 60;
        break;
      case "days":
        reminderInSeconds = reminderTime * 60 * 60 * 24;
        break;
      default:
        reminderInSeconds = reminderTime; // If no timeUnit is provided, assume seconds
    }

    const timeoutId = setTimeout(() => {
      new Notification("Task Reminder", {
        body: taskName,
        icon: "/path/to/icon.png", // Change to your icon path
      });
      // After triggering the notification, clear the reminder field
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].reminder = "";
      setTasks(updatedTasks);
    }, reminderInSeconds * 1000);

    // Store the timeout ID
    setReminderTimeouts((prev) => [
      ...prev.slice(0, taskIndex),
      timeoutId,
      ...prev.slice(taskIndex + 1),
    ]);
  };

  // To schedule notifications when tasks or reminders change
  useEffect(() => {
    // Clear all existing timeouts
    reminderTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));

    // Iterate over tasks and schedule notifications for those with reminders
    tasks.forEach((task, index) => {
      if (task.reminder !== "") {
        const taskName = task.name;
        const reminderTime = parseInt(task.reminder.split(" ")[0]);
        const timeUnit = task.reminder.split(" ")[1]; // Get the time unit from the reminder
        scheduleNotification(taskName, reminderTime, timeUnit, index);
      }
    });
  }, [tasks]); // Trigger the effect whenever tasks change

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
                      <DropdownMenuItem onClick={handleBulkCopyAction}>
                        <Copy className="h-4 w-4" />
                        <span className="ml-2">Make Copies</span>
                      </DropdownMenuItem>
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
                      priorityOpen &&
                      reminderOpen
                    }
                    onOpenChange={(newState) => {
                      setLabelOpen(newState);
                      setStatusOpen(newState);
                      setPriorityOpen(newState);
                      setReminderOpen(newState);
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
                      {/* Set Reminder */}
                      <CustomDropdownMenuSub
                        type="Set Reminder"
                        taskItem={taskItem}
                        triggerFunction={handleSetReminder}
                        setOpen={setReminderOpen}
                        index={index}
                        data={reminderOptions}
                      />
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
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {taskItem.reminder ? (
                          <AlarmClockIcon className="text-red-500 w-6 h-6" />
                        ) : (
                          <AlarmClockIcon className="w-6 h-6 opacity-40" />
                        )}
                      </TooltipTrigger>

                      {taskItem.reminder ? (
                        <TooltipContent>Reminder set</TooltipContent>
                      ) : (
                        <TooltipContent>No reminder set</TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
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
