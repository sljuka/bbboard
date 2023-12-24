import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { ItemList } from "./itemList";
import { Column as ColumnType } from "@/services/types";
import { ColumnDropdownMenu } from "./columnDropdown";
import { EditColumnDialog } from "./editColumnDialog";
import { NewCardDialog } from "./newCardDialog";

type Props = {
  column: ColumnType;
  index: number;
  onDelete: () => void;
  onEdit: (newName: string) => void;
  onAddCard: (name: string, description?: string) => void;
};

export const Column = React.memo(
  ({ column, index, onDelete, onEdit, onAddCard }: Props) => {
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openAddCardDialog, setOpenAddCardDialog] = React.useState(false);

    return (
      <>
        <Draggable draggableId={column.id} index={index}>
          {(provided) => (
            <div
              className="column border border-solid rounded-md bg-slate-100"
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <h3
                className=" flex justify-between items-center text-lg font-medium p-2 hover:text-gray-700"
                {...provided.dragHandleProps}
              >
                {column.name}
                <ColumnDropdownMenu
                  deleteDisabled={column.cardOrder.length > 0}
                  onDelete={onDelete}
                  onEdit={() => setOpenEditDialog(true)}
                  onAddCard={() => setOpenAddCardDialog(true)}
                />
              </h3>
              <ItemList column={column} index={index} />
            </div>
          )}
        </Draggable>
        <EditColumnDialog
          open={openEditDialog}
          onOpenChange={setOpenEditDialog}
          name={column.name}
          onSubmit={onEdit}
        />
        <NewCardDialog
          open={openAddCardDialog}
          onOpenChange={setOpenAddCardDialog}
          onSubmit={onAddCard}
        />
      </>
    );
  }
);
