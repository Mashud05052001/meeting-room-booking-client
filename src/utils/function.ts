import { jwtDecode } from "jwt-decode";
import { TTokenUser } from "../types/auth.type";
import { TModifiedSlot } from "@/types";

export const decodeToken = (token: string) => {
  return jwtDecode<TTokenUser>(token);
};

export const generateSlotsFlatData = (data: TModifiedSlot) => {
  const formattedData = data.flatMap((room) =>
    room.specificDateSlots.flatMap((dateSlot) =>
      dateSlot.slots.map((slot) => ({
        slotId: slot._id,
        roomId: room.roomInfo._id,
        roomName: room.roomInfo.name,
        roomNo: room.roomInfo.roomNo,
        date: dateSlot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        pricePerSlot: room.roomInfo.pricePerSlot,
        capacity: room.roomInfo.capacity,
        isBooked: slot.isBooked,
        isDeleted: slot.isDeleted,
      }))
    )
  );
  return formattedData;
};
