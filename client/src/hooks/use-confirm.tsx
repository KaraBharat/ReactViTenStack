import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Props = {
  title: string;
  message: string;
};

export const useConfirm = ({
  title,
  message,
}: Props): [() => React.ReactElement, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const onHandleClose = () => {
    setPromise(null);
  };

  const onHandleConfirm = () => {
    promise?.resolve(true);
    onHandleClose();
  };

  const onHandleCancel = () => {
    promise?.resolve(false);
    onHandleClose();
  };

  const ConfirmationDialog = () => {
    return (
      <Dialog open={promise !== null} onOpenChange={onHandleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-2">
            <Button onClick={onHandleCancel} variant="outline">
              Cancel
            </Button>
            <Button
              className="bg-neutral-950 text-white hover:bg-neutral-800"
              onClick={onHandleConfirm}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return [ConfirmationDialog, confirm];
};
