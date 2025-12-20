import { z } from "zod";
import { HouseType } from "@/app/generated/prisma/enums"; // only the enum

export const addHouseSchema = z.object({
    name: z.string().min(2, "House name must be at least 2 characters"),
    type: z.nativeEnum(HouseType), // clean, fully typed
    houseNumber: z
        .number()
        .int("House number must be an integer")
        .positive("House number must be greater than 0"),
});

export type AddHouseSchema = z.infer<typeof addHouseSchema>;
