import { z } from "zod";

export const noteSchema = z.object({
  content: z
    .string()
    .min(2, "minimum two characters are required")
    .max(200, "maximum 200 characters are required"),
});

export const userSchema = z.object({
  name: z.string().min(4, "name should carry atleast four characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});