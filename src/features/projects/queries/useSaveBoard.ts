import { createBoard } from "@/services/board";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export const useSaveBoard = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createBoard,
    onSuccess: (board) => {
      console.log("WWW????");
      navigate(`/board/${board.id}`);
    },
  });
};
