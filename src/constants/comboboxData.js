import {
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Clock,
  CheckCircle2,
  ListTodo,
  PauseCircle,
  XCircle,
} from "lucide-react";

// For selecting status
export const statuses = [
  {
    value: "In Progress",
    label: "In Progress",
    icon: Clock,
  },
  {
    value: "On Hold",
    label: "On Hold",
    icon: PauseCircle,
  },
  {
    value: "Todo",
    label: "Todo",
    icon: ListTodo,
  },
  {
    value: "Completed",
    label: "Completed",
    icon: CheckCircle2,
  },
  {
    value: "Canceled",
    label: "Canceled",
    icon: XCircle,
  },
];

// For selecting priority
export const priorities = [
  {
    value: "Low",
    label: "Low",
    icon: ArrowDown,
  },
  {
    value: "Medium",
    label: "Medium",
    icon: ArrowRight,
  },
  {
    value: "High",
    label: "High",
    icon: ArrowUp,
  },
];

// For selecting labels
export const labels = [
  {
    value: "Work",
    label: "Work",
  },
  {
    value: "Home",
    label: "Home",
  },
  {
    value: "Personal",
    label: "Personal",
  },
  {
    value: "Finance",
    label: "Finance",
  },
  {
    value: "Travel",
    label: "Travel",
  },
  {
    value: "Urgent",
    label: "Urgent",
  },
];

// View options
export const viewOpts = [
  {
    value: "Status",
    label: "Status",
  },
  {
    value: "Priority",
    label: "Priority",
  },
  {
    value: "Label",
    label: "Label",
  },
];
