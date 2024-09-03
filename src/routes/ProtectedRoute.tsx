import { ReactNode } from "react";
import useUserInfoFromToken from "../hook/useUserInfoFromToken";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const userInfo = useUserInfoFromToken();
  if (!userInfo?.email) {
    toast.error("Authentication failed. Please login first");
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
