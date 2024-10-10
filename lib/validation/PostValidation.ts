import * as z from "zod";

export const PostValidation = z.object({
    caption: z.string().min(3, { message: "Minimum 3 characters." }).max(2200, { message: "Maximum 2,200 characters" }),
    file: z.optional(z.custom<File[]>()),
    location: z.optional(z.string().min(3, { message: "Minimum 3 characters." }).max(1000, { message: "Maximum 1000 characters." })),
    tags: z.optional(z.string()),
});



// import { z } from 'zod';

// const caption = z.string()
//   .min(3, { message: "Minimum 3 characters." })
//   .max(2200, { message: "Maximum 2,200 characters" })
//   .refine((value) => {
//     // Check if the value contains any of these prohibited names
//     const prohibitedNames = ['John', 'Jane', 'Bob'];
//     return !prohibitedNames.includes(value);
//   }, {
//     message: "Caption cannot contain John, Jane, or Bob."
//   });