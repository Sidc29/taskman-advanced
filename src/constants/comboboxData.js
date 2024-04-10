import {
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Clock,
  CheckCircle2,
  ListTodo,
  HelpCircle,
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
    value: "Backlog",
    label: "Backlog",
    icon: HelpCircle,
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
    value: "Enhancement",
    label: "Enhancement",
  },
  {
    value: "Personal",
    label: "Personal",
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
