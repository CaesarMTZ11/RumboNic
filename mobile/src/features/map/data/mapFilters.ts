import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";

import { MapCategoryFilter } from "@/src/features/map/types/mapTypes";

type IoniconName =
    ComponentProps<typeof Ionicons>["name"];

export type MapFilterOption = {
    value: MapCategoryFilter;
    label: string;
    icon: IoniconName;
};

export const mapFilterOptions: MapFilterOption[] = [
    {
        value: "all",
        label: "Todos",
        icon: "apps-outline",
    },
    {
        value: "nature",
        label: "Naturaleza",
        icon: "leaf-outline",
    },
    {
        value: "culture",
        label: "Cultura",
        icon: "business-outline",
    },
    {
        value: "food",
        label: "Gastronomía",
        icon: "restaurant-outline",
    },
    {
        value: "beach",
        label: "Playas",
        icon: "water-outline",
    },
    {
        value: "volcano",
        label: "Volcanes",
        icon: "triangle-outline",
    },
    {
        value: "local",
        label: "Negocios locales",
        icon: "storefront-outline",
    },
    {
        value: "sustainable",
        label: "Sostenibles",
        icon: "leaf",
    },
];