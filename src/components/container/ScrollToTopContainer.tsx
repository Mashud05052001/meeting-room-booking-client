import { ReactNode, useEffect } from "react";

type TScrollToTopContainerProps = {
  children: ReactNode;
  className?: string;
  scrollBehaviour?: "smooth" | "instant";
};

const ScrollToTopContainer = ({
  children,
  className,
  scrollBehaviour = "smooth",
}: TScrollToTopContainerProps) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: scrollBehaviour,
    });
  }, [scrollBehaviour]);
  return <div className={`${className}`}>{children}</div>;
};

export default ScrollToTopContainer;
