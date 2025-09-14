import { z } from "zod";

// User Registration Validation
export const registerSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// User Login Validation
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Note Validation
export const noteSchema = z.object({
  content: z
    .string()
    .min(2, "Minimum two characters are required")
    .max(200, "Maximum 200 characters are allowed"),
});
