import { baseApi } from "@/redux/api/baseApi";
import {
  TBooking,
  TReduxReponseWithoutMeta,
  TRoom,
  TSlot,
  TUser,
} from "@/types";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => {
        return {
          url: "/bookings",
          method: "GET",
        };
      },
      providesTags: ["bookings"],
      transformResponse: (
        res: TReduxReponseWithoutMeta<
          TBooking<
            Pick<TRoom, "_id" | "name">,
            Pick<TSlot, "_id" | "date" | "endTime" | "startTime">[],
            Pick<TUser, "_id" | "name" | "email">
          >[]
        >
      ) => {
        return res?.data;
      },
    }),
    getSingleUserBookings: builder.query({
      query: () => {
        return {
          url: "/bookings/my-bookings",
          method: "GET",
        };
      },

      transformResponse: (
        res: TReduxReponseWithoutMeta<
          TBooking<TRoom, Omit<TSlot, "room" | "isBooked" | "isDeleted">[]>[]
        >
      ) => {
        return res.data;
      },
    }),
    updateBookingStatus: builder.mutation({
      query: (payload: {
        id: string;
        data: { isConfirmed: "confirmed" | "unconfirmed" | "canceled" };
      }) => {
        const { id, data } = payload;
        return {
          url: `/bookings/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["bookings"],
    }),
    deleteSingleBooking: builder.mutation({
      query: (id: string) => {
        return {
          url: `/bookings/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["bookings"],
    }),
    // Run only if the transaction is canceled
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

export const {
  useGetAllBookingsQuery,
  useGetSingleUserBookingsQuery,
  useUpdateBookingStatusMutation,
  useDeleteSingleBookingMutation,
  useCanceledBookingMutation,
} = bookingApi;
