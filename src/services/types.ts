export type Card = {
  id: string;
  name: string;
  description: string;
  createdDate: number;
  status: "open" | "close";
  archived?: boolean;
};

export type Column = {
  id: string;
  name: string;
  cards: Record<string, Card>;
  cardOrder: string[];
};

export type Board = {
  id: string;
  name: string;
  author: string;
  columns: Record<string, Column>;
  columnOrder: string[];
};
