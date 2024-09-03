import { ReactNode } from "react";
import useUserInfoFromToken from "../hook/useUserInfoFromToken";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }: { children: ReactNode }) => {
  const userInfo = useUserInfoFromToken();
  if (!userInfo) {
    toast.error("Authentication failed. Please login first");
    return <Navigate to={"/login"} />;
  } else if (userInfo?.role === "user") {
    toast.error("Authorization failed. You have no access to this route.");
    return <Navigate to={"/"} />;
  }
  return <>{children}</>;
};

export default ProtectedAdminRoute;
