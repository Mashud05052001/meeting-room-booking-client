/* eslint-disable @typescript-eslint/no-explicit-any */
import { TRoom } from "@/types";
import { TReduxReponseWithoutMeta } from "@/types/reduxResponse.type";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Rooms
    createRoom: builder.mutation({
      query: (payload) => {
        return {
          url: "/rooms",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["rooms"],
      transformResponse: (res: TReduxReponseWithoutMeta<TRoom>) => {
        return res;
      },
    }),
    getAllRooms: builder.query({
      query: () => {
        return {
          url: "/rooms",
          method: "GET",
        };
      },
      providesTags: ["rooms"],
      transformResponse: (res: TReduxReponseWithoutMeta<TRoom[]>) => {
        return res;
      },
    }),
    getARoom: builder.query({
      query: (id: string) => {
        return {
          url: `/rooms/${id}`,
          method: "GET",
        };
      },
      providesTags: ["rooms"],
      transformResponse: (res: TReduxReponseWithoutMeta<TRoom>) => {
        return res;
      },
    }),
    updateARoom: builder.mutation({
      query: (payload: Record<string, unknown>) => {
        const { id, data } = payload;
        return {
          url: `/rooms/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["rooms"],
      transformResponse: (res: TReduxReponseWithoutMeta<any>) => {
        return res;
      },
    }),
    deleteARoom: builder.mutation({
      query: (id: string) => {
        return {
          url: `/rooms/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["rooms"],
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useGetAllRoomsQuery,
  useGetARoomQuery,
  useUpdateARoomMutation,
  useDeleteARoomMutation,
} = authApi;
