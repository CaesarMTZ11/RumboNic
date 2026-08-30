import { explorePlaces } from "@/src/features/explore/data/exploreData";
import { MapPlace } from "@/src/features/map/types/mapTypes";

const coordinates: Record<
    string,
    {
        latitude: number;
        longitude: number;
    }
> = {
    "laguna-apoyo": {
        latitude: 11.9246,
        longitude: -86.0329,
    },

    granada: {
        latitude: 11.9299,
        longitude: -85.956,
    },

    ometepe: {
        latitude: 11.5152,
        longitude: -85.5989,
    },

    "san-juan-del-sur": {
        latitude: 11.2529,
        longitude: -85.8705,
    },

    "volcan-masaya": {
        latitude: 11.9842,
        longitude: -86.1618,
    },

    "cafe-catarina": {
        latitude: 11.9129,
        longitude: -86.0725,
    },

    "cerro-negro": {
        latitude: 12.5069,
        longitude: -86.7028,
    },

    "cafe-matagalpa": {
        latitude: 12.9256,
        longitude: -85.9175,
    },
};

export const mapPlaces: MapPlace[] =
    explorePlaces.flatMap((place) => {
        const location =
            coordinates[place.id];

        if (!location) {
            return [];
        }

        return [
            {
                ...place,
                ...location,
            },
        ];
    });