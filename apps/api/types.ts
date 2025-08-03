import { z } from "zod";

export const AuthInput = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1)
});

export const LoginInput = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}