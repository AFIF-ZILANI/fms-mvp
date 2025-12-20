import { z } from "zod";
import { EventType, Units } from "@/app/generated/prisma/enums";

export const addHouseEventSchema = z
    .object({
        batchId: z.string().uuid(), // REQUIRED
        houseId: z.number().int().positive(),
        eventType: z.nativeEnum(EventType),
        quantity: z.number().positive(),
        unit: z.nativeEnum(Units),
    })
    .superRefine((data, ctx) => {
        // Mortality → COUNT only
        if (
            data.eventType === EventType.MORTALITY &&
            data.unit !== Units.BIRD
        ) {
            ctx.addIssue({
                path: ["unit"],
                message: "Mortality events must use BIRD unit",
                code: z.ZodIssueCode.custom,
            });
        }

        // Feed → KG only
        if (
            data.eventType === EventType.FEED &&
            data.unit !== Units.KG &&
            data.unit !== Units.BAG
        ) {
            ctx.addIssue({
                path: ["unit"],
                message: "Feed events must use KG or BAG unit",
                code: z.ZodIssueCode.custom,
            });
        }

        // Water → LITER only
        if (data.eventType === EventType.WATER && data.unit !== Units.LITER) {
            ctx.addIssue({
                path: ["unit"],
                message: "Water events must use LITER unit",
                code: z.ZodIssueCode.custom,
            });
        }
    });

export type AddHouseEvent = z.infer<typeof addHouseEventSchema>;
