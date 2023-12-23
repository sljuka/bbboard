import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { Column } from "./column";
import "../../board.css";
import { useBoard } from "../projects/queries/useBoard";

type Props = {
  boardId: string;
};

export const Board = ({ boardId }: Props) => {
  const { onDragEnd, board } = useBoard(boardId);

  if (!board) return;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="select-none flex flex-col items-center">
        <Droppable
          droppableId="all-droppables"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="flex"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {board.columnOrder.map((columnId, index) => (
                <Column
                  key={columnId}
                  column={board.columns[columnId]}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};
