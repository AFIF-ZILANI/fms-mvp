import { BirdBreeds } from "@/app/generated/prisma/enums";
import { z } from "zod";

export const supplierSchema = z.object({
    id: z.string().min(1, "Supplier is required"),
    quantity: z.number().positive(),
    unitPrice: z.number().positive(),
    qualityScore: z.number().min(0).max(10),
    deliveryDate: z.date(),
});

export const addBatchSchema = z.object({
    startingDate: z.date(),
    initChicksAvgWT: z.number().positive(),
    breed: z.enum(Object.values(BirdBreeds)),
    suppliers: z.array(supplierSchema).min(1),
});

export type AddBatchInput = z.infer<typeof addBatchSchema>;
