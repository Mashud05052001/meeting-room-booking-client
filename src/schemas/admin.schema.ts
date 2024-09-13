import { z } from "zod";

const requiredMsg = "*required";

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

export const updateRoomValidationSchema = z.object({
  name: z.string().min(1, "Room name is required").optional(),
  roomNo: z.number().min(0, "Room number must be a positive number").optional(),
  floorNo: z
    .number()
    .min(0, "Floor number must be a positive number")
    .optional(),
  capacity: z.number().min(5, "Capacity must be at least 6").optional(),
  pricePerSlot: z
    .number()
    .min(0, "Price per slot must be a positive number")
    .optional(),
  amenities: z
    .array(z.string())
    .min(1, "At least one amenity must be selected")
    .optional(),
  pictures: z
    .array(z.instanceof(File))
    .min(1, "At least one picture is required")
    .optional(),
});

export const createSlotsValidationSchema = z.object({
  room: z.string({ required_error: requiredMsg }),
  slotDuration: z.number({ required_error: requiredMsg }),
  date: z.unknown().refine((value) => value, {
    message: requiredMsg,
  }),
  time: z.array(
    z.unknown().refine((value) => value, {
      message: requiredMsg,
    })
  ),
});
