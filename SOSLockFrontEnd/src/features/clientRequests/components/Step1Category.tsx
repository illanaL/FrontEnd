import type { ClientRequestFormData } from "../clientRequest.types";

export const CATEGORIES = [
  {
    id: "SERRURE",
    label: "Serrure & Porte",
    icon: "🔑",
    description: "Porte claquée, serrure bloquée, clé perdue",
  },
  {
    id: "FENETRE",
    label: "Fenêtre & Volet",
    icon: "🪟",
    description: "Volet roulant, fenêtre bloquée",
  },
  {
    id: "PORTAIL",
    label: "Portail & Rideau métallique",
    icon: "🚪",
    description: "Portail électrique, rideau métallique",
  },
  {
    id: "BLINDAGE",
    label: "Blindage",
    icon: "🛡️",
    description: "Renforcement et sécurisation de porte",
  },
  {
    id: "COFFRE_FORT",
    label: "Coffre-fort",
    icon: "🔒",
    description: "Ouverture, réparation de coffre-fort",
  },
  {
    id: "INTERPHONE",
    label: "Accès & Interphone",
    icon: "📟",
    description: "Digicode, interphone, contrôle d'accès",
  },
  {
    id: "DOMOTIQUE",
    label: "Domotique & Alarme",
    icon: "🏠",
    description: "Alarme connectée, automatisation",
  },
  {
    id: "DEPANNAGE",
    label: "Dépannage urgent",
    icon: "🚨",
    description: "Intervention rapide toutes urgences",
  },
  {
    id: "AUTRE",
    label: "Autre",
    icon: "❓",
    description: "Mon problème ne figure pas dans la liste",
  },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

interface Props {
  formdata: ClientRequestFormData;
  update: (field: keyof ClientRequestFormData, value: unknown) => void;
}

export const Step1Category = ({ formdata, update }: Props) => {
  return (
    <>
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Quel est votre problème?
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Choisissez la catégorie qui correspond à votre situation
        </p>

        {/* Grille des Catégories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {CATEGORIES.map((cat) => {
            const isSelected = formdata.categoryId === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => update("categoryId", cat.id)}
                className={`group relative border-2 rounded-2xl p-5 text-left transition-all duration-200 flex flex-col justify-between h-36 ${
                  isSelected
                    ? "border-primary bg-bg-soft shadow-lg scale-[1.01]"
                    : "border-gray-200 bg-white hover:border-primary/50 hover:shadow-sm"
                }`}
              >
                {/* Ligne du haut : Icône + Indicateur visuel */}
                <div className="flex items-start justify-between w-full">
                  <div className="text-4xl filter drop-shadow-sm">{cat.icon}</div>
                  
                  {/* Petite bulle de validation dynamique */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs transition-all ${
                      isSelected
                        ? "bg-primary border-primary text-white"
                        : "border-gray-300 text-transparent group-hover:border-primary/50"
                    }`}
                  >
                    ✓
                  </div>
                </div>

                {/* Textes explicatifs */}
                <div className="mt-2 text-left">
                  <div
                    className={`text-base font-bold transition-colors ${
                      isSelected ? "text-primary" : "text-gray-800"
                    }`}
                  >
                    {cat.label}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bloc Urgence */}
        <div
          className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
            formdata.isUrgent ? "border-red-400 bg-red-50 shadow-sm" : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-pulse">🚨</span>
            <div>
              <p className="font-bold text-sm text-red-600">C'est urgent ?</p>
              <p className="text-xs text-gray-500">
                Intervention prioritaire — supplément tarifaire de 20h à 08h00.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => update("isUrgent", !formdata.isUrgent)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-xs ${
              formdata.isUrgent
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {formdata.isUrgent ? "Oui !" : "Non"}
          </button>
        </div>
      </div>
    </>
  );
};