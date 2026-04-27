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
  departments:string[];
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  companyName?: string;
  siret?: string;
  IBAN?: string;
  skills?: string;
  departments?:string;
}