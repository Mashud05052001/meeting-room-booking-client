import { authErrorMesssages } from "@/constant/auth.constant";
import { TError } from "@/types";
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import axios from "axios";
import httpStatus from "http-status";
import { logout, setUser, TAuthState } from "../features/auth/auth.slice";
import { RootState } from "../store";

export const baseURL = `${import.meta.env.VITE_BACKEND_URL}`;

export const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include",
  prepareHeaders(headers, api) {
    const token = (api.getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const customBaseQuery: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (
  args,
  api,
  extraOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const { dispatch, getState } = api;

  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === httpStatus.UNAUTHORIZED) {
    const errorMessage = (result?.error as TError)?.data?.message;
    if (
      errorMessage &&
      authErrorMesssages.find((message) => errorMessage?.includes(message))
    ) {
      console.log("Authorization Error");
    } else {
      const data = await axios.post(`${baseURL}/auth/generate-access-token`);
      const token = data.data?.token;
      if (token) {
        const authUser: TAuthState = {
          token,
          user: (getState() as RootState).auth.user,
        };
        dispatch(setUser(authUser));
        result = await baseQuery(args, api, extraOptions);
      } else {
        dispatch(logout());
      }
    }
  }

  return result;
};
