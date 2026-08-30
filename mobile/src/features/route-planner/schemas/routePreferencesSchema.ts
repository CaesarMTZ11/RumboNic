import { z } from "zod";

import {
    companionValues,
    durationValues,
} from "@/src/features/route-planner/types/routePlannerTypes";

export const routePreferencesSchema = z.object({
    originLabel: z
        .string()
        .trim()
        .min(1, "Debes indicar tu ubicación de origen.")
        .max(150, "La ubicación es demasiado extensa."),

    latitude: z.number().nullable(),
    longitude: z.number().nullable(),

    duration: z.enum(durationValues),

    budget: z
        .number()
        .min(300, "El presupuesto mínimo es C$ 300.")
        .max(10000, "El presupuesto máximo permitido es C$ 10,000."),

    people: z
        .number()
        .int()
        .min(1, "Debe viajar al menos una persona.")
        .max(10, "El máximo permitido es de 10 personas."),

    companion: z.enum(companionValues),

    interests: z
        .array(z.string())
        .min(1, "Selecciona al menos un interés.")
        .max(5, "Selecciona un máximo de cinco intereses."),
});

export type RoutePreferencesFormData = z.infer<
    typeof routePreferencesSchema
>;