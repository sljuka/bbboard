import { useQuery } from "react-query";
import { getBoardsAsync } from "@/services/board";

export const useBoards = () => {
  return useQuery("boards", getBoardsAsync);
};
