export type Artisan = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  address: string;
  departments: string[];
  siret: string;
  IBAN: string;
  skills: string[];
  isProfileComplete: boolean;
};
export interface Address {
  number: string;
  street: string;
  zipCode: string;
  city: string;
  coordinates?: [number, number];
}

export interface CreateArtisanInput {
  address: Address;
  companyName: string;
  departments: string[];
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  siret: string;
  IBAN: string;
  skills: {value: string}[];
}

export interface ArtisanFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  companyName: string;
  siret: string;
  IBAN: string;
  skills: string[];
  departments: string[];
}

export interface LoginArtisanInput {
  phone: string;
  password: string;
}

export type UpdateArtisanInput = Partial<
  Omit<CreateArtisanInput, "email" | "password">
>;

export interface ArtisanResponse {
  id: string;
  address: string;
  companyName: string;
  departments: string[];
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  siret: string;
  IBAN: string;
  skills: string[];
  accessKey?: string;
  isProfileComplete: boolean;  
}

export interface UpdateArtisanResponse {
  id: string;
  address?: string;
  companyName?: string;
  departments?: string[];
  firstName?: string;
  lastName?: string;
  phone?: string;
  siret?: string;
  IBAN?: string;
  skills?: string[];
}

export interface InactivateArtisanResponse {
  id: string;
  isActive: boolean;
  inactivatedAt: string;
}

export type ApiErrorResponse = { error: string };
