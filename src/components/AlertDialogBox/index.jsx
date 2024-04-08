import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AlertDialogBox = ({
  open,
  setOpen,
  triggerFunction,
  type,
  description,
  buttonColorCSS,
  index,
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(!open)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className={buttonColorCSS ? buttonColorCSS : ""}
            onClick={() => {
              triggerFunction(index);
              setOpen(false);
            }}
          >
            {type}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogBox;
