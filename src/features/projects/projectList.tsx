import { buttonVariants } from "@/components/ui/button";
import { useBoards } from "./queries/useBoards";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { createRange } from "@/lib/range";

export const ProjectList = () => {
  const { data, isLoading } = useBoards();

  if (data && data.length === 0)
    return <h2>No boards yet! Please make one.</h2>;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {createRange(5).map((i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 items-center">
      <h2>Boards:</h2>

      <ul className="flex gap-4">
        {data?.map((board) => (
          <li key={board.id} className="list-none p-0 m-0">
            <Link
              to={`board/${board.id}`}
              className={buttonVariants({ variant: "outline" })}
            >
              {board.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
