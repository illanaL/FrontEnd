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
    id: "CONTROLE_ACCES",
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
        <div className="grid grid-cols-2 gap-4 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => update("categoryId", cat.id)}
              className={`border-2 rounded-2xl p-5 text-left transition-all
            ${
              formdata.categoryId === cat.id
                ? "border-amber-700 bg-amber-50 shadow-md"
                : "border-gray-200 bg-white hover:border-amber-300"
            }
            `}
            >
              <div className="text-4xl mb-2">{cat.icon}</div>
              <div className="text-sm font-semibold text-gray-800">
                {cat.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
