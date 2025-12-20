import { errorResponse, response } from "@/lib/apiResponse";
import { getBatchAgeInDays } from "@/lib/date-time";
import { throwError } from "@/lib/error";
import prisma from "@/lib/prisma";
import { addWeightRecordSchema } from "@/schemas/weight-record.schema";
import { NextRequest } from "next/server";

const DEV_ADMIN_PROFILE_UUID = "234dd176-e4a2-46c8-b98b-0f129f3b2944"; // only for dev env
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = addWeightRecordSchema.parse(body);

        await prisma.$transaction(async (tx) => {
            const validBatch = await tx.batches.findFirst({
                where: {
                    id: data.batchId,
                },
            });
            if (!validBatch) {
                throwError({
                    message: "Invalid batch Id",
                    statusCode: 400,
                });
            }

            const validHouse = await tx.houses.findFirst({
                where: {
                    id: data.houseId,
                },
            });

            if (!validHouse) {
                throwError({
                    message: "Invalid house Id",
                    statusCode: 400,
                });
            }

            await tx.weightRecords.create({
                data: {
                    batch: {
                        connect: {
                            id: data.batchId,
                        },
                    },
                    house: {
                        connect: {
                            id: data.houseId,
                        },
                    },
                    sample_size: data.sampleSize,
                    average_wt_grams: data.avgWeightInGrams,
                    age: getBatchAgeInDays(validBatch.starting_date),
                    date: new Date(),
                    measured_by: {
                        connect: {
                            id: DEV_ADMIN_PROFILE_UUID,
                        },
                    },
                },
            });
        });

        return response({
            message: "weight record added successfully!",
        });
    } catch (error) {
        return errorResponse(error);
    }
}
