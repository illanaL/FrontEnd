import { z } from "zod";
import type { UpdateArtisanInput } from "../type/artisan.type";

export const signupArtisanStepOneSchema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email invalide",
    ),
  phone: z.string().regex(/^0[67]\d{8}$/, "Numéro invalide"),
  password: z.string().min(8, "8 caractères minimum"),
});

export const signupArtisanStepTwoSchema = z.object({
  companyName: z.string().min(2, "Nom de société requis").optional(),
  siret: z.string().length(14, "14 chiffres").optional(),
  IBAN: z.string().min(14, "IBAN invalide").optional(),
  skills: z.array(z.object({ value: z.string().nonempty('Compétence requise') })).min(1, 'Au moins une compétence requise').optional(),
  departments: z.array(z.string()).min(1, "Au moins un département").optional(),
  address: z
    .object({
      number: z.string(),
      street: z.string(),
      zipCode: z.string(),
      city: z.string(),
      coordinates: z
        .custom<[number, number]>(
          (value) =>
            Array.isArray(value) &&
            value.length === 2 &&
            value.every((coordinate) => typeof coordinate === "number"),
        )
        .optional(),
    })
    .optional(),
});

export const signupArtisanSchema = signupArtisanStepOneSchema.extend({
  ...signupArtisanStepTwoSchema.shape,
});

export type signupArtisanStepOneData = z.infer<
  typeof signupArtisanStepOneSchema
>;
export type signupArtisanStepTwoData = UpdateArtisanInput;

export type SignupArtisanFormData = z.infer<typeof signupArtisanSchema>;
