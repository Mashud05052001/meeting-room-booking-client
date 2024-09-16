/* eslint-disable @typescript-eslint/no-explicit-any */
import { TModifiedSlot, TRoom, TSlot } from "@/types";
import {
  TReduxReponse,
  TReduxReponseWithoutMeta,
} from "@/types/reduxResponse.type";
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
      transformResponse: (res: TReduxReponseWithoutMeta<TModifiedSlot>) => {
        return res.data;
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
  useGetAllRoomsQuery,
  useGetARoomQuery,
  useUpdateARoomMutation,
  useDeleteARoomMutation,
  useCreateSlotMutation,
  useGetSlotsQuery,
  useGetSingleSlotQuery,
  useGetMultipleSlotsQuery,
  useDeleteASlotMutation,
  useGetAllSlotsDateOfARoomQuery,
} = authApi;
