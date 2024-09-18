/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TModifiedSlot,
  TReduxReponse,
  TReduxReponseWithoutMeta,
  TRoom,
  TSlot,
} from "@/types";

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
      query: (payload: Record<string, unknown>[]) => {
        const params = new URLSearchParams();
        for (const item of payload) {
          for (const objIdx in item) {
            params.append(objIdx, item[objIdx] as string);
          }
        }
        return {
          url: "/rooms",
          method: "GET",
          params,
        };
      },
      providesTags: ["rooms"],
      transformResponse: (res: TReduxReponse<TRoom[]>) => {
        return {
          data: res?.data?.data,
          meta: res?.data?.meta,
        };
      },
    }),
    getARoom: builder.query({
      query: (id: string) => {
        return {
          url: `/rooms/${id}`,
          method: "GET",
        };
      },
      transformResponse: (res: TReduxReponseWithoutMeta<TRoom>) => {
        return res.data;
      },
    }),
    updateARoom: builder.mutation({
      query: (payload: Record<string, unknown>) => {
        const { id, data } = payload;
        return {
          url: `/rooms/${id}`,
          method: "PUT",
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

    // Slots
    createSlot: builder.mutation({
      query: (payload) => {
        return {
          url: "/slots",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["slots"],
      transformResponse: (res: TReduxReponseWithoutMeta<TSlot>) => {
        return res;
      },
    }),
    updateSlot: builder.mutation({
      query: (payload) => {
        const { data, id } = payload;
        return {
          url: `/slots/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["slots"],
    }),
    getSlots: builder.query({
      query: (payload: Record<string, string>) => {
        const params = new URLSearchParams();
        for (const item in payload) {
          params.append(item, payload[item]);
        }
        return {
          url: "/slots",
          method: "GET",
          params,
        };
      },
      providesTags: ["slots"],
      transformResponse: (res: TReduxReponse<TModifiedSlot>) => {
        return {
          data: res?.data?.data,
          meta: res?.data?.meta,
        };
      },
    }),
    getSingleSlot: builder.query({
      query: (id: string) => {
        return {
          url: `/slots/${id}`,
          method: "GET",
        };
      },
      transformResponse: (res: TReduxReponseWithoutMeta<TSlot>) => {
        return res.data;
      },
    }),
    getMultipleSlots: builder.query({
      query: (payload: string[]) => {
        const body = { slots: payload };
        return {
          url: `/slots/multiple`,
          method: "POST",
          body,
        };
      },
      transformResponse: (
        res: TReduxReponseWithoutMeta<{ slots: TSlot[]; room: TRoom }[]>
      ) => {
        return res.data[0];
      },
    }),
    deleteASlot: builder.mutation({
      query: (id: string) => {
        return {
          url: `/slots/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["slots"],
    }),
    getAllSlotsDateOfARoom: builder.query({
      query: (id: string) => {
        return {
          url: `/slots/dates/${id}`,
          method: "GET",
        };
      },
      transformResponse: (res: TReduxReponseWithoutMeta<string[] | []>) => {
        return res.data;
      },
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useUpdateSlotMutation,
  useGetAllRoomsQuery,
  useGetARoomQuery,
  useUpdateARoomMutation,
  useDeleteARoomMutation,
  useCreateSlotMutation,
  // modified it
  useGetSlotsQuery,
  useGetSingleSlotQuery,
  useGetMultipleSlotsQuery,
  useDeleteASlotMutation,
  useGetAllSlotsDateOfARoomQuery,
} = authApi;
