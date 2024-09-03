import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
    // Reset-password. Here use custom short time token so it will not be applied here
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useChangePassowrdMutation,
  useForgetPassowrdMutation,
} = authApi;
