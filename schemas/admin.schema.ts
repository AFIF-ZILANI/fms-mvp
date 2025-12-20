import { z } from "zod";

// const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
// const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const addAdminProfileSchema = z.object({
    email: z.email("Invalid email address"),

    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long"),

    mobile: z
        .string()
        .regex(/^(?:\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),

    address: z.string().max(255, "Address is too long").optional(),

    // avatar: z
    //     .instanceof(File, { message: "Avatar must be a file" })
    //     .refine((file) => file.size > 0, "Avatar file is required")
    //     .refine(
    //         (file) => file.size <= MAX_FILE_SIZE,
    //         "Avatar must be smaller than 2MB"
    //     )
    //     .refine(
    //         (file) => ALLOWED_IMAGE_TYPES.includes(file.type),
    //         "Only JPG, PNG, or WEBP images are allowed"
    //     ),
});

export type AddAdminProfile = z.infer<typeof addAdminProfileSchema>;
