import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/, {
      message:
        "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.",
    }),
});
