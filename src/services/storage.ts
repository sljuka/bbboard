import { Board } from "./types";

const getBoardKey = (id: string) => `bbboard-${id}`;

export const saveBoard = (board: Board) => {
  localStorage.setItem(getBoardKey(board.id), JSON.stringify(board));

  return board;
};

export const getBoards = () => {
  return Object.keys(localStorage)
    .filter((x) => x.startsWith("bbboard-"))
    .map((x) => getBoard(x.slice(8)));
};

export const getBoard = (boardId: string): Board | undefined => {
  const boardData = localStorage.getItem(getBoardKey(boardId));

  if (!boardData) return;

  return JSON.parse(boardData);
};

// export const moveColumn = async (
//   boardId: string,
//   columnId: string,
//   newPosition: number
// ) => {
//   const board = await getBoard(boardId);

//   if (!board) return;

//   const column = board.columns[columnId];

//   if (!column) return;

//   board.columns.splice(column.order, 1);
//   board.columns.splice(newPosition, 0, column);
//   board.columns = board.columns.map((x, i) => ({ ...x, order: i }));

//   return saveBoard(board);
// };

// export const addCard = async (
//   boardId: string,
//   columnId: string,
//   name: string,
//   description: string
// ) => {
//   const board = await getBoard(boardId);

//   if (!board) return;

//   const column = board.columns.find((x) => x.id === columnId);

//   if (!column) return;

//   const newCard: Card = {
//     id: crypto.randomUUID(),
//     name,
//     description,
//     createdDate: new Date().getTime(),
//     status: "open",
//     order: column.cards.length,
//   };

//   column.cards.push(newCard);

//   return saveBoard(board);
// };

// export const updateCard = async (
//   boardId: string,
//   columnId: string,
//   cardId: string,
//   cardUpdates: Omit<Card, "id" | "createdDate" | "order">
// ) => {
//   const board = await getBoard(boardId);

//   if (!board) return;

//   const column = board.columns.find((x) => x.id === columnId);

//   if (!column) return;

//   const card = column.cards.find((x) => x.id === cardId);

//   if (!card) return;

//   card.description = cardUpdates?.description || card.description;
//   card.name = cardUpdates?.name || card.name;
//   card.status = cardUpdates?.status || card.status;
//   card.archived =
//     cardUpdates?.archived !== undefined ? cardUpdates.archived : card.archived;

//   return saveBoard(board);
// };

// export const moveCard = async (
//   boardId: string,
//   columnId: string,
//   cardId: string,
//   newPosition: number
// ) => {
//   const board = await getBoard(boardId);

//   if (!board) return;

//   const column = board.columns.find((x) => x.id === columnId);

//   if (!column) return;

//   const card = column.cards.find((x) => x.id === cardId);

//   if (!card) return;

//   column.cards.splice(card.order, 1);
//   column.cards.splice(newPosition, 0, card);
//   column.cards = column.cards.map((x, i) => ({ ...x, order: i }));

//   return saveBoard(board);
// };
