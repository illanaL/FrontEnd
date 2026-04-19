import type { SortBy } from "../../../data/data";

interface Props {
  sortBy: SortBy;
  onChange: (value: SortBy) => void;
}

const OPTIONS: { value: SortBy; label: string }[] = [
  { value: "date", label: "Date" },
  { value: "name", label: "Nom" },
  { value: "status", label: "Statut" },
];

export const SortBar = ({ sortBy, onChange }: Props) => (
  <div className="flex items-center gap-2 mb-4">
    <span className="text-sm text-gray-500">Trier par :</span>
    {OPTIONS.map((opt) => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        className={`px-3 py-1 rounded-lg text-sm border transition-colors ${
          sortBy === opt.value
            ? "bg-amber-700 text-white border-amber-700"
            : "text-gray-500 border-gray-200 hover:border-amber-700"
        }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
);