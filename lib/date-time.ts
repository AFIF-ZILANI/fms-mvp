export function getBatchAgeInDays(
    startDate: Date | string,
    endDate?: Date | string
): number {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    // Normalize to midnight to avoid timezone bugs
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffMs = end.getTime() - start.getTime();
    return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
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
