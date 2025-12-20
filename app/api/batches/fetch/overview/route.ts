import { errorResponse, response } from "@/lib/apiResponse";
import { getBatchAgeInDays } from "@/lib/date-time";
import { throwError } from "@/lib/error";
import prisma from "@/lib/prisma";
import { BatchOverviewData, PhaseData } from "@/types/api";

export async function GET() {
    try {
        const data: BatchOverviewData = {
            brooder: {
                activeBatches: 0,
                totalMortality: 0,
                mortalityToday: 0,
                liveBirds: 0,
                feedConsumedToday: 0,
                birdsAge: null,
                batchId: null,
                batch_bussiness_id: null,
                totalFeedConsumed: 0,
            },
            grower: {
                activeBatches: 0,
                totalMortality: 0,
                mortalityToday: 0,
                liveBirds: 0,
                feedConsumedToday: 0,
                birdsAge: null,
                batchId: null,
                batch_bussiness_id: null,
                totalFeedConsumed: 0,
            },
        };

        // Date range for today
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        // Fetch active batches
        const batches = await prisma.batches.findMany({
            where: {
                status: "RUNNING",
                phase: { in: ["BROODER", "GROWER"] },
            },
        });

        if (batches.length === 0) {
            throwError({
                message: "No active batches",
                statusCode: 400,
            });
        }

        const batchIds = batches.map((b) => b.id);

        // Fetch all events in ONE query
        const events = await prisma.houseEvents.findMany({
            where: {
                batch_id: { in: batchIds },
            },
        });

        for (const batch of batches) {
            let target: PhaseData;

            if (batch.phase === "BROODER") {
                target = data.brooder;
            } else if (batch.phase === "GROWER") {
                target = data.grower;
            } else {
                // Should never happen due to query filter — defensive anyway
                continue;
            }

            target.activeBatches += 1;
            target.batchId ??= batch.id;
            target.batch_bussiness_id ??= batch.batch_id;
            target.birdsAge ??= getBatchAgeInDays(batch.starting_date);

            const batchEvents = events.filter((e) => e.batch_id === batch.id);

            const mortalities = batchEvents.filter(
                (e) => e.event_type === "MORTALITY"
            );

            const feeds = batchEvents.filter((e) => e.event_type === "FEED");

            const mortalityToday = mortalities.filter(
                (e) =>
                    e.occurred_at >= startOfToday && e.occurred_at <= endOfToday
            );

            const feedToday = feeds.filter(
                (e) =>
                    e.occurred_at >= startOfToday && e.occurred_at <= endOfToday
            );

            target.totalMortality += mortalities.reduce(
                (sum, e) => sum + (e.quantity ?? 0),
                0
            );
            target.mortalityToday += mortalityToday.reduce(
                (sum, e) => sum + (e.quantity ?? 0),
                0
            );

            target.liveBirds += batch.initial_quantity - target.totalMortality;

            target.totalFeedConsumed += feeds.reduce(
                (sum, e) => sum + (e.quantity ?? 0),
                0
            );

            target.feedConsumedToday += feedToday.reduce(
                (sum, e) => sum + (e.quantity ?? 0),
                0
            );
        }
        console.log(data);

        return response({
            message: "Batch data fetched successfully",
            data,
        });
    } catch (error) {
        return errorResponse(error);
    }
}
