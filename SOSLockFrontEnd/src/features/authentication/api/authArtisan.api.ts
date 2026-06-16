import api from "../../../client/client";
import type { LoginByPhoneForm } from "../schema/login.schema";
import type { ArtisanResponse } from "../../artisan/type/artisan.type";
import { useArtisanAuth } from "../hooks/useArtisanAuth";


export const authArtisanApi = {
  async login(data: LoginByPhoneForm): Promise<void> {
      try {
        const res = await api.post<ArtisanResponse>("/artisans/signIn", data)

       const { accessKey, ...artisanData } = res.data 
       
        if (!accessKey) {
        throw new Error("Aucun token reçu du serveur");
         }

       useArtisanAuth.getState().login(artisanData, accessKey,
      "artisan");
       }catch (error: any) {
    throw new Error(error.response?.data?.error || "Erreur de connexion");
  }

  },

  logout(): void {
    useArtisanAuth.getState().logout();
  },
};


