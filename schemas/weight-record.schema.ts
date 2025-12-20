import z from "zod";

export const addWeightRecordSchema = z.object({
    batchId: z.string().uuid("Please select a valid batch"),
    houseId: z.number().positive("Please select a house"),
    avgWeightInGrams: z.preprocess(
        (val) => {
            if (typeof val === "string" && val !== "") {
                return Number(val);
            }
            return val;
        },
        z
            .number()
            .finite()
            .positive()
            .refine(
                (v) => Number.isInteger(v * 100),
                "Maximum 2 decimal places allowed"
            )
    ),
    sampleSize: z.number().positive("Please provide sample size"),
});

export type AvgWeightFormInput = z.input<typeof addWeightRecordSchema>;
export type AvgWeightFormOutput = z.output<typeof addWeightRecordSchema>;
