type Props = {
  children: React.ReactNode;
};

export const Page = ({ children }: Props) => (
  <div className="p-4 gap-4 flex-1">{children}</div>
);
