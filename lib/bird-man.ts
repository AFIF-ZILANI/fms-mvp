import { HouseEvents } from "@/app/generated/prisma/client";
import { BreedKey, Phase, PHASE_RULES } from "@/config/bird-man.config";
import { getFarmDate } from "./date-time";

export function getPhaseByAge(
    ageInDays: number,
    breed: BreedKey = "PAKISTHANI_SONALI"
): Phase {
    if (!Number.isInteger(ageInDays) || ageInDays < 1) {
        throw new Error(`Invalid ageInDays: ${ageInDays}`);
    }

    const rules = PHASE_RULES[breed];

    if (!rules) {
        throw new Error(`Unknown breed: ${breed}`);
    }

    const rule = rules.find(
        (r) => ageInDays >= r.minDay && ageInDays <= r.maxDay
    );

    if (!rule) {
        throw new Error(
            `No phase rule found for age ${ageInDays} (breed: ${breed})`
        );
    }

    return rule.phase as Phase;
}

export function getMortalitiesToday(events: HouseEvents[]): number {
    const farmDateKey = getFarmDate(new Date());

    return events
        .filter(
            (e) =>
                e.event_type === "MORTALITY" &&
                e.farm_date.toISOString().slice(0, 10) === farmDateKey
        )
        .reduce((sum, e) => sum + e.quantity, 0);
}

export function getFeedConsumedToday(events: HouseEvents[]): number {
    const farmDateKey = getFarmDate(new Date());

    return events
        .filter(
            (e) =>
                e.event_type === "FEED" &&
                e.farm_date.toISOString().slice(0, 10) === farmDateKey
        )
        .reduce((sum, e) => sum + e.quantity, 0);
}

export function getWaterConsumedToday(events: HouseEvents[]): number {
    const farmDateKey = getFarmDate(new Date());

    return events
        .filter(
            (e) =>
                e.event_type === "WATER" &&
                e.farm_date.toISOString().slice(0, 10) === farmDateKey
        )
        .reduce((sum, e) => sum + e.quantity, 0);
}

export function formatFeedInBags(
    feedKg: number,
    bagSizeKg = 50,
    fractionDigits = 2
): string {
    if (!feedKg || feedKg <= 0) {
        return "0 Bags 0 kg";
    }

    // Normalize floating-point noise first
    const normalizedFeed = Number(feedKg.toFixed(fractionDigits));

    const bags = Math.floor(normalizedFeed / bagSizeKg);
    const remainingKg = Number(
        (normalizedFeed - bags * bagSizeKg).toFixed(fractionDigits)
    );

    return `${bags} Bags ${remainingKg} kg`;
}
