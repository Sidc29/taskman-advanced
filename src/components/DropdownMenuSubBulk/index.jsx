import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Tags, Hourglass, CheckCircle } from "lucide-react";
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
const DropdownMenuSubBulk = ({
  data,
  type,
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
          <Hourglass className="mr-2 h-4 w-4" />
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
                    triggerFunction(value);
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
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

export default DropdownMenuSubBulk;
