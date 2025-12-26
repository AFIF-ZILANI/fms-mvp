const FARM_DAY_START_HOUR = 4; // 4:00 AM
// const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function getFarmDateTime(input: Date | string): Date {
    const d = new Date(input);

    // If before 4 AM → belongs to previous farm day
    if (d.getHours() < FARM_DAY_START_HOUR) {
        d.setDate(d.getDate() - 1);
    }

    d.setHours(0, 0, 0, 0);

    return d;
}

export function getFarmDate(date: Date | string): string {
    const d = getFarmDateTime(date);
    return d.toISOString().slice(0, 10);
}

export function getBatchAgeInDays(
    placementDate: Date | string,
    currentDate: Date = new Date()
): number {
    const startFarmDate = new Date(getFarmDate(placementDate));
    const currentFarmDate = new Date(getFarmDate(currentDate));

    const diffMs = currentFarmDate.getTime() - startFarmDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return diffDays + 1; // Day 1-based
}

export function getBatchAgeInWeeks(startDate: Date | string): number {
    return Math.floor(getBatchAgeInDays(startDate) / 7);
}
export const hoursAgo = (h: number, now: Date) => {
    const hour = new Date(now.getTime() - h * 60 * 60 * 1000);
    return hour;
};

export const formatDateInBritish = (
    date: Date | string | number | null | undefined
) => {
    // 1. Handle null or undefined cases
    if (!date) return "N/A";

    // 2. Convert to a Date object if it's a string or number
    const d = new Date(date);

    // 3. Check if the date is "Invalid Date"
    if (isNaN(d.getTime())) {
        return "Invalid Date";
    }

    return new Intl.DateTimeFormat("en-GB").format(d);
};
