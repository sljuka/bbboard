import { Page } from "@/components/ui/page";
import { useParams } from "react-router-dom";
import { Board } from "./board";
import { NoMatch } from "@/noMatch";

const BoardPage = () => {
  const { boardId } = useParams();

  console.log(boardId);
  if (!boardId) return <NoMatch />;

  return (
    <Page>
      <Board boardId={boardId} />
    </Page>
  );
};

export default BoardPage;
