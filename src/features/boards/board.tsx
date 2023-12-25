import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Column } from "./column";
import { useBoard } from "./queries/useBoard";
import { NewColumnDialog } from "./newColumnDialog";

type Props = {
  boardId: string;
};

export const Board = ({ boardId }: Props) => {
  const { onDragEnd, board, addColumn, deleteColumn, editColumn, addCard } =
    useBoard(boardId);

  if (!board) return;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h2 className="font-medium text-xl pb-4 pl-4">{board.name}</h2>
      <div className="select-none flex items-center">
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
                  onDelete={() => deleteColumn(columnId)}
                  onEdit={(newName: string) => editColumn(columnId, newName)}
                  onAddCard={(name, description) =>
                    addCard(columnId, name, description)
                  }
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <NewColumnDialog onSubmit={addColumn} />
      </div>
    </DragDropContext>
  );
};
