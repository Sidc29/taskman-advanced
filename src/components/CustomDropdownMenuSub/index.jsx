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
        {type}
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
