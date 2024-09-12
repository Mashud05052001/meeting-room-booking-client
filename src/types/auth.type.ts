export type TUserRoles = "super-admin" | "admin" | "user";

export type TTokenUser = {
  email: string;
  role: TUserRoles;
  iat: number;
  exp: number;
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: TUserRoles;
  profilePicture: string | "";
  password?: string;
  changePasswordAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type TUserRoleChange = {
  email: string;
  role: TUserRoles;
};

export type TLoginRegisterSuccess = {
  success: boolean;
  message: string;
  data: string;
  statusCode: number;
  token: string;
};

export type TForgetPasswordSuccess = Omit<TLoginRegisterSuccess, "token">;
