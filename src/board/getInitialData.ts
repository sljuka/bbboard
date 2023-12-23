let uniqueId = 0;

function getItems(count: number) {
  return Array.from({ length: count }, () => {
    const id = uniqueId++;
    return {
      id: `id:${id}`,
      text: `item ${id}`,
    };
  });
}

export type Item = {
  id: string;
  text: string;
};

export type Column = {
  id: string;
  title: string;
  items: Item[];
};

export type Data = {
  columns: Record<string, Column>;
  columnOrder: string[];
};

export const initialData: Data = {
  columns: {
    "column-0": {
      id: "column-0",
      title: "First column",
      items: getItems(1000),
    },
    "column-1": {
      id: "column-1",
      title: "Second column",
      items: getItems(1000),
    },
    "column-2": {
      id: "column-2",
      title: "Third column",
      items: getItems(1000),
    },
  },
  columnOrder: ["column-0", "column-1", "column-2"],
};
