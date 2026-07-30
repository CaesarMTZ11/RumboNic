export const durationValues = [
    "half-day",
    "one-day",
    "weekend",
    "several-days",
] as const;

export const companionValues = [
    "solo",
    "couple",
    "family",
    "friends",
] as const;

export type DurationValue = (typeof durationValues)[number];
export type CompanionValue = (typeof companionValues)[number];

export type RoutePreferences = {
    originLabel: string;
    latitude: number | null;
    longitude: number | null;
    duration: DurationValue;
    budget: number;
    people: number;
    companion: CompanionValue;
    interests: string[];
};