import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { ItemList } from "./itemList";

type Props = {
  column: {
    id: string;
    items: { text: string; id: string }[];
    title: string;
  };
  index: number;
};

export const Column = React.memo(({ column, index }: Props) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="column"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h3 className="column-title" {...provided.dragHandleProps}>
            {column.title}
          </h3>
          <ItemList column={column} index={index} />
        </div>
      )}
    </Draggable>
  );
});
