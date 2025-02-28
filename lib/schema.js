import { z } from "zod";

const createAuthSchema = (isSignUp) =>
  z.object({
    name: isSignUp
      ? z.string().min(1, { message: "Name is required." }).default("")
      : z.string().optional(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address")
      .transform((value) => value.toLowerCase()),
    password: z
      .string()
      .min(1, "Password is required")
      .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/, {
        message:
          "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.",
      }),
  });

export const LoginSchema = createAuthSchema(false);
export const SignUpSchema = createAuthSchema(true);
