import { ExplorePlace } from "@/src/features/explore/types/exploreTypes";

export type MapPlace = ExplorePlace & {
    latitude: number;
    longitude: number;
};

export type MapCategoryFilter =
    | "all"
    | "nature"
    | "culture"
    | "food"
    | "beach"
    | "volcano"
    | "local"
    | "sustainable";

export type UserMapLocation = {
    latitude: number;
    longitude: number;
};