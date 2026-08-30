import { ExplorePlace } from "@/src/features/explore/types/exploreTypes";

export type PlaceSchedule = {
    dayNumber: number;
    dayName: string;
    opensAt: string | null;
    closesAt: string | null;
    isClosed: boolean;
    isOpen24Hours: boolean;
};

export type PlaceExperiencePreview = {
    id: string;
    userName: string;
    userAvatarUrl?: string;
    rating: number;
    description: string;
    publishedAt: string;
    visitDate?: string;
    imageUrls: string[];
};

export type PlaceDetail = ExplorePlace & {
    address: string;
    longDescription: string;
    imageUrls: string[];

    priceRange: string;
    phone?: string;
    email?: string;
    website?: string;

    latitude: number;
    longitude: number;

    highlights: string[];
    services: string[];
    recommendations: string[];

    schedules: PlaceSchedule[];
    experiences: PlaceExperiencePreview[];
};