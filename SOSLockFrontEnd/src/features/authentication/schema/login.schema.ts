import { z } from "zod";

export const loginByPhoneSchema = z.object({
  phone: z.string().regex(/^0[67]\d{8}$/, "Numéro invalide"),
  password: z.string().min(8, "8 caractères minimum"),
});

export type LoginByPhoneForm = z.infer<typeof loginByPhoneSchema>

export const loginByEmailSchema = z.object({
  email: z.email("Email invalide"),
  password: z.string().min(1, "Mot de passe obligatoire"),
});
export type LoginByEmailForm = z.infer<typeof loginByEmailSchema>;