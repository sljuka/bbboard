import { Plus, Pencil, Trash, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  deleteDisabled: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onAddCard: () => void;
};

export function ColumnDropdownMenu({
  deleteDisabled,
  onDelete,
  onEdit,
  onAddCard,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="column-dropdown h-8 w-8 text-gray-500"
        >
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onAddCard} className="add-card-option">
            <Plus className="mr-2 h-4 w-4" />
            <span>Add card</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit name</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={deleteDisabled} onClick={onDelete}>
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
