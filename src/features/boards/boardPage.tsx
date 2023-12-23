import { Page } from "@/components/ui/page";
import { Navigate, useParams } from "react-router-dom";
import { Board } from "./board";

const BoardPage = () => {
  const { boardId } = useParams();

  if (!boardId) return <Navigate to="/" replace />;

  return (
    <Page>
      <Board boardId={boardId} />
      {/* <DragOverlay>
        {activeId ? (
          <div style={{ backgroundColor: "pink" }}>Hiii {activeId}</div>
        ) : null}
      </DragOverlay> */}
    </Page>
  );
};

export default BoardPage;
