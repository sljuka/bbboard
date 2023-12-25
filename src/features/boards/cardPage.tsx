import { Page } from "@/components/ui/page";
import { useParams } from "react-router-dom";
import { CardDetails } from "./cardDetails";
import { NoMatch } from "@/noMatch";

const CardPage = () => {
  const { boardId, cardId } = useParams();

  if (!boardId || !cardId) return <NoMatch />;

  return (
    <Page>
      <CardDetails boardId={boardId} cardId={cardId} />
    </Page>
  );
};

export default CardPage;
