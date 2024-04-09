import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import TaskInputForm from "./TaskInputForm";
import TaskList from "./TaskList";
import TaskFilters from "./TaskFilters";
import Navbar from "./Navbar";
export function MainLayout() {
  const [inputValue, setInputValue] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  const [inputPriority, setInputPriority] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState([]);

  const { toast } = useToast();

  // Load tasks from local storage when component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to local storage when tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputReset = () => {
    setInputValue("");
    setInputStatus("");
    setInputPriority("");
    setInputLabel("");
  };

  const handleEditReset = () => {
    setEditIndex(null);
    setEditMode(false);
  };

  const handleFiltersReset = () => {
    setSelectedStatus([]);
    setSelectedPriority([]);
    setQuery("");
  };

  const addTask = (e) => {
    e.preventDefault();
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        name: inputValue,
        label: inputLabel,
        status: inputStatus,
        priority: inputPriority,
      },
    ]);
    handleInputReset();
    handleFiltersReset();
  };

  const saveTask = (e) => {
    e.preventDefault();
    if (editIndex !== null && editMode) {
      const tasksCopy = [...tasks];
      tasksCopy[editIndex].name = inputValue;
      tasksCopy[editIndex].status = inputStatus;
      tasksCopy[editIndex].priority = inputPriority;
      tasksCopy[editIndex].label = inputLabel;
      setTasks(tasksCopy);
      handleInputReset();
      handleEditReset();
      toast({
        title: "Changes Saved",
        description: "Task has been edited successfully",
      });
    }
  };

  // Filtering tasks
  useEffect(() => {
    const filtered = tasks?.filter((item) => {
      // Filter by name and selected statuses
      const matchesQuery = item?.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus =
        selectedStatus.length === 0 || selectedStatus.includes(item?.status);
      const matchesPriority =
        selectedPriority.length === 0 ||
        selectedPriority.includes(item.priority);
      const matchesLabel =
        selectedLabel.length === 0 || selectedLabel.includes(item?.label);
      return matchesQuery && matchesStatus && matchesPriority && matchesLabel;
    });
    setFilteredTasks(filtered);

    // Check if there are no results based on both query and selected statuses
    const noResults =
      filtered?.length === 0 &&
      (query !== "" ||
        selectedStatus.length > 0 ||
        selectedPriority.length > 0 ||
        selectedLabel.length > 0);
    setNoResultsFound(noResults);
  }, [tasks, query, selectedStatus, selectedPriority, selectedLabel]);

  return (
    <>
      <Toaster />
      <Navbar />
      <div className="flex flex-col items-center mt-24">
        <TaskInputForm
          tasks={filteredTasks}
          addTask={addTask}
          inputValue={inputValue}
          setInputValue={setInputValue}
          inputStatus={inputStatus}
          setInputStatus={setInputStatus}
          inputPriority={inputPriority}
          setInputPriority={setInputPriority}
          inputLabel={inputLabel}
          setInputLabel={setInputLabel}
          editMode={editMode}
          setEditMode={setEditMode}
          saveTask={saveTask}
          handleInputReset={handleInputReset}
          handleEditReset={handleEditReset}
        />
        <TaskFilters
          tasks={filteredTasks}
          setTasks={setTasks}
          query={query}
          setQuery={setQuery}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
          noResultsFound={noResultsFound}
        />
        <TaskList
          tasks={filteredTasks}
          setTasks={setTasks}
          setInputValue={setInputValue}
          setInputStatus={setInputStatus}
          setInputPriority={setInputPriority}
          setInputLabel={setInputLabel}
          setEditMode={setEditMode}
          setEditIndex={setEditIndex}
          noResultsFound={noResultsFound}
        />
      </div>
    </>
  );
}
