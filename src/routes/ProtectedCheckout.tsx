import { ReactNode } from "react";
import useUserInfoFromToken from "../hook/useUserInfoFromToken";
import { toast } from "sonner";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedCheckout = ({ children }: { children: ReactNode }) => {
  const locationState = useLocation().state;
  const userInfo = useUserInfoFromToken();
  if (!userInfo?.email) {
    toast.error("Authentication failed. Please login first");
    return <Navigate to={"/login"} />;
  }
  if (!locationState?.slotsId.length) {
    toast.error("You have to access to visit checkout page");
    return <Navigate to={"/home"} />;
  }

  return <>{children}</>;
};

export default ProtectedCheckout;
