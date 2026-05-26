import { useState } from "react";

interface SkillsFieldV3Props {
  label?: string;
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: string;
  append: (skill: {value: string;}) => void;
  count: number
}

export function SkillsV3Field({
  label = "Compétences",
  error,
  placeholder,
  append,
  count
}: SkillsFieldV3Props) {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <label  
      htmlFor="skill-input" 
      className="text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <div className="flex gap-2">
        <input
        id="skill-input" 
          type="text"
          value={input}
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && append({value: input})}
          className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="button"
          onClick={() => append({value: input})}
          className="px-4 py-2 text-sm bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          Ajouter
        </button>
      </div>
 
      {count === 0 && (
        <p className="text-xs text-slate-400">
          Sélectionner au moins un choix.
        </p>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
