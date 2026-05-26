import { createContext, useContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Artisan } from "../../artisan/type/artisan.type";
import type { LoginByPhoneForm } from "../schema/login.schema";
import { useAuthStore } from "../stores/authStore";
import { authArtisanApi } from "../api/auth.api";

type AuthContextType = {
  artisan: Artisan | null;
  isAuthenticated: boolean;
  login: (data: LoginByPhoneForm) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const { artisan, isAuthenticated } = useAuthStore();

  const login = useCallback(
    async (data: LoginByPhoneForm) => {
      await authArtisanApi.login(data);
      navigate("/artisans/mon-espace");
    },
    [navigate],
  );

  const logout = useCallback(() => {
    authArtisanApi.logout();
    navigate("/artisans/signIn");
  }, [navigate]);

  const value = useMemo(
    () => ({ artisan, isAuthenticated, login, logout }),
    [artisan, isAuthenticated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
