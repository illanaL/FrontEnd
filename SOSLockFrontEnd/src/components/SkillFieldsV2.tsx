import { useState } from "react";

interface SkillsFieldV2Props {
  label?: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: string;
}

export function SkillsV2Field({
  label = "Compétences",
  value,
  onChange,
  error,
  placeholder,
}: SkillsFieldV2Props) {
  const [input, setInput] = useState("");

  const addSkill = () => {
    const trimmed = input.trim();
    if (!trimmed || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
    setInput("");
  };

  const removeSkill = (skill: string) => {
    onChange(value.filter((s) => s !== skill));
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
          className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="button"
          onClick={addSkill}
          className="px-4 py-2 text-sm bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          Ajouter
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="hover:text-red-500 transition-colors"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
      {value.length === 0 && (
        <p className="text-xs text-slate-400">
          Sélectionner au moins un choix.
        </p>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
