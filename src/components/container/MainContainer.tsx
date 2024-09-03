import { ReactNode } from "react";

type TMainContainerProps = {
  children: ReactNode;
  className?: string;
};

const MainContainer = ({ children, className }: TMainContainerProps) => {
  return <div className={`${className} max-w-7xl mx-auto `}>{children}</div>;
};

export default MainContainer;
