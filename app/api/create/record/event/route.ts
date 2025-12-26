import { errorResponse, response } from "@/lib/apiResponse";
import { getFarmDateTime } from "@/lib/date-time";
import { throwError } from "@/lib/error";
import { GetAdminID } from "@/lib/get-admin";
import prisma from "@/lib/prisma";
import { addHouseEventSchema } from "@/schemas/event.schema";
import { NextRequest } from "next/server";

// const DEV_ADMIN_PROFILE_UUID = "234dd176-e4a2-46c8-b98b-0f129f3b2944"; // only for dev env
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = addHouseEventSchema.parse(body);

        const DEV_ADMIN_PROFILE_UUID = await GetAdminID();

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

            await tx.houseEvents.create({
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
                    quantity: data.quantity,
                    unit: data.unit,
                    event_type: data.eventType,
                    farm_date: getFarmDateTime(new Date()),
                    occurred_at: new Date(),
                    created_by: {
                        connect: {
                            id: DEV_ADMIN_PROFILE_UUID,
                        },
                    },
                },
            });
        });
        return response({
            message: "Event Created successfully!",
        });
    } catch (error) {
        return errorResponse(error);
    }
}
