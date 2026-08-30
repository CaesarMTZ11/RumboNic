import { ExperienceFeedItem } from "@/src/features/experiences/types/experienceFeedTypes";

export const publicExperiences: ExperienceFeedItem[] = [
    {
        id: "public-experience-1",

        userName: "Andrea López",

        placeId: "laguna-apoyo",
        placeName: "Laguna de Apoyo",
        municipality: "Catarina",
        department: "Masaya",

        placeStatus: "VERIFIED",
        publicationStatus: "PUBLISHED",

        rating: 5,

        description:
            "Llegamos temprano y fue una excelente decisión. El agua estaba tranquila y pudimos disfrutar del paisaje sin demasiadas personas. Recomiendo llevar efectivo, agua y protector solar.",

        visitDate: "2026-07-20",
        publishedAt: "2026-07-25T14:30:00.000Z",

        photoUris: [
            "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=1200&q=85",
        ],

        isLocalBusiness: false,
        isSustainable: true,
        isMine: false,
    },

    {
        id: "public-experience-2",

        userName: "Carlos Méndez",

        placeId: "granada",
        placeName: "Centro Histórico de Granada",
        municipality: "Granada",
        department: "Granada",

        placeStatus: "VERIFIED",
        publicationStatus: "PUBLISHED",

        rating: 5,

        description:
            "Recorrimos el centro caminando durante la tarde. La arquitectura, los parques y la gastronomía hacen que sea fácil pasar varias horas descubriendo lugares nuevos.",

        visitDate: "2026-07-18",
        publishedAt: "2026-07-22T16:15:00.000Z",

        photoUris: [
            "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=85",
        ],

        isLocalBusiness: false,
        isSustainable: true,
        isMine: false,
    },

    {
        id: "public-experience-3",

        userName: "María Fernanda Ruiz",

        placeId: "cafe-catarina",
        placeName: "Café Mirador Catarina",
        municipality: "Catarina",
        department: "Masaya",

        placeStatus: "VERIFIED",
        publicationStatus: "PUBLISHED",

        rating: 4,

        description:
            "El café estaba muy bueno y la vista hacia la laguna hace que la visita sea especial. También tienen productos elaborados por emprendedores locales.",

        visitDate: "2026-07-12",
        publishedAt: "2026-07-16T11:40:00.000Z",

        photoUris: [
            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85",
        ],

        isLocalBusiness: true,
        isSustainable: true,
        isMine: false,
    },

    {
        id: "public-experience-4",

        userName: "José Hernández",

        placeId: "cerro-negro",
        placeName: "Volcán Cerro Negro",
        municipality: "León",
        department: "León",

        placeStatus: "VERIFIED",
        publicationStatus: "PUBLISHED",

        rating: 5,

        description:
            "La caminata es exigente, pero la vista desde arriba vale completamente la pena. Recomiendo zapatos adecuados, agua y seguir las indicaciones del guía.",

        visitDate: "2026-07-08",
        publishedAt: "2026-07-11T09:20:00.000Z",

        photoUris: [
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
        ],

        isLocalBusiness: false,
        isSustainable: false,
        isMine: false,
    },

    {
        id: "public-experience-5",

        userName: "Sofía Castillo",

        placeId: "ometepe",
        placeName: "Isla de Ometepe",
        municipality: "Altagracia",
        department: "Rivas",

        placeStatus: "VERIFIED",
        publicationStatus: "PUBLISHED",

        rating: 5,

        description:
            "Ometepe tiene mucho más de lo que se puede conocer en un solo día. Visitamos comunidades locales, probamos comida tradicional y recorrimos varios espacios naturales.",

        visitDate: "2026-06-29",
        publishedAt: "2026-07-03T15:10:00.000Z",

        photoUris: [
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
        ],

        isLocalBusiness: false,
        isSustainable: true,
        isMine: false,
    },
];
