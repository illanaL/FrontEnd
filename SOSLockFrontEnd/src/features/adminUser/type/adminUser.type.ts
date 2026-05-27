export interface AdminProps {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
}
export interface AdminLoginResponse {
  adminUser: AdminProps;
  accessKey: string;
}


export interface AdminArtisanResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  isActive: boolean;
  emailVerified: boolean;
  isProfileComplete: boolean;
  createdAt: string;
  birthDate?: string;
  address?: string;
  companyName?: string;
  siret?: string;
  skills?: string[];
  departments?: string[];
}