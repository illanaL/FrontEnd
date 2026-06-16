import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, User, History } from "lucide-react";
import { useUserAuth } from "../../authentication/hooks/useUserAuthMutations";

const getInitials = (email?: string | null) => {
  if (!email) return "?";
  const namePart = email.split("@")[0];
  return (namePart[0] ?? "?").toUpperCase();
};

export const UserMenu = () => {
  const { email, isAuthenticated, logout } = useUserAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Ferme le menu si clic en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = getInitials(email);

  const handleLogin = () => {
    navigate("/welcome");
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  // Si non connecté, afficher bouton de connexion
  if (!isAuthenticated) {
    return (
      <button
        onClick={handleLogin}
        className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all duration-150"
      >
        <User size={18} />
        Connexion
      </button>
    );
  }

  // Si connecté, afficher menu déroulant
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold select-none">
          {initials}
        </div>
        <span className="text-sm font-medium text-gray-700">{email}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
          {/* En-tête identité */}
          <div className="px-4 py-2.5 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">{email}</p>
            <p className="text-xs text-gray-400">Utilisateur connecté</p>
          </div>

          <button
            onClick={() => {
              navigate("/user/historique");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <History size={15} className="text-gray-400" />
            Afficher historique des demandes
          </button>

          <button
            onClick={() => {
              navigate("/welcome");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Settings size={15} className="text-gray-400" />
            Modifier mon profil
          </button>

          <div className="border-t border-gray-100 mt-1 pt-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={15} />
              Se déconnecter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
