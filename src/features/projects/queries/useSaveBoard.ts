import { createBoardAsync } from "@/services/board";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export const useSaveBoard = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createBoardAsync,
    onSuccess: (board) => {
      navigate(`/board/${board.id}`);
    },
  });
};
