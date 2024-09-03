import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { RootState } from "../store";
import httpStatus from "http-status";
import axios from "axios";
import { logout, setUser, TAuthState } from "../features/auth/auth.slice";

export const baseURL = "http://localhost:5000/api/v1";

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

  return result;
};
