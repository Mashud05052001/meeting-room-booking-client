import { ReactNode } from "react";

type TMainContainerProps = {
  children: ReactNode;
  className?: string;
};

const CenterContainer = ({ children, className }: TMainContainerProps) => {
  return (
    <div
      className={` mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
    >
      {children}
    </div>
  );
};

export default CenterContainer;
