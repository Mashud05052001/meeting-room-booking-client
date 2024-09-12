import { TUser } from "@/types/auth.type";
import { TReduxReponseWithoutMeta } from "@/types/reduxResponse.type";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Users
    getUser: builder.query({
      query: (payload: { email: string }) => {
        const url = payload?.email
          ? `/auth/get-user?email=${payload?.email}`
          : `/auth/get-user`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["userInfo"],
      transformResponse: (res: TReduxReponseWithoutMeta<TUser>) => {
        return res;
      },
    }),
    updateUser: builder.mutation({
      query: (payload: Record<string, unknown>) => {
        return {
          url: "/auth/update-user",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["userInfo"],
    }),
    getAllUsers: builder.query({
      query: () => {
        return {
          url: "/auth/all-users",
          method: "GET",
        };
      },
      providesTags: ["allUsers"],
      transformResponse: (res: TReduxReponseWithoutMeta<TUser[]>) => {
        return res;
      },
    }),
    updateUserRole: builder.mutation({
      query: (payload: Record<string, unknown>) => {
        return {
          url: "/auth/change-role",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["allUsers"],
    }),

    // Authentication & Authorization
    signup: builder.mutation({
      query: (payload) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: payload,
        };
      },
    }),
    login: builder.mutation({
      query: (payload) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: payload,
        };
      },
    }),
    changePassowrd: builder.mutation({
      query: (payload) => {
        return {
          url: "/auth/change-password",
          method: "POST",
          body: payload,
        };
      },
    }),
    forgetPassowrd: builder.mutation({
      query: (payload) => {
        return {
          url: "/auth/forget-password",
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useSignupMutation,
  useLoginMutation,
  useChangePassowrdMutation,
  useForgetPassowrdMutation,
} = authApi;
