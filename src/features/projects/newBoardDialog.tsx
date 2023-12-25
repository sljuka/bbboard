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
import { useSaveBoard } from "./queries/useSaveBoard";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export const NewBoardDialog = () => {
  const { isLoading, mutate } = useSaveBoard();
  const [error, setError] = useState<string | undefined>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Board</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get("board-name")?.toString();
            const useInitialData = formData.get("initialData") === "on";

            if (!name) {
              setError("Name is required");
              return;
            }

            mutate({ author: "test", name, useInitialData });
          }}
        >
          <DialogHeader>
            <DialogTitle>New Board</DialogTitle>
          </DialogHeader>

          <div>
            <Label htmlFor="board-name">Name</Label>
            <Input
              id="board-name"
              name="board-name"
              className="col-span-3"
              placeholder="Board name"
              onChange={() => setError(undefined)}
            />
          </div>
          {error && (
            <Label htmlFor="board-name" className="text-red-500">
              {error}
            </Label>
          )}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="initialData"
              name="initialData"
              defaultChecked={false}
            />
            <label
              htmlFor="initialData"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Fill in with lots of random data (virtual list)
            </label>
          </div>
          <DialogFooter>
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
