import { BirdBreeds, Phase } from "@/app/generated/prisma/enums";

export interface ProfileGraphProps {
    aliveBirdsArray: { age: number; alive: number }[];
    mortalityArray: { day: number; mortality: number }[];
    feedConsumedArray: { age: number; feed: number }[];
}

export interface ProfileKPIsProps {
    totalAliveBirds: number;
    totalMortality: number;
    mortalityRate: number;
    totalFeedConsumed: number;
    mortalityToday: number;
    avgBodyWeightLatest?: number;
    fcr?: number;
    numberOfSeriousDeseasesHappen: number | null;
}

export interface ProfileBatchDetailsProps {
    batchId: string | null;
    phase: Phase | null;
    age: number;
    breed: BirdBreeds | null;
    initialQuantity: number;
    batchStart: Date | null;
    expectedSell: Date | null;
    supplier: string[];
    daysToSell: number;
    mortality24H?: number;
    mortality48H?: number;
    mortality72H?: number;
}

export interface BatchCardGroupProps {
    data: {
        activeBatches: {
            grower: number;
            brooder: number;
        };
        mortalityToday: {
            grower: number;
            brooder: number;
        };
        liveBirds: {
            grower: number;
            brooder: number;
        };
        totalMortality: {
            grower: number;
            brooder: number;
        };
        birdsAge: {
            grower: number;
            brooder: number;
        };
        feedConsumedToday: {
            grower: number;
            brooder: number;
        };
    };
}

export interface BatchOverviewGridProps {
    data: {
        batchId: {
            brooder: string;
            grower: string;
        };
        liveBirds: {
            brooder: number;
            grower: number;
        };
        feedConsumed: {
            brooder: number;
            grower: number;
        };
        mortalityToday: {
            brooder: number;
            grower: number;
        };
    };
}

export type IBatch = {
    startingDate: Date;
    initialQuantity: number;
    initChicksAvgWT: number;
    breed: BirdBreeds;
    suppliers: [
        {
            id: string;
            quantity: number;
            unit_price: number;
            qualityScore: number;
            deliveryDate: Date;
        },
    ];
};
