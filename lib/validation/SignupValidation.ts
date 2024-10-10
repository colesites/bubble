import * as z from "zod";

export const SignupValidation = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters.' }).max(18, { message: 'Name is too long' }),
	username: z.string().min(3, { message: 'Username must be at least 2 characters.' }).max(18, { message: 'Username is too long' }),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});