import { baseApi } from "@/redux/api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteBookingPermanently: builder.mutation({
      query: (id: string) => {
        console.log(id);
        return {
          url: `/bookings/permanent/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const { useDeleteBookingPermanentlyMutation } = bookingApi;
