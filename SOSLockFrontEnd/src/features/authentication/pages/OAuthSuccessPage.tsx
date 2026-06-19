import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserAuth } from "../hooks/useUserAuthMutations"; // Ajuste le chemin si besoin

export const OAuthSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  
  const login = useUserAuth((state) => state.login);

  useEffect(() => {
    const token = searchParams.get("token");
    const userBase64 = searchParams.get("user");

   
    if (!token || !userBase64) {
      navigate("/users/login?error=auth_failed");
      return;
    }

    try {
      // 1. On décode la chaîne Base64 reçue du Backend
      const decodedJson = atob(userBase64);
      
      // 2. On transforme à nouveau le texte obtenu en objet JavaScript
      const user = JSON.parse(decodedJson);

      // 3. On stocke le token dans le localStorage pour ton client Axios (api.ts)
      localStorage.setItem("accessKey", token);

      // 4. On connecte instantanément l'utilisateur dans Zustand
      login(user, token, user.email);

      // 5. Redirection immédiate vers le Dashboard
      navigate("/user/dashboard");

    } catch (error) {
      console.error("Erreur lors du décodage des données utilisateur :", error);
      localStorage.removeItem("accessKey");
      navigate("/users/signIn?error=invalid_data");
    }
  }, [searchParams, navigate, login]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-neutral-50">
      <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-gray-600">Préparation de votre espace client...</p>
    </div>
  );
};

export default OAuthSuccessPage;