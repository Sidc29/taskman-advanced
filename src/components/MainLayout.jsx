import { useState } from "react";
import TaskInputForm from "./TaskInputForm";
import TaskList from "./TaskList";

export function MainLayout() {
  const [inputValue, setInputValue] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  const [inputPriority, setInputPriority] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

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

  return (
    <>
      <div>
        <TaskInputForm
          tasks={tasks}
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
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          setInputValue={setInputValue}
          setInputStatus={setInputStatus}
          setInputPriority={setInputPriority}
          setInputLabel={setInputLabel}
          setEditMode={setEditMode}
          setEditIndex={setEditIndex}
        />
      </div>
    </>
  );
}
