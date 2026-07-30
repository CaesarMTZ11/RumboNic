import { Ionicons } from "@expo/vector-icons";

export type IoniconName = keyof typeof Ionicons.glyphMap;

export type TourismCategory = {
    id: string;
    name: string;
    icon: IoniconName;
};

export type Destination = {
    id: string;
    name: string;
    department: string;
    rating: number;
    category: string;
    imageUrl: string;
    isFavorite: boolean;
};

export type LocalBusiness = {
    id: string;
    name: string;
    location: string;
    category: string;
    rating: number;
    imageUrl: string;
};