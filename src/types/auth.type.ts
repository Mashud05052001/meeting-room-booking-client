export type TUserRoles = "super-admin" | "admin" | "user";

export type TTokenUser = {
  email: string;
  role: TUserRoles;
  iat: number;
  exp: number;
};

export type TLoginRegisterSuccess = {
  success: boolean;
  message: string;
  data: string;
  statusCode: number;
  token: string;
};

export type TForgetPasswordSuccess = Omit<TLoginRegisterSuccess, "token">;
