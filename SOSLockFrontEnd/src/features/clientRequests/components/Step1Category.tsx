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
        <div className="grid grid-cols-2 gap-4 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => update("categoryId", cat.id)}
              className={`border-2 rounded-2xl p-5 text-left transition-all
            ${
              formdata.categoryId === cat.id
                ? "border-primary bg-bg-soft shadow-md"
                : "border-border bg-bg hover:border-primary"
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
        <div
          className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all
        ${formdata.isUrgent ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚨</span>
            <div>
              <p className="font-bold text-sm text-red-600">C'est urgent ?</p>
              <p className="text-xs text-gray-500">
                Intervention prioritaire — supplément tarifaire de 20h à 08h00.
              </p>
            </div>
          </div>
          <button
            onClick={() => update("isUrgent", !formdata.isUrgent)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all
            ${
              formdata.isUrgent
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {formdata.isUrgent ? "Oui !" : "Non"}
          </button>
        </div>
      </div>
    </>
  );
};
