import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

type TMotionContainerProps = {
  children: ReactNode;
  className?: string;
};

const OpacityMotion = ({ children, className }: TMotionContainerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default OpacityMotion;
