import { z } from "zod";
import { HouseEventEnum, HouseEventUnitEnum } from "@/types/enum";

export const addHouseEventSchema = z
    .object({
        batchId: z.string().uuid(),
        houseId: z.number().int().positive(),
        eventType: z.nativeEnum(HouseEventEnum),

        quantity: z.preprocess(
            (val) => {
                if (typeof val === "string" && val.trim() !== "") {
                    return Number(val);
                }
                return val;
            },
            z
                .number({
                    error: "Quantity is required",
                })
                .positive("Quantity must be greater than 0")
                .refine((v) => {
                    const str = v.toString();
                    const decimals = str.split(".")[1];
                    return !decimals || decimals.length <= 2;
                }, "Maximum 2 decimal places allowed")
        ),

        unit: z.nativeEnum(HouseEventUnitEnum),
    })
    .superRefine((data, ctx) => {
        if (
            data.eventType === HouseEventEnum.MORTALITY &&
            data.unit !== HouseEventUnitEnum.BIRD
        ) {
            ctx.addIssue({
                path: ["unit"],
                message: "Mortality events must use BIRD",
                code: z.ZodIssueCode.custom,
            });
        }

        if (
            data.eventType === HouseEventEnum.WATER &&
            data.unit !== HouseEventUnitEnum.LITER
        ) {
            ctx.addIssue({
                path: ["unit"],
                message: "Water events must use LITER",
                code: z.ZodIssueCode.custom,
            });
        }

        if (
            data.eventType === HouseEventEnum.FEED &&
            data.unit !== HouseEventUnitEnum.KG
        ) {
            ctx.addIssue({
                path: ["unit"],
                message: "Feed events must use KG",
                code: z.ZodIssueCode.custom,
            });
        }
    });

export type HouseEventFormInput = z.input<typeof addHouseEventSchema>;
export type HouseEventFormOutput = z.output<typeof addHouseEventSchema>;
