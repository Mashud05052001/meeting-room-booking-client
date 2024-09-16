import { baseApi } from "@/redux/api/baseApi";
import { TBooking, TReduxReponseWithoutMeta, TRoom, TSlot } from "@/types";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUserBookings: builder.query({
      query: () => {
        return {
          url: "/bookings/my-bookings",
          method: "GET",
        };
      },
      providesTags: ["bookings"],
      transformResponse: (
        res: TReduxReponseWithoutMeta<
          TBooking<TRoom, Omit<TSlot, "room" | "isBooked" | "isDeleted">[]>[]
        >
      ) => {
        return res.data;
      },
    }),
    // Only if the transaction is delete
    canceledBooking: builder.mutation({
      query: (id: string) => {
        console.log(id);
        return {
          url: `/bookings/canceled/${id}`,
          method: "PATCH",
        };
      },
    }),
  }),
});

export const { useGetSingleUserBookingsQuery, useCanceledBookingMutation } =
  bookingApi;
