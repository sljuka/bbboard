import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

type Props = {
  onSubmit: (name: string) => void;
  name: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const EditColumnDialog = ({
  onSubmit,
  name,
  open,
  onOpenChange,
}: Props) => {
  const [error, setError] = React.useState<string | undefined>();

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get("name")?.toString();
            if (!name) {
              setError("Name is required");
              return;
            }

            onSubmit(name);
            onOpenChange(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit column name</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={name}
                className="col-span-3"
                placeholder="Column name"
                onChange={() => setError(undefined)}
              />
            </div>
          </div>
          {error && (
            <Label htmlFor="name" className="text-red-500">
              {error}
            </Label>
          )}
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
