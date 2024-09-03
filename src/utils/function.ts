import { jwtDecode } from "jwt-decode";
import { TTokenUser } from "../types/auth.type";

export const decodeToken = (token: string) => {
  return jwtDecode<TTokenUser>(token);
};
