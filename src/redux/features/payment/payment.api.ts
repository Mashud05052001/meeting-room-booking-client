import { baseApi } from "@/redux/api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    makePayment: builder.mutation({
      query: (payload) => {
        return {
          url: "/payment/ap",
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const { useMakePaymentMutation } = paymentApi;
