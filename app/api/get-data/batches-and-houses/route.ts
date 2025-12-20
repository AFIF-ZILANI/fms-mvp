import { BatchStatus } from "@/app/generated/prisma/enums";
import { formatBatchDate } from "@/components/fab-dialogs/add-weight-dialog";
import { errorResponse, response } from "@/lib/apiResponse";
import { getBatchAgeInDays } from "@/lib/date-time";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const batches = await prisma.batches.findMany({
            where: {
                status: BatchStatus.RUNNING,
            },
            select: {
                id: true,
                phase: true,
                breed: true,
                starting_date: true,
            },
        });

        const houses = await prisma.houses.findMany({
            select: {
                id: true,
                name: true,
                number: true,
                type: true,
            },
        });
        const data: {
            batches: { id: string; label: string }[];
            houses: { id: number; label: string }[];
        } = {
            batches: [],
            houses: [],
        };

        batches.map((batch) =>
            data.batches.push({
                id: batch.id,
                label: `${batch.breed} - ${getBatchAgeInDays(batch.starting_date)} Days - ${batch.phase}`,
            })
        );

        houses.map((house) =>
            data.houses.push({
                id: house.id,
                label: `${house.name} - ${house.number} - ${house.type}`,
            })
        );
        return response({
            message: "successfully data fetched",
            data,
        });
    } catch (error) {
        return errorResponse(error);
    }
}
