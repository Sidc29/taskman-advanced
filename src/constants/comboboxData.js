import {
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from "lucide-react";

// For selecting status
export const statuses = [
  {
    value: "In Progress",
    label: "In Progress",
    icon: ArrowUpCircle,
  },
  {
    value: "Backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "Todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "Done",
    label: "Done",
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
    value: "Personal",
    label: "Personal",
  },
  {
    value: "Urgent",
    label: "Urgent",
  },
];
