type Props = {
  children: React.ReactNode;
};

export const Page = ({ children }: Props) => (
  <div className="p-4 flex flex-col gap-4 items-start flex-1">{children}</div>
);
