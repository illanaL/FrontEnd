import { useState } from "react";
import { departements } from "../../../shared/constants/departements";

interface DepartmentsFieldProps {
  selected: string[];
  onChange: (codes: string[]) => void;
  error?: string;
}

export const DepartmentsField = ({
  selected,
  onChange,
  error,
}: DepartmentsFieldProps) => {
  const [search, setSearch] = useState("");

  const filtered = departements.filter(
    (d) =>
      d.nom.toLowerCase().includes(search.toLowerCase()) ||
      d.code.includes(search),
  );

  const toggle = (code: string) => {
    if (selected.includes(code)) {
      onChange(selected.filter((c) => c !== code));
    } else {
      onChange([...selected, code]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Départements d'intervention
      </label>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((code) => {
            const dep = departements.find((d) => d.code === code);
            return (
              <span
                key={code}
                className="flex items-center gap-1 bg-primary text-text-light text-xs px-3 py-1 rounded-full"
              >
                {dep?.nom}
                <button
                  type="button"
                  onClick={() => toggle(code)}
                  className="hover:opacity-70 font-bold"
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}

      <input
        type="text"
        placeholder="Rechercher un département..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
      />

      {search && (
        <ul className="border border-border rounded-lg max-h-48 overflow-y-auto bg-bg shadow-md">
          {filtered.length === 0 ? (
            <li className="px-4 py-2 text-sm text-text/50">Aucun résultat</li>
          ) : (
            filtered.map((dep) => (
              <li
                key={dep.code}
                onClick={() => toggle(dep.code)}
                className={`px-4 py-2 text-sm cursor-pointer flex justify-between
                  ${
                    selected.includes(dep.code)
                      ? "bg-bg-soft text-primary font-medium"
                      : "hover:bg-bg-soft text-text"
                  }`}
              >
                <span>{dep.nom}</span>
                <span className="text-text/40">{dep.code}</span>
              </li>
            ))
          )}
        </ul>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
