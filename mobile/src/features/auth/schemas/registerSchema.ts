import { z } from "zod";

export const registerSchema = z
    .object({
        fullName: z
            .string()
            .trim()
            .min(1, "El nombre completo es obligatorio.")
            .min(3, "El nombre debe tener al menos 3 caracteres.")
            .max(100, "El nombre no puede superar 100 caracteres."),

        email: z
            .string()
            .trim()
            .min(1, "El correo electrónico es obligatorio.")
            .email("Ingresa un correo electrónico válido."),

        password: z
            .string()
            .min(1, "La contraseña es obligatoria.")
            .min(6, "La contraseña debe tener al menos 6 caracteres.")
            .max(100, "La contraseña es demasiado extensa."),

        confirmPassword: z.string().min(1, "Debes confirmar la contraseña."),

        termsAccepted: z.boolean().refine((accepted) => accepted, {
            message: "Debes aceptar los términos y la política de privacidad.",
        }),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        message: "Las contraseñas no coinciden.",
        path: ["confirmPassword"],
    });

export type RegisterFormData = z.infer<typeof registerSchema>;
