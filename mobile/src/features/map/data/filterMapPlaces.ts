import {
    MapCategoryFilter,
    MapPlace,
} from "@/src/features/map/types/mapTypes";

export function filterMapPlaces(
    places: MapPlace[],
    filter: MapCategoryFilter,
) {
    switch (filter) {
        case "nature":
            return places.filter((place) =>
                place.categoryIds.some(
                    (category) =>
                        category === "naturaleza" ||
                        category === "aventura",
                ),
            );

        case "culture":
            return places.filter((place) =>
                place.categoryIds.includes(
                    "cultura",
                ),
            );

        case "food":
            return places.filter((place) =>
                place.categoryIds.some(
                    (category) =>
                        category === "gastronomia" ||
                        category === "cafeterias",
                ),
            );

        case "beach":
            return places.filter((place) =>
                place.categoryIds.includes(
                    "playas",
                ),
            );

        case "volcano":
            return places.filter((place) =>
                place.categoryIds.includes(
                    "volcanes",
                ),
            );

        case "local":
            return places.filter(
                (place) =>
                    place.isLocalBusiness,
            );

        case "sustainable":
            return places.filter(
                (place) =>
                    place.isSustainable,
            );

        case "all":
        default:
            return places;
    }
}