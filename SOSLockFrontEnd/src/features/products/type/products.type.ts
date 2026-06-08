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

export type Category = typeof Category[keyof typeof Category]


export const Speciality = {
  SERRURERIE: "SERRURERIE",
  ELECTRICITE: "ELECTRICITE",
  PLOMBERIE: "PLOMBERIE",
} as const;
export type Speciality = (typeof Speciality)[keyof typeof Speciality];


export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  speciality: Speciality;
  category: Category;
}
