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

  useEffect(() => {
    const filtered = tasks.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(filtered);

    // Check if there are no results
    const noResults = filtered.length === 0 && query !== "";
    setNoResultsFound(noResults);
  }, [tasks, query]);

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
        <TaskFilters query={query} setQuery={setQuery} />
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
