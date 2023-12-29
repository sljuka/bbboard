import { createRange } from "@/lib/range";
import * as storage from "./storage";
import { Board, Card, Column } from "./types";

const getInitialData = (count: number, useInitialData?: boolean) => {
  if (!useInitialData) {
    return { cards: {}, cardOrder: [] };
  }

  const cardArray = createRange(count).map((i) => {
    const id = crypto.randomUUID().slice(16);

    return {
      id,
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
  const newBoard: Board = {
    name,
    id: crypto.randomUUID().slice(16),
    author,
    ...getDefaultColumns(useInitialData),
  };

  return storage.saveBoard(newBoard);
};

// simulate async request
export const createBoardAsync = (args: Args) =>
  new Promise<Board>((r) => setTimeout(() => r(createBoard(args)), 1000));

export const getBoards = storage.getBoards;

// simulate async request
export const getBoardsAsync = () =>
  new Promise<Board[]>((r) => setTimeout(() => r(getBoards()), 200));

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
) => {
  const board = storage.getBoard(boardId);

  if (!board) return;

  const column = board.columns[columnId];

  if (!column) return;

  column.name = name;

  return storage.saveBoard(board);
};

export const deleteColumn = (boardId: string, columnId: string) => {
  const board = storage.getBoard(boardId);

  if (!board) return;

  const column = board.columns[columnId];

  if (!column || column.cardOrder.length > 0) return;

  delete board.columns[columnId];
  board.columnOrder = board.columnOrder.filter((x) => x !== columnId);

  return storage.saveBoard(board);
};

export const addCard = (
  boardId: string,
  columnId: string,
  name: string,
  description?: string
) => {
  const board = storage.getBoard(boardId);

  if (!board) return;

  const column = board.columns[columnId];

  if (!column) return;

  const newCard: Card = {
    id: crypto.randomUUID().slice(16),
    createdDate: new Date().getTime(),
    name,
    description,
    status: "open",
  };

  board.columns[columnId].cardOrder.unshift(newCard.id);
  board.columns[columnId].cards[newCard.id] = newCard;

  const newBoardState = storage.saveBoard(board);

  return { board: newBoardState, card: newCard };
};

export type CardUpdatableDetails = Omit<Card, "id" | "createdDate">;

export const updateCard = (
  boardId: string,
  columnId: string,
  cardId: string,
  cardUpdates: CardUpdatableDetails
) => {
  const board = storage.getBoard(boardId);

  if (!board) return;

  const column = board.columns[columnId];

  if (!column) return;

  const columnIncludesCard = column.cardOrder.includes(cardId);

  // remove or add from cards if archive value changed
  if (cardUpdates.archived && columnIncludesCard) {
    column.cardOrder = column.cardOrder.filter((x) => x !== cardId);
  } else if (!cardUpdates.archived && !columnIncludesCard) {
    column.cardOrder.unshift(cardId);
  }

  column.cards[cardId] = {
    ...column.cards[cardId],
    ...cardUpdates,
  };

  return storage.saveBoard(board);
};
