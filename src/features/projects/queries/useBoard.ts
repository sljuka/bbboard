import { getBoard, saveBoard } from "@/services/storage";
import { reorderList } from "@/lib/reorder";
import { DropResult } from "@hello-pangea/dnd";
import React from "react";
import { Board, Column } from "@/services/types";
import {
  addColumn as addColumnService,
  deleteColumn as deleteColumnService,
  updateColumnName,
} from "@/services/board";

export const useBoard = (boardId: string) => {
  const [state, setState] = React.useState<Board | undefined>(
    getBoard(boardId)
  );

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !state) {
      return;
    }

    if (result.type === "column") {
      // if the list is scrolled it looks like there is some strangeness going on
      // with react-window. It looks to be scrolling back to scroll: 0
      // I should log an issue with the project
      const columnOrder = reorderList(
        state.columnOrder,
        result.source.index,
        result.destination.index
      );

      const newState: Board = {
        ...state,
        columnOrder,
      };
      saveBoard(newState);
      setState(newState);
      return;
    }

    // reordering in same list
    if (result.source.droppableId === result.destination.droppableId) {
      const column = state.columns[result.source.droppableId];
      const items = reorderList(
        column.cardOrder,
        result.source.index,
        result.destination.index
      );

      // updating column entry
      const newState: Board = {
        ...state,
        columns: {
          ...state.columns,
          [column.id]: {
            ...column,
            cardOrder: items,
          },
        },
      };
      saveBoard(newState);
      setState(newState);
      return;
    }

    // moving between lists
    const sourceColumn = state.columns[result.source.droppableId];
    const destinationColumn = state.columns[result.destination.droppableId];
    const item =
      sourceColumn.cards[sourceColumn.cardOrder[result.source.index]];

    // 1. remove item from source column
    const newSourceColumn: Column = {
      ...sourceColumn,
    };
    newSourceColumn.cardOrder.splice(result.source.index, 1);
    delete newSourceColumn.cards[item.id];

    // 2. insert into destination column
    const newDestinationColumn: Column = {
      ...destinationColumn,
      cards: { ...destinationColumn.cards, [item.id]: item },
    };
    destinationColumn.cardOrder.splice(result.destination.index, 0, item.id);

    const newState: Board = {
      ...state,
      columns: {
        ...state.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    };

    saveBoard(newState);

    setState(newState);
  };

  const addColumn = (name: string) => {
    const board = addColumnService(boardId, name);
    setState(board);
  };

  const deleteColumn = (columnId: string) => {
    const board = deleteColumnService(boardId, columnId);
    setState(board);
  };

  const editColumn = (columnId: string, newName: string) => {
    const board = updateColumnName(boardId, columnId, newName);
    setState(board);
  };

  return {
    onDragEnd,
    addColumn,
    deleteColumn,
    editColumn,
    board: state,
  };
};
