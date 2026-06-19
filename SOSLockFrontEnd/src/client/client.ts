import axios from "axios";
import { useArtisanAuth } from "../features/authentication/hooks/useArtisanAuth";
// Importe ton store utilisateur s'il existe, par exemple :
// import { useUserAuth } from "../features/authentication/hooks/useUserAuthMutations";

const api = axios.create({
  baseURL: "https://soslockfrance-3381.apps.hostingguru.io",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// ── Interceptor de Requête : Injection du Token ──
api.interceptors.request.use((config) => {
  // 1. On tente de récupérer le token de l'artisan depuis son store Zustand
  let token = useArtisanAuth.getState().token;

  // 2. Si pas de token artisan, on cherche le token du client/user (via localStorage ou un autre store)
  if (!token) {
    token = localStorage.getItem("accessKey");
  }

  // 3. Si un token est trouvé (artisan ou client), on l'ajoute aux headers
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// ── Interceptor de Réponse : Gestion du Refresh Token (401) ──
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si l'erreur est un 401 (Non autorisé) et qu'on n'a pas déjà tenté un retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Tentative de rafraîchissement du token via le cookie HttpOnly du backend
        const { data } = await api.post("/auth/refresh");
        
        // On remet à jour le store de l'artisan si c'est lui qui était connecté
        useArtisanAuth.getState().login(data.user, data.token, "artisan");
        
        // Met à jour le header de la requête initiale qui avait échoué
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        
        // On re-exécute la requête initiale avec le nouveau token
        return api(originalRequest);
      } catch (refreshError) {
        // Si le refresh échoue (session expirée), on déconnecte proprement
        useArtisanAuth.getState().logout();
        localStorage.removeItem("accessKey"); // Nettoyage du token client également
        
        // Redirection vers la page de connexion
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;