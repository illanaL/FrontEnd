import type { StatusRequest } from "../../data/data"

export type ClientRequest = {
  id: string
  userId: string
  firstName: string
  lastName: string
  phone: string
  email: string
  addressRequest: {
    number: string
    street: string
    zipCode: string
    city: string
  }
  description: string
  photos?: string[]
  preferredDate?: string  
  isUrgent: boolean
  status: StatusRequest
  createdAt?: string      
}

export type ClientRequestFormData = {
  categoryId: string;
  productIds: string[];
  isUrgent: boolean;

  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  addressRequest: {
    number: string;
    street: string;
    zipCode: string;
    city: string;
  };
  description: string;
  preferredDate?: string;
  photos?: string[];
};

export const Speciality = {
  SERRURERIE: "SERRURERIE",
  ELECTRICITE: "ELECTRICITE",
  PLOMBERIE: "PLOMBERIE",
} as const;
export type Speciality = (typeof Speciality)[keyof typeof Speciality];

export const Category = {
  SERRURE: "SERRURE",
  PORTE: "PORTE",
  FENETRE: "FENETRE",
  VOLET: "VOLET",
  PORTAIL: "PORTAIL",
  COFFRE_FORT: "COFFRE_FORT",
  RIDEAU_METAL: "RIDEAU_METAL",
  BLINDAGE: "BLINDAGE",
  INTERPHONE: "INTERPHONE",
  CONTROLE_ACCES: "CONTROLE_ACCES",
  DOMOTIQUE: "DOMOTIQUE",
  DEPANNAGE: "DEPANNAGE",
} as const;
export type Category = (typeof Category)[keyof typeof Category];

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  speciality: Speciality;
  category: Category;
}
