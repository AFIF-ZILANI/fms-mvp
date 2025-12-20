import { EventType } from "@/app/generated/prisma/enums";
import { errorResponse, response } from "@/lib/apiResponse";
import { getBatchAgeInDays, hoursAgo } from "@/lib/date-time";
import { throwError } from "@/lib/error";
import prisma from "@/lib/prisma";
import { BatchProfileData } from "@/types/api";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const batchId = searchParams.get("batchId");
        const now = new Date();

        if (!batchId) {
            throwError({
                message: "batchId is required",
                statusCode: 400,
            });
        }
        const [batch, events, suppliers, weightRec] = await Promise.all([
            prisma.batches.findFirst({
                where: { id: batchId },
            }),

            prisma.houseEvents.findMany({
                where: { batch_id: batchId },
                orderBy: { occurred_at: "desc" },
            }),

            prisma.batchSuppliers.findMany({
                where: { batch_id: batchId },
                include: {
                    supplier: {
                        include: {
                            profile: {
                                select: { name: true },
                            },
                        },
                    },
                },
            }),
            prisma.weightRecords.findMany({
                where: {
                    batch_id: batchId,
                },
                orderBy: {
                    created_at: "desc",
                },
            }),
        ]);

        if (!batch) {
            throwError({
                message: "Batch not found",
                statusCode: 404,
            });
        }

        // ---------- BASE DATA ----------
        const data: BatchProfileData = {
            batchId: batch.id,
            batch_bussiness_id: batch.batch_id,
            phase: batch.phase,
            age: getBatchAgeInDays(batch.starting_date),
            breed: batch.breed,
            initialQuantity: batch.initial_quantity,
            batchStart: batch.starting_date,
            expectedSell: batch.expected_selling_date,
            supplier: suppliers.map((s) => s.supplier.profile.name),
            totalAliveBirds: 0,
            avgBodyWeightLatest: 0,
            aliveBirdsArray: [],
            daysToSell: batch.expected_selling_date
                ? Math.max(
                      0,
                      Math.ceil(
                          (batch.expected_selling_date.getTime() -
                              now.getTime()) /
                              (1000 * 60 * 60 * 24)
                      )
                  )
                : 0,

            mortality24H: 0,
            mortality48H: 0,
            mortality72H: 0,
            totalMortality: 0,
            mortalityToday: 0,
            totalFeedConsumed: 0,
            numberOfSeriousDeseasesHappen: null,
            mortalityRate: 0,
            fcr: 0,
            avgBodyWeightArray: [],
            mortalityArray: [],
            feedConsumedArray: [],
        };

        // ---------- AGGREGATION ----------
        const mortalityByDay: { day: number; mortality: number }[] = [];
        const feedConsumedByDay: { age: number; feed: number }[] = [];
        let totalFeed = 0;
        let totalMortality = 0;

        for (const e of events) {
            if (e.event_type === EventType.MORTALITY) {
                const qty = e.quantity ?? 0;
                totalMortality += qty;

                const ageDay = getBatchAgeInDays(
                    batch.starting_date,
                    e.occurred_at
                );

                if (
                    mortalityByDay.length &&
                    ageDay === mortalityByDay[mortalityByDay.length - 1].day
                ) {
                    mortalityByDay[mortalityByDay.length - 1].mortality += qty;
                } else {
                    mortalityByDay.push({
                        day: ageDay,
                        mortality: qty,
                    });
                }

                if (e.occurred_at >= hoursAgo(24, now))
                    data.mortality24H += qty;
                if (e.occurred_at >= hoursAgo(48, now))
                    data.mortality48H += qty;
                if (e.occurred_at >= hoursAgo(72, now))
                    data.mortality72H += qty;
                if (e.occurred_at >= hoursAgo(24, now))
                    data.mortalityToday += qty;
            }

            if (e.event_type === EventType.FEED) {
                const qty = e.quantity ?? 0;
                totalFeed += qty;

                const ageDay = getBatchAgeInDays(
                    batch.starting_date,
                    e.occurred_at
                );

                if (
                    feedConsumedByDay.length &&
                    ageDay ===
                        feedConsumedByDay[feedConsumedByDay.length - 1].age
                ) {
                    feedConsumedByDay[feedConsumedByDay.length - 1].feed += qty;
                } else {
                    feedConsumedByDay.push({ age: ageDay, feed: qty });
                }
            }
        }

        data.totalMortality = totalMortality;
        data.totalFeedConsumed = totalFeed;
        data.totalAliveBirds = batch.initial_quantity - totalMortality;

        const aliveBirdsArray: { age: number; alive: number }[] = [];
        let runningAlive = batch.initial_quantity;
        const current = new Date(batch.starting_date);
        const today = new Date();

        current.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        let age = 1;

        while (current <= today) {
            const mortalityToday =
                mortalityByDay.find((m) => m.day === age)?.mortality ?? 0;
            runningAlive -= mortalityToday;
            aliveBirdsArray.push({
                age,
                alive: runningAlive,
            });

            age += 1;
            current.setDate(current.getDate() + 1);
        }

        // ---------- DERIVED METRICS ----------
        data.mortalityRate =
            batch.initial_quantity > 0
                ? +((totalMortality / batch.initial_quantity) * 100).toFixed(2)
                : 0;

        data.fcr =
            data.totalAliveBirds > 0
                ? +(totalFeed / data.totalAliveBirds).toFixed(2)
                : 0;
        data.avgBodyWeightLatest = weightRec[0].average_wt_grams.toNumber();
        // ---------- GRAPH DATA ----------
        data.mortalityArray = mortalityByDay;
        data.aliveBirdsArray = aliveBirdsArray;
        data.feedConsumedArray = feedConsumedByDay;

        // console.log(data);

        return response({
            message: "Batch profile fetched successfully",
            data,
        });
    } catch (error) {
        return errorResponse(error);
    }
}
