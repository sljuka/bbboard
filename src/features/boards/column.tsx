import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { ItemList } from "./itemList";
import { Column as ColumnType } from "@/services/types";
import { ColumnDropdownMenu } from "./columnDropdown";

type Props = {
  column: ColumnType;
  index: number;
  onDelete: () => void;
};

export const Column = React.memo(({ column, index, onDelete }: Props) => {
  return (
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
            />
          </h3>
          <ItemList column={column} index={index} />
        </div>
      )}
    </Draggable>
  );
});
