import { Link, Navigate } from "react-router-dom";
import { useCard } from "./queries/useCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import React from "react";
import clsx from "clsx";

type Props = {
  cardId: string;
  boardId: string;
};

export const CardDetails = ({ cardId, boardId }: Props) => {
  const cardDetails = useCard(boardId, cardId);
  const { toast } = useToast();

  const [error, setError] = React.useState<string | undefined>();

  if (!cardDetails || !cardDetails.card) return <Navigate to="/" replace />;

  const card = cardDetails.card;

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name")?.toString();
        const description = formData.get("description")?.toString();
        const archive = formData.get("archive") === "on";
        const close = formData.get("close") === "on";

        if (!name) {
          setError("Name is required");
          return;
        }

        cardDetails.saveCard({
          name,
          description,
          archived: archive,
          status: close ? "close" : "open",
        });

        toast({
          title: "Card updated!",
          description: "Card has been updated successfully",
        });
      }}
    >
      <h2 className="text-2xl font-medium">Card details</h2>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          className={clsx("col-span-3", error && "border-red-500")}
          placeholder="Board name"
          defaultValue={card.name}
          onChange={() => setError(undefined)}
        />
        {error && (
          <Label htmlFor="name" className="text-red-500">
            {error}
          </Label>
        )}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          className="col-span-3"
          placeholder="Description"
          defaultValue={card.description}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="close"
          name="close"
          defaultChecked={card.status === "close"}
        />
        <label
          htmlFor="close"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Close
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="archive" name="archive" defaultChecked={card.archived} />
        <label
          htmlFor="archive"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Archive
        </label>
      </div>
      <div className="flex gap-4">
        <Button type="submit">Save</Button>
        <Link
          to={`/board/${boardId}`}
          className={buttonVariants({ variant: "outline" })}
        >
          Back to board
        </Link>
      </div>
      <div></div>
    </form>
  );
};
