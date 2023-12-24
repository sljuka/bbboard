import { Page } from "@/components/ui/page";
import { Navigate, useParams } from "react-router-dom";
import { CardDetails } from "./cardDetails";

const CardPage = () => {
  const { boardId, cardId } = useParams();

  if (!boardId || !cardId) return <Navigate to="/" replace />;

  return (
    <Page>
      <CardDetails boardId={boardId} cardId={cardId} />
    </Page>
  );
};

export default CardPage;
