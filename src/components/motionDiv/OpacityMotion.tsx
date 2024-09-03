import { ReactNode } from "react";
import { motion } from "framer-motion";

type TMotionContainerProps = {
  children: ReactNode;
  className?: string;
};

const OpacityMotion = ({ children, className }: TMotionContainerProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.5, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
};

export default OpacityMotion;
