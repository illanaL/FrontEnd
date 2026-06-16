import { z } from "zod";

export const addressRequestSchema = z.object({
  number: z.string().min(1, "Le numéro de rue est requis"),
  street: z.string().min(1, "Le nom de la rue est requis"),
  zipCode: z.string().regex(/^\d{5}$/, "Le code postal doit contenir exactement 5 chiffres"),
  city: z.string().min(1, "La ville est requise"),
});

export const filterSchema = z.object({
  search:        z.string(),
  filterUrgent:  z.enum(["all", "urgent", "non-urgent"]),
  sortBy:        z.enum(["date", "name", "status"]),
});

export const clientRequestFormSchema = z.object({

  // Étape 1
  categoryId: z.string().min(1, "La catégorie est requise").nullable(),

  // Étape 2
  productIds: z
    .array(z.string())
    .min(1, "Vous devez sélectionner au moins une prestation"),
  isUrgent: z.boolean(),

  // Étape 3
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom est trop long"),
  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom est trop long"),
  phone: z
    .string()
    .regex(
      /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
      "Numéro de téléphone français invalide"
    ),
  email: z.email("Adresse email invalide"),
  addressRequest: addressRequestSchema,
  description: z
    .string()
    .max(500, "La description ne doit pas dépasser 500 caractères")
    .optional()
    .or(z.literal("")),
  preferredDate: z.string().optional(),

  // Étape 4
  photos: z.array(z.string()).optional(),
});

export type FilterFormData = z.infer<typeof filterSchema>;
export type ClientRequestFormData = z.infer<typeof clientRequestFormSchema>;
export type AddressRequestData = z.infer<typeof addressRequestSchema>;

//.pick() prend un objet où les clés sont les champs que tu veux garder, et la valeur true signifie simplement "inclure ce champ".
export const step3Schema = clientRequestFormSchema.pick({
  firstName: true,
  lastName: true,
  phone: true,
  email: true,
  addressRequest: true,
  description: true,
});

export type Step3FormData = z.infer<typeof step3Schema>;