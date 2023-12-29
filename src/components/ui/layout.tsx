import { Outlet } from "react-router";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => (
  <div className="h-screen flex flex-col">
    <h1 className="p-4 flex align-center justify-between items-center font-bold text-2xl">
      {children}
    </h1>

    <hr />

    <div className="overflow-auto">
      <Outlet />
    </div>
  </div>
);
