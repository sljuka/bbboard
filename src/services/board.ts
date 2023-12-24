import { createRange } from "@/lib/range";
import * as storage from "./storage";
import { Board, Column } from "./types";

const getInitialData = (count: number) => {
  const cardArray = createRange(count).map(() => {
    const id = crypto.randomUUID();

    return {
      id: `id:${id}`,
      name: `item ${id}`,
      status: "open",
      createdDate: new Date().getTime(),
      description: "test",
    };
  });

  const cards = cardArray.reduce((acc, x) => ({ ...acc, [x.id]: x }), {});
  const cardOrder = cardArray.map((x) => x.id);

  return {
    cards,
    cardOrder,
  };
};

const getDefaultColumns = () => {
  const id1 = crypto.randomUUID();
  const id2 = crypto.randomUUID();
  const id3 = crypto.randomUUID();
  return {
    columns: {
      [id1]: {
        id: id1,
        name: "Todo",
        ...getInitialData(10),
      },
      [id2]: {
        id: id2,
        name: "In progress",
        ...getInitialData(100),
      },
      [id3]: {
        id: id3,
        name: "Done",
        ...getInitialData(2),
      },
    },
    columnOrder: [id1, id2, id3],
  };
};

type Args = { name: string; author: string };

export const createBoard = ({ name, author }: Args) => {
  const newBoard: Board = {
    name,
    id: storage.getBoardKey(crypto.randomUUID()),
    author,
    ...getDefaultColumns(),
  };

  return storage.saveBoard(newBoard);
};

export const getBoards = storage.getBoards;

export const addColumn = (boardId: string, name: string) => {
  const board = storage.getBoard(boardId);

  if (!board) return;

  const newId = crypto.randomUUID();
  const newColumn: Column = {
    id: newId,
    name,
    cards: {},
    cardOrder: [],
  };

  const updatedBoard: Board = {
    ...board,
    columns: {
      ...board.columns,
      [newColumn.id]: newColumn,
    },
    columnOrder: [...board.columnOrder, newId],
  };

  return storage.saveBoard(updatedBoard);
};

export const updateColumnName = (
  boardId: string,
  columnId: string,
  name: string
) => storage.updateColumn(boardId, columnId, name);

export const deleteColumn = (boardId: string, columnId: string) => {
  return storage.deleteColumn(boardId, columnId);
};
