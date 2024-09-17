import { TChildren } from "@/types";

const CommonMarginTopContainer = ({ children, className }: TChildren) => {
  return <div className={`mt-16 ${className}`}>{children}</div>;
};

export default CommonMarginTopContainer;
