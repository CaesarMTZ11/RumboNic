import { z } from "zod";

export const shareExperienceSchema = z
    .object({
        placeMode: z.enum([
            "existing",
            "new",
        ]),

        placeId: z.string().nullable(),

        newPlaceName: z.string(),
        newPlaceAddress: z.string(),

        newPlaceLatitude: z.number().nullable(),
        newPlaceLongitude: z.number().nullable(),

        rating: z
            .number()
            .int()
            .min(
                1,
                "Selecciona una calificación.",
            )
            .max(5),

        description: z
            .string()
            .trim()
            .min(
                20,
                "Describe tu experiencia con al menos 20 caracteres.",
            )
            .max(
                1500,
                "La descripción no puede superar 1,500 caracteres.",
            ),

        visitDate: z
            .string()
            .min(
                1,
                "Selecciona la fecha de tu visita.",
            ),

        photoUris: z
            .array(z.string())
            .min(
                1,
                "Agrega al menos una fotografía.",
            )
            .max(
                5,
                "Puedes agregar un máximo de cinco fotografías.",
            ),
    })
    .superRefine((data, context) => {
        if (
            data.placeMode === "existing" &&
            !data.placeId
        ) {
            context.addIssue({
                code: "custom",
                path: ["placeId"],
                message:
                    "Selecciona el lugar que visitaste.",
            });
        }

        if (data.placeMode === "new") {
            if (
                data.newPlaceName.trim().length < 3
            ) {
                context.addIssue({
                    code: "custom",
                    path: ["newPlaceName"],
                    message:
                        "Ingresa el nombre del lugar.",
                });
            }

            if (
                data.newPlaceAddress.trim().length < 5
            ) {
                context.addIssue({
                    code: "custom",
                    path: ["newPlaceAddress"],
                    message:
                        "Describe dónde se encuentra el lugar.",
                });
            }

            if (
                data.newPlaceLatitude === null ||
                data.newPlaceLongitude === null
            ) {
                context.addIssue({
                    code: "custom",
                    path: ["newPlaceLatitude"],
                    message:
                        "Debes registrar la ubicación del lugar.",
                });
            }
        }

        const visitDate = new Date(
            `${data.visitDate}T00:00:00`,
        );

        const today = new Date();

        today.setHours(23, 59, 59, 999);

        if (visitDate > today) {
            context.addIssue({
                code: "custom",
                path: ["visitDate"],
                message:
                    "La fecha de visita no puede estar en el futuro.",
            });
        }
    });

export type ShareExperienceFormData =
    z.infer<typeof shareExperienceSchema>;