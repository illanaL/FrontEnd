import type { Artisan } from "../../artisan/type/artisan.type";
import type { AdminUser } from "../../adminUser/type/adminUser.type";

type Role = "artisan" | "user" | "admin";

export interface ArtisanAuthState {
  artisan: Artisan | null;
  token: string | null;
  isAuthenticated: boolean;
  role: Role | null;

  login: (artisan: Artisan, token: string, role: "artisan") => void;
  logout: () => void;
}

export interface UserAuthState {
  userId: string | null;
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
  role: "user" | null;

  login: (userId: string, token: string, email?: string) => void;
  loginGuest: (userId: string, email: string) => void;
  logout: () => void;
}


export interface AdminAuthState {
  admin: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  role: "admin" | null;

  login: (admin: AdminUser, token: string) => void;
  logout: () => void;
}
