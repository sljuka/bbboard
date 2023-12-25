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
import { Textarea } from "@/components/ui/textarea";
import React from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string, description?: string) => void;
};

export const NewCardDialog = ({ onSubmit, open, onOpenChange }: Props) => {
  const [error, setError] = React.useState<string | undefined>();
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get("card-name")?.toString();
            const description = formData.get("description")?.toString();
            if (!name) {
              setError("Name is required");
              return;
            }

            onSubmit(name, description);
            onOpenChange(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>New Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="card-name">Name</Label>
              <Input
                id="card-name"
                name="card-name"
                className="col-span-3"
                placeholder="Card name"
                onChange={() => setError(undefined)}
              />
            </div>
            {error && (
              <Label htmlFor="card-name" className="text-red-500">
                {error}
              </Label>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                className="col-span-3"
                placeholder="Description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
