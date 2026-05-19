import api from "../../../client/client";
import type { LoginByEmailForm, LoginByPhoneForm } from "../schema/login.schema";
import type { Artisan, ArtisanResponse } from "../../artisan/type/artisan.type";
import { useAuthStore } from "../stores/authStore";
import type { UserLoginResponse } from "../../user/type/user.type";
import type { AdminLoginResponse } from "../../adminUser/type/adminUser.type";

export const authArtisanApi = {
  async login(data: LoginByPhoneForm): Promise<void> {
      try {
        const res = await api.post<ArtisanResponse>("/artisans/signIn", data)

       const { accessKey, ...artisanData } = res.data     
       useAuthStore.getState().login(artisanData as Artisan, accessKey,
      "artisan");
       }catch (error: any) {
    throw new Error(error.response?.data?.error || "Erreur de connexion");
  }

  },

  logout(): void {
    useAuthStore.getState().logout();
  },
};

export const authUserApi = {
  async login(data: LoginByPhoneForm): Promise<void> {
      try {
    const res = await api.post<UserLoginResponse>("/users/signIn", data);
    
    useAuthStore.getState().login(
      { id: res.data.userId } as any,  res.data.accessKey, "user"
    );  }catch (error: any) {
    throw new Error(error.response?.data?.error || "Erreur de connexion");
  }
  },

  logout: () => useAuthStore.getState().logout(),
};

export const authAdminApi = {
  async login(data: LoginByEmailForm): Promise<void> {
    try {
        const res = await api.post<AdminLoginResponse>("/adminUsers/signIn", data);
 
     useAuthStore.getState().login(
      res.data.adminUser as any,
      res.data.accessKey,
      "admin"
    );  
    }catch (error: any) {
    throw new Error(error.response?.data?.error || "Erreur de connexion");
  }
  },

  logout: () => useAuthStore.getState().logout(),
};