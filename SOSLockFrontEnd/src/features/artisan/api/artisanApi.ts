import axios from "axios";
import type { ArtisanResponse, InactivateArtisanResponse, LoginArtisanInput, UpdateArtisanInput, UpdateArtisanResponse } from "../type/artisan.type";
import type { signupArtisanStepOneData } from "../schema/artisan.schema";


///////CRUD

//axios + token
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
 
api.interceptors.request.use((config)=> {
  const token = localStorage.getItem('accessKey');
  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
});

/**
 * Crée un compte artisan.
 * Route : POST /artisans/signUp
 */
export const signUpArtisan = async (
  data: signupArtisanStepOneData
): Promise<ArtisanResponse> => {
  const res = await api.post<ArtisanResponse>("/artisans/signUp", data);
  return res.data;
};


/**
 * Connecte un artisan et stocke le token JWT.
 * Route : POST /artisans/signIn
 */
export const signInArtisan = async (
  credentials: LoginArtisanInput
): Promise<ArtisanResponse> => {
  const res = await api.post<ArtisanResponse>("/artisans/signIn", credentials);
 
  // 💾 Persistance du token pour les requêtes suivantes
  if (res.data.accessKey) {
    localStorage.setItem("accessKey", res.data.accessKey);
  }
 
  return res.data;
};
 
/**
 * Déconnecte l'artisan côté client (suppression du token).
 */
export const signOutArtisan = (): void => {
  localStorage.removeItem("accessKey");
};
 
// ─────────────────────────────────────────────
// 🔒 CRUD protégé (authorizationMiddlewareUser requis)
// ─────────────────────────────────────────────
 
/**
 * Met à jour un artisan — renvoie uniquement les champs modifiés.
 * Route : PATCH /artisans/update/:id
 */
export const updateArtisan = async (
  id: string,
  data: UpdateArtisanInput
): Promise<UpdateArtisanResponse> => {
  const res = await api.patch<UpdateArtisanResponse>(
    `/artisans/update/${id}`,
    data
  );
  return res.data;
};
 
/**
 * Supprime définitivement un artisan.
 * Route : DELETE /artisans/:artisanId
 */
export const deleteArtisan = async (artisanId: string): Promise<string> => {
  const res = await api.delete<string>(`/artisans/${artisanId}`);
  return res.data;
};
 
/**
 * Désactive un artisan (soft delete — isActive = false).
 * Route : PATCH /artisans/inactivate/:artisanId
 */
export const inactivateArtisan = async (
  artisanId: string
): Promise<InactivateArtisanResponse> => {
  const res = await api.patch<InactivateArtisanResponse>(
    `/artisans/inactivate/${artisanId}`
  );
  return res.data;
};
 