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

export const NewBoardDialog = () => {
  const { isLoading, mutate } = useSaveBoard();

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
            const name = formData.get("name")?.toString();
            const useInitialData = formData.get("initialData") === "on";

            if (!name) return;

            mutate({ author: "test", name, useInitialData });
          }}
        >
          <DialogHeader>
            <DialogTitle>New Board</DialogTitle>
          </DialogHeader>

          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              className="col-span-3"
              placeholder="Board name"
            />
          </div>
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
