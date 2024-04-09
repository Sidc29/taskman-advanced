import { useEffect, useState } from "react";
import TaskInputForm from "./TaskInputForm";
import TaskList from "./TaskList";
import TaskFilters from "./TaskFilters";

export function MainLayout() {
  const [inputValue, setInputValue] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  const [inputPriority, setInputPriority] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState([]);

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
    }
  };

  // Filtering tasks
  useEffect(() => {
    const filtered = tasks.filter((item) => {
      // Filter by name and selected statuses
      const matchesQuery = item.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus =
        selectedStatus.length === 0 || selectedStatus.includes(item.status);
      const matchesPriority =
        selectedPriority.length === 0 ||
        selectedPriority.includes(item.priority);
      return matchesQuery && matchesStatus && matchesPriority;
    });
    setFilteredTasks(filtered);

    // Check if there are no results based on both query and selected statuses
    const noResults =
      filtered.length === 0 &&
      (query !== "" ||
        selectedStatus.length > 0 ||
        selectedPriority.length > 0);
    setNoResultsFound(noResults);
  }, [tasks, query, selectedStatus, selectedPriority]);

  return (
    <>
      <div className="w-[1000px] flex-col justify-center m-auto">
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
