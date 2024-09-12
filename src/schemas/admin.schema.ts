import { z } from "zod";

export const addRoomValidationSchema = z.object({
  name: z.string().min(1, "Room name is required"),
  roomNo: z.number().min(0, "Room number must be a positive number"),
  floorNo: z.number().min(0, "Floor number must be a positive number"),
  capacity: z.number().min(5, "Capacity must be at least 6"),
  pricePerSlot: z.number().min(0, "Price per slot must be a positive number"),
  amenities: z
    .array(z.string())
    .min(1, "At least one amenity must be selected"),
  pictures: z
    .array(z.instanceof(File))
    .min(1, "At least one picture is required"),
});
