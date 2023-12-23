import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { areEqual } from "react-window";
import { Item } from "./item";

type RowProps = {
  data: { id: string; text: string }[];
  index: number;
  style: React.CSSProperties;
};

// Recommended react-window performance optimisation: memoize the row render function
// Things are still pretty fast without this, but I am a sucker for making things faster
export const Row = React.memo((props: RowProps) => {
  const { data: items, index, style } = props;
  const item = items[index];

  // We are rendering an extra item for the placeholder
  if (!item) {
    return null;
  }

  return (
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {(provided) => <Item provided={provided} item={item} style={style} />}
    </Draggable>
  );
}, areEqual);
