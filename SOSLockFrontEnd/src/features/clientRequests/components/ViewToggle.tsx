import type { ViewMode } from "../../../data/data";

interface Props {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export const ViewToggle = ({ viewMode, onChange }: Props) => (
  <div className="flex border rounded-lg overflow-hidden w-fit mb-4">
    <button
      onClick={() => onChange("list")}
      className={`px-3 py-1 text-sm transition-colors ${
        viewMode === "list" ? "bg-amber-700 text-white" : "text-gray-500 hover:bg-gray-50"
      }`}
    >
      ☰ Liste
    </button>
    <button
      onClick={() => onChange("grid")}
      className={`px-3 py-1 text-sm transition-colors ${
        viewMode === "grid" ? "bg-amber-700 text-white" : "text-gray-500 hover:bg-gray-50"
      }`}
    >
      ⊞ Grille
    </button>
  </div>
);