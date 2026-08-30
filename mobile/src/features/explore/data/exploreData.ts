import {
    ExploreCategory,
    ExplorePlace,
} from "@/src/features/explore/types/exploreTypes";

export const exploreCategories: ExploreCategory[] = [
    {
        id: "all",
        name: "Todos",
        icon: "apps-outline",
    },
    {
        id: "naturaleza",
        name: "Naturaleza",
        icon: "leaf-outline",
    },
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
        id: "cafeterias",
        name: "Cafeterías",
        icon: "cafe-outline",
    },
    {
        id: "aventura",
        name: "Aventura",
        icon: "trail-sign-outline",
    },
];

export const exploreDepartments = [
    "Managua",
    "Masaya",
    "Granada",
    "Rivas",
    "León",
    "Chinandega",
    "Estelí",
    "Matagalpa",
];

export const explorePlaces: ExplorePlace[] = [
    {
        id: "laguna-apoyo",
        name: "Laguna de Apoyo",
        municipality: "Catarina",
        department: "Masaya",
        description:
            "Reserva natural de origen volcánico ideal para nadar, relajarse y disfrutar de actividades al aire libre.",
        categoryIds: [
            "naturaleza",
            "aventura",
        ],
        categoryNames: [
            "Naturaleza",
            "Reserva natural",
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=1000&q=80",
        rating: 4.9,
        reviewCount: 128,
        distanceKm: 37.5,
        isVerified: true,
        isLocalBusiness: false,
        isSustainable: true,
    },
    {
        id: "granada",
        name: "Centro Histórico de Granada",
        municipality: "Granada",
        department: "Granada",
        description:
            "Arquitectura colonial, cultura, gastronomía y múltiples espacios para descubrir caminando.",
        categoryIds: [
            "cultura",
            "gastronomia",
        ],
        categoryNames: [
            "Cultura",
            "Sitio histórico",
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1000&q=80",
        rating: 4.8,
        reviewCount: 246,
        distanceKm: 44.8,
        isVerified: true,
        isLocalBusiness: false,
        isSustainable: true,
    },
    {
        id: "ometepe",
        name: "Isla de Ometepe",
        municipality: "Altagracia",
        department: "Rivas",
        description:
            "Destino natural formado por los volcanes Concepción y Maderas dentro del Lago Cocibolca.",
        categoryIds: [
            "naturaleza",
            "volcanes",
            "aventura",
        ],
        categoryNames: [
            "Naturaleza",
            "Volcanes",
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
        rating: 4.9,
        reviewCount: 187,
        distanceKm: 128.4,
        isVerified: true,
        isLocalBusiness: false,
        isSustainable: true,
    },
    {
        id: "san-juan-del-sur",
        name: "San Juan del Sur",
        municipality: "San Juan del Sur",
        department: "Rivas",
        description:
            "Bahía turística reconocida por sus playas, atardeceres, gastronomía y actividades acuáticas.",
        categoryIds: [
            "playas",
            "aventura",
            "gastronomia",
        ],
        categoryNames: [
            "Playa",
            "Aventura",
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
        rating: 4.7,
        reviewCount: 312,
        distanceKm: 139.6,
        isVerified: true,
        isLocalBusiness: false,
        isSustainable: false,
    },
    {
        id: "volcan-masaya",
        name: "Parque Nacional Volcán Masaya",
        municipality: "Nindirí",
        department: "Masaya",
        description:
            "Uno de los atractivos volcánicos más importantes y accesibles de Nicaragua.",
        categoryIds: [
            "volcanes",
            "naturaleza",
            "aventura",
        ],
        categoryNames: [
            "Volcán",
            "Naturaleza",
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1000&q=80",
        rating: 4.8,
        reviewCount: 204,
        distanceKm: 22.7,
        isVerified: true,
        isLocalBusiness: false,
        isSustainable: true,
    },
    {
        id: "cafe-catarina",
        name: "Café Mirador Catarina",
        municipality: "Catarina",
        department: "Masaya",
        description:
            "Cafetería local con productos nicaragüenses y vistas panorámicas hacia la Laguna de Apoyo.",
        categoryIds: [
            "cafeterias",
            "gastronomia",
        ],
        categoryNames: [
            "Cafetería",
            "Negocio local",
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
        rating: 4.8,
        reviewCount: 76,
        distanceKm: 35.3,
        isVerified: true,
        isLocalBusiness: true,
        isSustainable: true,
    },
    {
        id: "cerro-negro",
        name: "Volcán Cerro Negro",
        municipality: "León",
        department: "León",
        description:
            "Destino de aventura conocido por sus caminatas volcánicas y la práctica de volcano boarding.",
        categoryIds: [
            "volcanes",
            "aventura",
            "naturaleza",
        ],
        categoryNames: [
            "Volcán",
            "Aventura",
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
        rating: 4.8,
        reviewCount: 164,
        distanceKm: 112.8,
        isVerified: true,
        isLocalBusiness: false,
        isSustainable: false,
    },
    {
        id: "cafe-matagalpa",
        name: "Casa del Café Matagalpa",
        municipality: "Matagalpa",
        department: "Matagalpa",
        description:
            "Negocio local dedicado al café nicaragüense, productos artesanales y experiencias gastronómicas.",
        categoryIds: [
            "cafeterias",
            "gastronomia",
        ],
        categoryNames: [
            "Cafetería",
            "Negocio local",
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1000&q=80",
        rating: 4.6,
        reviewCount: 58,
        distanceKm: 129.2,
        isVerified: false,
        isLocalBusiness: true,
        isSustainable: true,
    },
];