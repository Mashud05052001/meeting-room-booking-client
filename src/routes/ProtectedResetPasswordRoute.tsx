import { ReactNode } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { decodeToken } from "../utils/function";

/*
1. Checking token email & direct send email is same or not
2. Check token is expire or not
3. check token iat & exp difference is 10 minutes(my token provided time) or not
*/
const ProtectedResetPasswordRoute = ({ children }: { children: ReactNode }) => {
  const [params] = useSearchParams();
  const email = params.get("email");
  const token = params.get("token");
  const decodedData = decodeToken(token as string);

  if (!email || !token || decodedData.email !== email) {
    toast.error(
      "Invalid url provided. Please open proper url from your gmail to reset password."
    );
    return <Navigate to={"/login"} />;
  }

  const isTokenExpired = decodedData.exp && decodedData.exp * 1000 < Date.now();
  if (isTokenExpired) {
    toast.error("Token has expired. Please request a new password reset link.");
    return <Navigate to={"/login"} />;
  }
  // check token iat & exp difference is 10 minutes or not
  if ((decodedData.exp - decodedData.iat) / 60 !== 10) {
    toast.error("Invalid URL. Please request a new password reset link.");
    return <Navigate to={"/login"} />;
  }

  return <div>{children}</div>;
};

export default ProtectedResetPasswordRoute;
