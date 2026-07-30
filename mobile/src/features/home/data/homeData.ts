import {
    Destination,
    LocalBusiness,
    TourismCategory,
} from "@/src/features/home/types/homeTypes";

export const tourismCategories: TourismCategory[] = [
    {
        id: "playas",
        name: "Playas",
        icon: "water-outline",
    },
    {
        id: "volcanes",
        name: "Volcanes",
        icon: "triangle-outline",
    },
    {
        id: "naturaleza",
        name: "Naturaleza",
        icon: "leaf-outline",
    },
    {
        id: "cultura",
        name: "Cultura",
        icon: "business-outline",
    },
    {
        id: "gastronomia",
        name: "Gastronomía",
        icon: "restaurant-outline",
    },
    {
        id: "cafe",
        name: "Cafeterías",
        icon: "cafe-outline",
    },
];

export const popularDestinations: Destination[] = [
    {
        id: "ometepe",
        name: "Isla de Ometepe",
        department: "Rivas",
        rating: 4.8,
        category: "Naturaleza",
        imageUrl:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        isFavorite: false,
    },
    {
        id: "laguna-apoyo",
        name: "Laguna de Apoyo",
        department: "Masaya",
        rating: 4.7,
        category: "Naturaleza",
        imageUrl:
            "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=900&q=80",
        isFavorite: true,
    },
    {
        id: "granada",
        name: "Granada Colonial",
        department: "Granada",
        rating: 4.9,
        category: "Cultura",
        imageUrl:
            "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=900&q=80",
        isFavorite: false,
    },
];

export const localBusinesses: LocalBusiness[] = [
    {
        id: "cafe-catarina",
        name: "Café Mirador",
        location: "Catarina, Masaya",
        category: "Cafetería local",
        rating: 4.8,
        imageUrl:
            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=700&q=80",
    },
    {
        id: "sabor-granada",
        name: "Sabores de Granada",
        location: "Granada",
        category: "Restaurante local",
        rating: 4.7,
        imageUrl:
            "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=700&q=80",
    },
];