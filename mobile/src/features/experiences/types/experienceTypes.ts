export type ExperiencePlaceMode =
    | "existing"
    | "new";

export type ExperiencePublicationStatus =
    | "PUBLISHED"
    | "IN_REVIEW";

export type ExperiencePlaceStatus =
    | "VERIFIED"
    | "PENDING";

export type NewPlaceSuggestion = {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
};

export type SharedExperience = {
    id: string;

    placeId: string;
    placeName: string;
    placeStatus: ExperiencePlaceStatus;

    rating: number;
    description: string;
    visitDate: string;
    photoUris: string[];

    publicationStatus:
    ExperiencePublicationStatus;

    createdAt: string;
    newPlaceSuggestion?: NewPlaceSuggestion;
};