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

// // Reminder options
export const reminderOptions = [
  {
    value: "5 seconds",
    label: "5 seconds",
  },
  {
    value: "5 minutes",
    label: "5 minutes",
  },
  {
    value: "10 minutes",
    label: "10 minutes",
  },
  {
    value: "15 minutes",
    label: "15 minutes",
  },
  {
    value: "30 minutes",
    label: "30 minutes",
  },
  {
    value: "1 hours",
    label: "1 hours",
  },
  {
    value: "3 hours",
    label: "3 hours",
  },
  {
    value: "6 hours",
    label: "6 hours",
  },
  {
    value: "12 hours",
    label: "12 hours",
  },
  {
    value: "1 days",
    label: "1 days",
  },
];
