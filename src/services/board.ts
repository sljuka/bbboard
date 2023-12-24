import { createRange } from "@/lib/range";
import * as storage from "./storage";
import { Board, Column } from "./types";

const getInitialData = (count: number, useInitialData?: boolean) => {
  if (!useInitialData) {
    return { cards: {}, cardOrder: [] };
  }

  const cardArray = createRange(count).map((i) => {
    const id = crypto.randomUUID();

    return {
      id: `id:${id}`,
      name: `card ${i}`,
      status: "open",
      createdDate: new Date().getTime(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    };
  });

  const cards = cardArray.reduce((acc, x) => ({ ...acc, [x.id]: x }), {});
  const cardOrder = cardArray.map((x) => x.id);

  return {
    cards,
    cardOrder,
  };
};

const getDefaultColumns = (useInitialData?: boolean) => {
  const id1 = crypto.randomUUID();
  const id2 = crypto.randomUUID();
  const id3 = crypto.randomUUID();
  return {
    columns: {
      [id1]: {
        id: id1,
        name: "Todo",
        ...getInitialData(10, useInitialData),
      },
      [id2]: {
        id: id2,
        name: "In progress",
        ...getInitialData(100, useInitialData),
      },
      [id3]: {
        id: id3,
        name: "Done",
        ...getInitialData(2, useInitialData),
      },
    },
    columnOrder: [id1, id2, id3],
  };
};

type Args = { name: string; author: string; useInitialData?: boolean };

export const createBoard = ({ name, author, useInitialData }: Args) => {
  console.log("AAAA", name, useInitialData);
  const newBoard: Board = {
    name,
    id: storage.getBoardKey(crypto.randomUUID()),
    author,
    ...getDefaultColumns(useInitialData),
  };

  return storage.saveBoard(newBoard);
};

export const createBoardAsync = (args: Args) =>
  new Promise<Board>((r) => setTimeout(() => r(createBoard(args)), 2000));

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
