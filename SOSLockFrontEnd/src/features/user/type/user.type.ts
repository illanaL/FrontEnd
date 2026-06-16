import type { Address } from "../../artisan/type/artisan.type";

export interface UserLoginResponse {
  userId: string;
  accessKey: string;
}

export interface SignUpUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface SignUpUserResponse {
  id: string;
  email: string;
}

export interface LoginUserPayload {
  phone: string;
  password: string;
}

export interface LoginUserResponse {
  userId: string;
  accessKey: string;
}

export const OAuthProvider = {
  GOOGLE : "GOOGLE",
} as const
export type OAuthProvider = typeof OAuthProvider[keyof typeof OAuthProvider];


export interface RecoveryCode {
  code?: string;
  createdAt?: Date;
}


export interface User {
  id: string;
  email: string;
  phone?: string;
  address?: Address;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  password?: string;
  createdAt: Date;
  inactivatedAt?: Date;
  isActive: boolean;
  isVIP: boolean;
  updatedAt?: Date;
  lastLoggedAt: Date;
  emailVerified: boolean;
  deletedAt?: Date;
  oAuthProvider?: OAuthProvider;
  providerUserId?: string;
  recoveryCode?: RecoveryCode;
}