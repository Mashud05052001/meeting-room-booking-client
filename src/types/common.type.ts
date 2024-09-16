export type TRoom = {
  _id: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  pictures: string[];
  isDeleted: boolean;
};

export type TSlot = {
  _id: string;
  room: string | TRoom;
  date: string;
  startTime: string;
  endTime: string;
  slotDuration: number;
  isBooked: boolean;
  isDeleted: boolean;
};
export type TPartialSlot = Omit<TSlot, "room" | "date">;
export type TModifiedSlot = {
  room: string;
  roomInfo: TRoom;
  specificDateSlots: {
    date: string;
    slots: TPartialSlot[];
  }[];
}[];
export type TSlotsFlatData = {
  slotId: string;
  roomId: string;
  roomName: string;
  roomNo: number;
  pricePerSlot: number;
  capacity: number;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  isDeleted: boolean;
};

export type TBooking<T = TRoom, Q = TSlot, R = undefined> = {
  _id: string;
  room: T;
  slots: Q;
  user: R;
  date: string;
  totalAmount: number;
  isConfirmed: "confirmed" | "unconfirmed" | "canceled";
  isDeleted: boolean;
  paymentStatus: "paid" | "non-paid" | "";
  transactionId: string;
};
