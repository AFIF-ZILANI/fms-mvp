import { BirdBreeds, Phase } from "@/app/generated/prisma/enums";
export type PhaseData = {
    activeBatches: number;
    totalMortality: number;
    mortalityToday: number;
    liveBirds: number;
    feedConsumedToday: number;
    birdsAge: number | null;
    batchId: string | null;
    batch_bussiness_id: string | null;
    totalFeedConsumed: number;
};

export type BatchOverviewData = {
    brooder: PhaseData;
    grower: PhaseData;
};

export type BatchProfileData = {
    batchId: string | null;
    batch_bussiness_id: string;
    phase: Phase | null;
    age: number;
    breed: BirdBreeds | null;
    initialQuantity: number;
    batchStart: Date | null;
    expectedSell: Date | null;
    supplier: string[];
    daysToSell: number;
    mortality24H: number;
    mortality48H: number;
    mortality72H: number;
    totalMortality: number;
    totalFeedConsumed: number;
    mortalityToday: number;
    avgBodyWeightLatest: number;
    aliveBirdsArray: { age: number; alive: number }[];
    numberOfSeriousDeseasesHappen: number | null;
    mortalityRate: number;
    fcr: number;
    totalAliveBirds: number;
    mortalityArray: {
        day: number;
        mortality: number;
    }[];
    feedConsumedArray: { age: number; feed: number }[];
    avgBodyWeightArray: {
        week: number;
        weight: number;
        age: number;
        sampleSize: number;
    }[];
};
