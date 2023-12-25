import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProjectsPage from "@/features/projects/projectsPage";
import { Layout } from "./components/ui/layout";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import clsx from "clsx";
import { buttonVariants } from "./components/ui/button";
import { NoMatch } from "./noMatch";

const CardPage = React.lazy(() => import("@/features/boards/cardPage"));
const BoardPage = React.lazy(() => import("@/features/boards/boardPage"));

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Link
              to="/"
              className={clsx(
                buttonVariants({ variant: "link" }),
                "list-none text-xl hover:no-underline"
              )}
            >
              BBBoards!
            </Link>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Layout>
        }
      >
        <Route index element={<ProjectsPage />} />
        <Route
          path="/board/:boardId"
          element={
            <React.Suspense fallback={<>Loading...</>}>
              <BoardPage />
            </React.Suspense>
          }
        />
        <Route
          path="/board/:boardId/card/:cardId"
          element={
            <React.Suspense fallback={<>Loading...</>}>
              <CardPage />
            </React.Suspense>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
