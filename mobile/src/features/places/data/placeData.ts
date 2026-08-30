import { explorePlaces } from "@/src/features/explore/data/exploreData";
import {
    PlaceDetail,
    PlaceExperiencePreview,
    PlaceSchedule,
} from "@/src/features/places/types/placeTypes";

type PlaceDetailExtra = Omit<
    PlaceDetail,
    | "id"
    | "name"
    | "municipality"
    | "department"
    | "description"
    | "categoryIds"
    | "categoryNames"
    | "imageUrl"
    | "rating"
    | "reviewCount"
    | "distanceKm"
    | "isVerified"
    | "isLocalBusiness"
    | "isSustainable"
>;

const standardSchedule: PlaceSchedule[] = [
    {
        dayNumber: 1,
        dayName: "Lunes",
        opensAt: "08:00",
        closesAt: "17:00",
        isClosed: false,
        isOpen24Hours: false,
    },
    {
        dayNumber: 2,
        dayName: "Martes",
        opensAt: "08:00",
        closesAt: "17:00",
        isClosed: false,
        isOpen24Hours: false,
    },
    {
        dayNumber: 3,
        dayName: "Miércoles",
        opensAt: "08:00",
        closesAt: "17:00",
        isClosed: false,
        isOpen24Hours: false,
    },
    {
        dayNumber: 4,
        dayName: "Jueves",
        opensAt: "08:00",
        closesAt: "17:00",
        isClosed: false,
        isOpen24Hours: false,
    },
    {
        dayNumber: 5,
        dayName: "Viernes",
        opensAt: "08:00",
        closesAt: "17:00",
        isClosed: false,
        isOpen24Hours: false,
    },
    {
        dayNumber: 6,
        dayName: "Sábado",
        opensAt: "07:00",
        closesAt: "18:00",
        isClosed: false,
        isOpen24Hours: false,
    },
    {
        dayNumber: 7,
        dayName: "Domingo",
        opensAt: "07:00",
        closesAt: "18:00",
        isClosed: false,
        isOpen24Hours: false,
    },
];

const defaultExperiences: PlaceExperiencePreview[] = [
    {
        id: "experience-default-1",
        userName: "Andrea López",
        rating: 5,
        description:
            "Una experiencia muy agradable. El lugar estaba limpio, bien cuidado y fue fácil llegar.",
        publishedAt: "2026-07-25T14:30:00.000Z",
        visitDate: "2026-07-20",
        imageUrls: [],
    },
];

const placeDetailExtras: Record<
    string,
    Partial<PlaceDetailExtra>
> = {
    "laguna-apoyo": {
        address:
            "Reserva Natural Laguna de Apoyo, Catarina, Masaya",

        longDescription:
            "La Laguna de Apoyo se encuentra dentro de una antigua caldera volcánica. Sus aguas, paisajes y entorno natural la convierten en uno de los destinos más atractivos para nadar, practicar kayak, descansar y disfrutar de la biodiversidad.",

        imageUrls: [
            "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=85",
        ],

        priceRange: "C$ 150 – C$ 800",
        phone: "+505 8888 0001",
        email: "info@lagunadeapoyo.demo",
        website: "https://example.com/laguna-apoyo",

        latitude: 11.9246,
        longitude: -86.0329,

        highlights: [
            "Natación en aguas volcánicas",
            "Kayak y actividades acuáticas",
            "Observación de naturaleza",
            "Miradores y fotografía",
        ],

        services: [
            "Estacionamiento",
            "Restaurantes",
            "Baños",
            "Alquiler de kayak",
        ],

        recommendations: [
            "Llega antes de las 9:00 a. m.",
            "Lleva protector solar y agua.",
            "Consulta el acceso antes de viajar.",
        ],

        schedules: standardSchedule,

        experiences: [
            {
                id: "laguna-experience-1",
                userName: "Andrea López",
                rating: 5,
                description:
                    "Excelente lugar para relajarse. Llegamos temprano y pudimos disfrutar del agua con mucha tranquilidad.",
                publishedAt: "2026-07-25T14:30:00.000Z",
                visitDate: "2026-07-20",
                imageUrls: [],
            },
            {
                id: "laguna-experience-2",
                userName: "Carlos Méndez",
                rating: 5,
                description:
                    "El paisaje es impresionante. Recomiendo llevar efectivo porque algunos establecimientos no aceptan tarjeta.",
                publishedAt: "2026-07-18T10:00:00.000Z",
                visitDate: "2026-07-13",
                imageUrls: [],
            },
        ],
    },

    granada: {
        address: "Centro Histórico, Granada, Nicaragua",

        longDescription:
            "El Centro Histórico de Granada reúne arquitectura colonial, iglesias, parques, museos, restaurantes y espacios culturales. Es una zona ideal para recorrer caminando y conocer parte de la historia y gastronomía de Nicaragua.",

        imageUrls: [
            "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1400&q=85",
        ],

        priceRange: "Acceso gratuito",
        phone: "+505 8888 0002",
        email: "turismo@granada.demo",
        website: "https://example.com/granada",

        latitude: 11.9299,
        longitude: -85.956,

        highlights: [
            "Arquitectura colonial",
            "Parque Central",
            "Gastronomía local",
            "Museos y espacios culturales",
        ],

        services: [
            "Restaurantes",
            "Hoteles",
            "Cajeros",
            "Transporte",
        ],

        recommendations: [
            "Realiza el recorrido caminando.",
            "Visita el centro durante la tarde.",
            "Lleva cámara o teléfono con batería.",
        ],

        schedules: [
            {
                dayNumber: 1,
                dayName: "Lunes",
                opensAt: null,
                closesAt: null,
                isClosed: false,
                isOpen24Hours: true,
            },
            {
                dayNumber: 2,
                dayName: "Martes",
                opensAt: null,
                closesAt: null,
                isClosed: false,
                isOpen24Hours: true,
            },
            {
                dayNumber: 3,
                dayName: "Miércoles",
                opensAt: null,
                closesAt: null,
                isClosed: false,
                isOpen24Hours: true,
            },
            {
                dayNumber: 4,
                dayName: "Jueves",
                opensAt: null,
                closesAt: null,
                isClosed: false,
                isOpen24Hours: true,
            },
            {
                dayNumber: 5,
                dayName: "Viernes",
                opensAt: null,
                closesAt: null,
                isClosed: false,
                isOpen24Hours: true,
            },
            {
                dayNumber: 6,
                dayName: "Sábado",
                opensAt: null,
                closesAt: null,
                isClosed: false,
                isOpen24Hours: true,
            },
            {
                dayNumber: 7,
                dayName: "Domingo",
                opensAt: null,
                closesAt: null,
                isClosed: false,
                isOpen24Hours: true,
            },
        ],

        experiences: [
            {
                id: "granada-experience-1",
                userName: "Mario Martínez",
                rating: 5,
                description:
                    "Una experiencia cultural completa. Hay muchos lugares para tomar fotografías y probar comida local.",
                publishedAt: "2026-07-23T16:00:00.000Z",
                visitDate: "2026-07-19",
                imageUrls: [],
            },
        ],
    },

    ometepe: {
        address: "Isla de Ometepe, Rivas, Nicaragua",

        longDescription:
            "Ometepe es una isla ubicada en el Lago Cocibolca y formada por los volcanes Concepción y Maderas. Ofrece naturaleza, senderismo, playas, arqueología, turismo rural y múltiples comunidades locales.",

        imageUrls: [
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=85",
        ],

        priceRange: "C$ 300 – C$ 3,000",
        phone: "+505 8888 0003",
        email: "turismo@ometepe.demo",
        website: "https://example.com/ometepe",

        latitude: 11.5152,
        longitude: -85.5989,

        highlights: [
            "Volcán Concepción",
            "Volcán Maderas",
            "Senderismo",
            "Turismo rural",
        ],

        services: [
            "Hospedaje",
            "Restaurantes",
            "Alquiler de vehículos",
            "Guías turísticos",
        ],

        recommendations: [
            "Reserva al menos dos días.",
            "Consulta los horarios del ferry.",
            "Contrata guías para ascensos volcánicos.",
        ],

        schedules: standardSchedule,
        experiences: defaultExperiences,
    },

    "cafe-catarina": {
        address:
            "Cercanías del Mirador de Catarina, Masaya",

        longDescription:
            "Cafetería local con productos nicaragüenses, opciones de desayuno y vistas panorámicas hacia la Laguna de Apoyo. Forma parte de la red de negocios locales promovidos por RumboNic.",

        imageUrls: [
            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=85",
        ],

        priceRange: "C$ 80 – C$ 450",
        phone: "+505 8888 0004",
        email: "hola@cafecatarina.demo",
        website: "https://example.com/cafe-catarina",

        latitude: 11.9129,
        longitude: -86.0725,

        highlights: [
            "Café nicaragüense",
            "Desayunos",
            "Vista panorámica",
            "Productos locales",
        ],

        services: [
            "Estacionamiento",
            "Baños",
            "Wi-Fi",
            "Pago en efectivo",
        ],

        recommendations: [
            "Visita durante la mañana.",
            "Pregunta por el café de temporada.",
            "Lleva efectivo.",
        ],

        schedules: standardSchedule,
        experiences: defaultExperiences,
    },
};

export function getPlaceDetailById(
    id: string,
): PlaceDetail | null {
    const basePlace = explorePlaces.find(
        (place) => place.id === id,
    );

    if (!basePlace) {
        return null;
    }

    const extra = placeDetailExtras[id];

    return {
        ...basePlace,

        address:
            extra?.address ??
            `${basePlace.municipality}, ${basePlace.department}`,

        longDescription:
            extra?.longDescription ??
            basePlace.description,

        imageUrls:
            extra?.imageUrls ?? [basePlace.imageUrl],

        priceRange:
            extra?.priceRange ?? "Consultar precio",

        phone: extra?.phone,
        email: extra?.email,
        website: extra?.website,

        latitude: extra?.latitude ?? 12.114,
        longitude: extra?.longitude ?? -86.2362,

        highlights:
            extra?.highlights ??
            basePlace.categoryNames,

        services:
            extra?.services ?? [
                "Información turística",
            ],

        recommendations:
            extra?.recommendations ?? [
                "Confirma los horarios antes de viajar.",
                "Lleva agua y protección solar.",
            ],

        schedules:
            extra?.schedules ?? standardSchedule,

        experiences:
            extra?.experiences ??
            defaultExperiences,
    };
}