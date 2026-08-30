import { explorePlaces } from "@/src/features/explore/data/exploreData";
import { ExperienceFeedFilter } from "@/src/features/experiences/types/experienceFeedTypes";
import {
    ExperienceFeedItem,
} from "@/src/features/experiences/types/experienceFeedTypes";
import { SharedExperience } from "@/src/features/experiences/types/experienceTypes";

export function mapSharedExperienceToFeedItem(
    experience: SharedExperience,
): ExperienceFeedItem {
    const existingPlace = explorePlaces.find(
        (place) =>
            place.id === experience.placeId,
    );

    const newPlaceAddress =
        experience.newPlaceSuggestion?.address;

    return {
        id: experience.id,

        userName: "Mario Martínez",

        placeId: experience.placeId,
        placeName: experience.placeName,

        municipality:
            existingPlace?.municipality ??
            "Lugar sugerido",

        department:
            existingPlace?.department ??
            newPlaceAddress ??
            "Ubicación en revisión",

        placeStatus: experience.placeStatus,

        publicationStatus:
            experience.publicationStatus,

        rating: experience.rating,
        description: experience.description,

        visitDate: experience.visitDate,
        publishedAt: experience.createdAt,

        photoUris: experience.photoUris,

        isLocalBusiness:
            existingPlace?.isLocalBusiness ??
            false,

        isSustainable:
            existingPlace?.isSustainable ??
            false,

        isMine: true,
    };
}

export function filterExperiences(
    items: ExperienceFeedItem[],
    filter: ExperienceFeedFilter,
) {
    switch (filter) {
        case "five-stars":
            return items.filter(
                (item) => item.rating === 5,
            );

        case "verified":
            return items.filter(
                (item) =>
                    item.placeStatus === "VERIFIED",
            );

        case "local":
            return items.filter(
                (item) => item.isLocalBusiness,
            );

        case "sustainable":
            return items.filter(
                (item) => item.isSustainable,
            );

        case "all":
        default:
            return items;
    }
}

export function formatExperienceFeedDate(
    isoDate: string,
) {
    return new Intl.DateTimeFormat(
        "es-NI",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        },
    ).format(new Date(isoDate));
}

export function formatVisitDate(
    dateValue: string,
) {
    return new Intl.DateTimeFormat(
        "es-NI",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        },
    ).format(
        new Date(`${dateValue}T12:00:00`),
    );
}