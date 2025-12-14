import { BirdBreeds } from "@/app/generated/prisma/enums";

export interface ProfileGraphProps {
    data: {
        aliveBirds: number[];
        mortalityData: { day: number; mortality: number }[];
        feedConsumedArray?: number[];
    };
}

export interface ProfileKPIsProps {
    data: {
        liveBirds: number;
        totalMortality: number;
        mortalityRate: number;
        totalFeedConsumed: number;
        mortalityToday: number;
        avgBodyWeightLatest?: number;
        fcr?: number;
        numberOfSeriousDeseasesHappen?: number;
    };
}

export interface ProfileBatchDetailsProps {
    data: {
        batchId: string;
        status: "BROODING" | "GROWING" | "SELLING" | "CLOSED";
        age: number;
        breed: string;
        houseNo: number;
        initialQuantity: number;
        batchStart: string;
        expectedSell: string;
        supplier: string[];
        daysToSell: number;
        mortality24H?: number;
        mortality48H?: number;
        mortality72H?: number;
    };
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
