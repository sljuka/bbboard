import { Card } from "@/services/types";
import {
  DraggableProvided,
  DraggableProvidedDraggableProps,
  DraggingStyle,
} from "@hello-pangea/dnd";
import clsx from "clsx";
import { Link, useParams } from "react-router-dom";

type ItemProps = {
  provided: DraggableProvided;
  item: Card;
  style?: React.CSSProperties;
  isDragging?: boolean;
};

export const Item = ({ provided, item, style, isDragging }: ItemProps) => {
  const { boardId } = useParams();

  return (
    <Link
      to={`/board/${boardId}/card/${item.id}`}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      style={getStyle({
        draggableStyle: provided.draggableProps.style,
        virtualStyle: style,
        isDragging,
      })}
      className={clsx(
        "item select-none flex flex-col gap-2 overflow-hidden p-2 border bg-white rounded-md box-border",
        isDragging && "is-dragging",
        item.status === "close" && "opacity-55"
      )}
    >
      <h4 className="text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
        {item.name}
      </h4>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
        {item.description}
      </p>
    </Link>
  );
};

type StyleArgs = {
  draggableStyle: DraggableProvidedDraggableProps["style"];
  virtualStyle?: React.CSSProperties;
  isDragging?: boolean;
};

function getStyle({ draggableStyle, virtualStyle, isDragging }: StyleArgs) {
  // If you don't want any spacing between your items
  // then you could just return this.
  // I do a little bit of magic to have some nice visual space
  // between the row items
  const combined: React.CSSProperties = {
    ...virtualStyle,
    ...draggableStyle,
  };

  // Being lazy: this is defined in our css file
  const grid = 8;

  // when dragging we want to use the draggable style for placement, otherwise use the virtual style
  const result = {
    ...combined,
    height: isDragging
      ? combined.height
      : parseInt(combined?.height?.toString() || "0") - grid,
    left: isDragging
      ? combined.left
      : parseInt(combined.left?.toString() || "0") + grid,
    width: isDragging
      ? (draggableStyle as DraggingStyle).width
      : `calc(${combined.width} - ${grid * 2}px)`,
    marginBottom: grid,
  };

  return result;
}
