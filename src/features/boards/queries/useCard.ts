import { CardUpdatableDetails, updateCard } from "@/services/board";
import { getBoard } from "@/services/storage";
import React from "react";

const getCard = (boardId: string, cardId: string) => {
  const board = getBoard(boardId);
  if (!board) return;
  const columnIdOfCard = board.columnOrder.find(
    (columnId) =>
      Object.keys(board.columns[columnId].cards).indexOf(cardId) !== -1
  );

  if (!columnIdOfCard) return;

  return {
    board,
    column: board.columns[columnIdOfCard],
    card: board.columns[columnIdOfCard].cards[cardId],
  };
};

export const useCard = (boardId: string, cardId: string) => {
  const details = React.useMemo(
    () => getCard(boardId, cardId),
    [cardId, boardId]
  );

  const saveCard = (args: CardUpdatableDetails) => {
    if (details?.board && details.card && details.column)
      updateCard(details.board.id, details.column.id, details.card.id, args);
  };

  return { ...details, saveCard };
};
