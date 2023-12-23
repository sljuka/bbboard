import { useQuery } from "react-query";
import { getBoards } from "@/services/board";
import { Board } from "@/services/types";

export const useBoards = () => {
  // simulate async request
  return useQuery(
    "boards",
    () =>
      new Promise<Board[]>((r) =>
        setTimeout(() => r(getBoards().filter(Boolean) as Board[]), 2000)
      )
  );
};
