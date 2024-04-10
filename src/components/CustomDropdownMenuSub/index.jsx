import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Tags, Check, ShieldQuestion, CheckCircle } from "lucide-react";
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
const CustomDropdownMenuSub = ({
  data,
  index,
  type,
  taskItem,
  triggerFunction,
  setOpen,
  value,
}) => {
  // Check if the taskItem already has a status or priority
  const hasStatus =
    taskItem.status && (type === "Apply Status" || type === "Change Status");
  const hasPriority =
    taskItem.priority &&
    (type === "Apply Priority" || type === "Change Priority");
  const hasLabel =
    taskItem.label && (type === "Apply Label" || type === "Change Label");

  // Dynamically set the type based on whether the taskItem already has a status or priority
  let dynamicType = type;
  if (hasStatus) {
    dynamicType = "Change Status";
  } else if (hasPriority) {
    dynamicType = "Change Priority";
  } else if (hasLabel) {
    dynamicType = "Change Label";
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        {type === "Apply Label" ? (
          <Tags className="mr-2 h-4 w-4" />
        ) : type === "Apply Status" ? (
          <ShieldQuestion className="mr-2 h-4 w-4" />
        ) : type === "Apply Priority" ? (
          <CheckCircle className="mr-2 h-4 w-4" />
        ) : (
          ""
        )}
        {dynamicType}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="p-0 w-[150px]">
        <Command>
          {type === "Apply Label" && (
            <CommandInput placeholder="Search labels..." autoFocus={true} />
          )}
          <CommandList>
            <CommandEmpty>No such label found.</CommandEmpty>
            <CommandGroup>
              {data.map((dataItem, dataItemIndex) => (
                <CommandItem
                  className="justify-between"
                  key={dataItemIndex}
                  value={value}
                  onSelect={(value) => {
                    triggerFunction(index, value);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    {dataItem.icon && (
                      <dataItem.icon
                        className={cn("mr-2 h-4 w-4 opacity-40")}
                      />
                    )}
                    <span>{dataItem.label}</span>
                  </div>
                  <Check
                    className={cn(
                      "h-4 w-4",
                      taskItem.label === dataItem.label ||
                        taskItem.status === dataItem.label ||
                        taskItem.priority === dataItem.label
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

export default CustomDropdownMenuSub;
