import { z } from "zod";

export const SignupValidation = z.object({
    name: z.string().min(3, { message: 'Too short' }).max(18, { message: 'Too long' }),
	username: z.string().min(3, { message: 'Too short' }).max(18, { message: 'Too long' }),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),

});