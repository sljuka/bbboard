import {
  DraggableProvided,
  DraggableProvidedDraggableProps,
  DraggingStyle,
} from "@hello-pangea/dnd";

type ItemProps = {
  provided: DraggableProvided;
  item: { text: string; id: string };
  style?: React.CSSProperties;
  isDragging?: boolean;
};

export const Item = ({ provided, item, style, isDragging }: ItemProps) => {
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      style={getStyle({
        draggableStyle: provided.draggableProps.style,
        virtualStyle: style,
        isDragging,
      })}
      className={`item select-none flex justify-center items-center border bg-white rounded-md ${
        isDragging ? "is-dragging" : ""
      }`}
    >
      {item.text}
    </div>
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
