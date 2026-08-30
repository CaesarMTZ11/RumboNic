import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";

import {
    CompanionValue,
    DurationValue,
} from "@/src/features/route-planner/types/routePlannerTypes";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

export type DurationOption = {
    value: DurationValue;
    label: string;
    description: string;
    icon: IoniconName;
};

export type CompanionOption = {
    value: CompanionValue;
    label: string;
    icon: IoniconName;
};

export type InterestOption = {
    value: string;
    label: string;
    icon: IoniconName;
};

export const durationOptions: DurationOption[] = [
    {
        value: "half-day",
        label: "Medio día",
        description: "4 a 6 horas",
        icon: "partly-sunny-outline",
    },
    {
        value: "one-day",
        label: "Un día",
        description: "6 a 12 horas",
        icon: "sunny-outline",
    },
    {
        value: "weekend",
        label: "Fin de semana",
        description: "2 a 3 días",
        icon: "calendar-outline",
    },
    {
        value: "several-days",
        label: "Varios días",
        description: "4 días o más",
        icon: "calendar-number-outline",
    },
];

export const companionOptions: CompanionOption[] = [
    {
        value: "solo",
        label: "Solo",
        icon: "person-outline",
    },
    {
        value: "couple",
        label: "Pareja",
        icon: "heart-outline",
    },
    {
        value: "family",
        label: "Familia",
        icon: "people-outline",
    },
    {
        value: "friends",
        label: "Amigos",
        icon: "happy-outline",
    },
];

export const interestOptions: InterestOption[] = [
    {
        value: "nature",
        label: "Naturaleza",
        icon: "leaf-outline",
    },
    {
        value: "beaches",
        label: "Playas",
        icon: "water-outline",
    },
    {
        value: "volcanoes",
        label: "Volcanes",
        icon: "triangle-outline",
    },
    {
        value: "gastronomy",
        label: "Gastronomía",
        icon: "restaurant-outline",
    },
    {
        value: "coffee",
        label: "Cafeterías",
        icon: "cafe-outline",
    },
    {
        value: "culture",
        label: "Cultura",
        icon: "business-outline",
    },
    {
        value: "adventure",
        label: "Aventura",
        icon: "trail-sign-outline",
    },
    {
        value: "photography",
        label: "Fotografía",
        icon: "camera-outline",
    },
    {
        value: "relax",
        label: "Relax",
        icon: "bed-outline",
    },
    {
        value: "local-businesses",
        label: "Negocios locales",
        icon: "storefront-outline",
    },
];