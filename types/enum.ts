import { EventType, Units } from "@/app/generated/prisma/enums";

export const UnitTypeArr = Object.values(Units);
export const EventTypeArr = Object.values(EventType);
export enum HouseEventEnum {
    FEED = "FEED",
    WATER = "WATER",
    MORTALITY = "MORTALITY",
}

export enum HouseEventUnitEnum {
    KG = "KG",
    BIRD = "BIRD",
    BAG = "BAG",
    LITER = "LITER",
}
