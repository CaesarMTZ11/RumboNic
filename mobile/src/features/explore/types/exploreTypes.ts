import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";

export type IoniconName =
    ComponentProps<typeof Ionicons>["name"];

export type ExploreCategory = {
    id: string;
    name: string;
    icon: IoniconName;
};

export type ExplorePlace = {
    id: string;
    name: string;
    municipality: string;
    department: string;
    description: string;
    categoryIds: string[];
    categoryNames: string[];
    imageUrl: string;
    rating: number;
    reviewCount: number;
    distanceKm: number;
    isVerified: boolean;
    isLocalBusiness: boolean;
    isSustainable: boolean;
};

export type ExploreFilters = {
    department: string | null;
    minimumRating: number;
    onlyVerified: boolean;
    onlyLocalBusinesses: boolean;
    onlySustainable: boolean;
};