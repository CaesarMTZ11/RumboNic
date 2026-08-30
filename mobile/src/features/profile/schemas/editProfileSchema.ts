import { z } from "zod";

export const editProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(
      3,
      "Ingresa tu nombre completo.",
    )
    .max(
      120,
      "El nombre no puede superar 120 caracteres.",
    ),

  email: z
    .string()
    .trim()
    .email(
      "Ingresa un correo electrónico válido.",
    )
    .max(
      320,
      "El correo electrónico es demasiado largo.",
    ),

  municipality: z
    .string()
    .trim()
    .min(
      2,
      "Ingresa tu municipio.",
    )
    .max(100),

  department: z
    .string()
    .trim()
    .min(
      2,
      "Ingresa tu departamento.",
    )
    .max(100),
});

export type EditProfileFormData =
  z.infer<typeof editProfileSchema>;