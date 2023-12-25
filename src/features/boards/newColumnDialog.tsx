import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";

type Props = { onSubmit: (name: string) => void };

export const NewColumnDialog = ({ onSubmit }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className="ml-1" variant="outline">
          <Plus />
        </Button>
      </DialogTrigger>
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
            setOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>New Column</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
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
