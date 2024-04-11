import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomCombox from "./Combobox";

import {
  statuses,
  priorities,
  labels,
  reminderOptions,
} from "../constants/comboboxData";

const TaskInputForm = ({
  tasks,
  addTask,
  inputValue,
  setInputValue,
  inputStatus,
  setInputStatus,
  inputPriority,
  setInputPriority,
  inputLabel,
  setInputLabel,
  inputReminder,
  setInputReminder,
  editMode,
  setEditMode,
  saveTask,
  handleInputReset,
  handleEditReset,
}) => {
  const [inputStatusOpen, setInputStatusOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [labelOpen, setLabelOpen] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [selectedPriority, setSelectedPriority] = useState({});
  const [selectedLabel, setSelectedLabel] = useState({});
  const [selectedReminder, setSelectedReminder] = useState({});

  useEffect(() => {
    if (editMode) {
      setSelectedStatus(
        statuses.find((status) => status.value === inputStatus) || {}
      );
      setSelectedPriority(
        priorities.find((priority) => priority.value === inputPriority) || {}
      );
      setSelectedLabel(
        labels.find((label) => label.value === inputLabel) || {}
      );
      setSelectedReminder(
        reminderOptions.find((reminder) => reminder.value === inputReminder) ||
          {}
      );
    }
  }, [editMode, inputStatus, inputPriority, inputLabel, inputReminder]);

  return (
    <form className="flex flex-col" onSubmit={editMode ? saveTask : addTask}>
      <div className="flex gap-2 w-[1100px] items-center">
        <Input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder="Add a Task..."
          required
        />
        <CustomCombox
          tasks={tasks}
          value={inputStatus}
          setValue={setInputStatus}
          open={inputStatusOpen}
          setOpen={setInputStatusOpen}
          data={statuses}
          placeholder="Select Status"
          icon={true}
          selectedOptions={selectedStatus}
          setSelectedOptions={setSelectedStatus}
        />
        <CustomCombox
          tasks={tasks}
          value={inputPriority}
          setValue={setInputPriority}
          open={priorityOpen}
          setOpen={setPriorityOpen}
          data={priorities}
          placeholder="Select Priority"
          icon={true}
          selectedOptions={selectedPriority}
          setSelectedOptions={setSelectedPriority}
        />
        <CustomCombox
          value={inputLabel}
          setValue={setInputLabel}
          open={labelOpen}
          setOpen={setLabelOpen}
          data={labels}
          placeholder="Select Label"
          selectedOptions={selectedLabel}
          setSelectedOptions={setSelectedLabel}
        />
        <CustomCombox
          value={inputReminder}
          setValue={setInputReminder}
          open={reminderOpen}
          setOpen={setReminderOpen}
          data={reminderOptions}
          placeholder="Select Reminder"
          selectedOptions={selectedReminder}
          setSelectedOptions={setSelectedReminder}
        />
      </div>
      <div className="mt-5">
        {editMode ? (
          <div className="flex gap-2">
            <Button className="w-[500px]" type="submit">
              Save
            </Button>
            <Button
              className="w-[500px]"
              variant="outline"
              type="submit"
              onClick={() => {
                setEditMode(false);
                handleInputReset();
                handleEditReset();
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div>
            <Button className="w-[1100px]" type="submit">
              Add
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export default TaskInputForm;
