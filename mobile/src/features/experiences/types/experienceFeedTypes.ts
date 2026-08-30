import {
    ExperiencePlaceStatus,
    ExperiencePublicationStatus,
} from "@/src/features/experiences/types/experienceTypes";

export type ExperienceFeedTab =
    | "discover"
    | "mine";

export type ExperienceFeedFilter =
    | "all"
    | "five-stars"
    | "verified"
    | "local"
    | "sustainable";

export type ExperienceFeedItem = {
    id: string;

    userName: string;
    userAvatarUrl?: string;

    placeId: string;
    placeName: string;
    municipality: string;
    department: string;

    placeStatus: ExperiencePlaceStatus;
    publicationStatus:
    ExperiencePublicationStatus;

    rating: number;
    description: string;
    visitDate: string;
    publishedAt: string;

    photoUris: string[];

    isLocalBusiness: boolean;
    isSustainable: boolean;
    isMine: boolean;
};