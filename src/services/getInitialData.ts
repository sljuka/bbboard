import { Board } from "./types";

let uniqueId = 0;

function getItems(count: number) {
  const cardArray = Array.from({ length: count }, () => {
    const id = uniqueId++;
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
}

export const initialData: Board = {
  id: "test",
  name: "test",
  author: "test",
  columns: {
    "column-0": {
      id: "column-0",
      name: "First column",
      ...getItems(1000),
    },
    "column-1": {
      id: "column-1",
      name: "Second column",
      ...getItems(1000),
    },
    "column-2": {
      id: "column-2",
      name: "Third column",
      ...getItems(1000),
    },
  },
  columnOrder: ["column-0", "column-1", "column-2"],
};
