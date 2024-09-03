import { z } from "zod";
const requiredMsg = "*required";

export const loginValidationSchema = z.object({
  email: z
    .string({ required_error: requiredMsg })
    .email({ message: "*Provide valid email" }),
  password: z
    .string({ required_error: requiredMsg })
    .min(8, { message: "*Password must be at least 8 characters" })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}[\]'"<>,.?/]).+$/, {
      message:
        "*Password must include uppercase, lowercase, and special character",
    }),
});

export const signupValidationSchema = z
  .object({
    name: z
      .string({ required_error: requiredMsg })
      .min(3, { message: "*Name must be at least 3 characters" }),
    email: z
      .string({ required_error: requiredMsg })
      .email({ message: "*Provide a valid email" }),
    password: z
      .string({ required_error: requiredMsg })
      .min(8, { message: "*Password must be at least 8 characters" })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}[\]'"<>,.?/]).+$/, {
        message:
          "*Password must include uppercase, lowercase, and special character",
      }),
    confirmPassword: z
      .string({ required_error: requiredMsg })
      .min(6, { message: "*Confirm your password" }),
    phone: z
      .string({ required_error: requiredMsg })
      .regex(/^(?:\+8801|01)[3-9]\d{8}$/, {
        message: "*Provide a valid Bangladeshi phone number",
      }),
    address: z
      .string({ required_error: requiredMsg })
      .min(4, { message: "*Address must be at least 4 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "*Passwords doesn't match",
    path: ["confirmPassword"],
  });

export const resetPasswordValidationSchema = loginValidationSchema;

export const forgetPasswordValidationSchema = z.object({
  email: z
    .string({ required_error: requiredMsg })
    .email({ message: "*Provide valid email" }),
});
