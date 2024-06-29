import { z } from "zod";

const userSignupSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(50, "Username cannot be more than 50 characters long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password cannot be more than 20 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@#$^&*+=!.]/,
        "Password must contain at least one special character (@#$^&*+=!)"
      ),
    confirmPassword: z.string().min(1, "Confirm password cannot be empty")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default userSignupSchema;
