import { FcGoogle } from "react-icons/fc";
import api from "../client/client";

export const GoogleAuthButton = () => {

    // Fonction pour déclencher OAuth Google
    const handleGoogleLogin = async () => {
        try {
            const { data } = await api.get<{ url: string }>("/google/auth");
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error("L'URL Google n'a pas été renvoyée par le serveur.");
            }
        } catch (error) {
            console.error("Erreur d'initialisation Google OAuth :", error);
            alert("Impossible de contacter le service d'authentification Google.");
        }
    };

    return (
        <div>

            <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 border border-gray-300 rounded-xl w-full bg-white hover:bg-gray-50 text-gray-700 py-2.5 font-medium transition-colors shadow-sm"
            >
                <FcGoogle className="text-xl" />
                Continuer avec Google
            </button>
        </div>

    )
}