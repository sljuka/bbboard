import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProjectsPage from "@/features/projects/projectsPage";
import { Layout } from "./components/ui/layout";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import clsx from "clsx";
import { buttonVariants } from "./components/ui/button";

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
              Welcome to Boards!
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
          path="/card"
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

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
