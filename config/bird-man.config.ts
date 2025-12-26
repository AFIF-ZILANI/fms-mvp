export const PHASE_RULES = {
    PAKISTHANI_SONALI: [
        { phase: "BROODER", minDay: 1, maxDay: 21 },
        { phase: "GROWER", minDay: 22, maxDay: 56 },
        { phase: "FINISHER", minDay: 57, maxDay: 999 },
    ],
};

export type Phase = "BROODER" | "GROWER" | "FINISHER";

export type PhaseRule = {
    phase: Phase;
    minDay: number;
    maxDay: number;
};

export type BreedKey = keyof typeof PHASE_RULES;
