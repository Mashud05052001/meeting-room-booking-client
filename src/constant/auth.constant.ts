import { TUserRoles } from "../types/auth.type";

export const userRolesArray: TUserRoles[] = ["admin", "user"];

export const userRolesObj = {
  admin: "admin",
  user: "user",
  superAdmin: "super-admin",
} as const;

export const userRolesArrayWithSuperAdmin: TUserRoles[] = [
  "admin",
  "user",
  "super-admin",
];

export const authErrorMesssages = [
  "Token is missing!",
  "Authorization Failed cause or role not matching!",
  "User not found!",
  "Authorization Failed due to invalid token",
];
