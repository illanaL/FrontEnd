import { useState } from "react";

interface SkillsFieldProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export function SkillsField({ skills, onChange }: SkillsFieldProps) {
  const [input, setInput] = useState("");

  const addSkill = () => {
    const trimmed = input.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    onChange([...skills, trimmed]);
    setInput("");
  };

  const removeSkill = (skill: string) => {
    onChange(skills.filter((s) => s !== skill));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700">Compétences</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          placeholder="Ex : Serrurerie, Blindage..."
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
        {skills.map((skill) => (
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
      {skills.length === 0 && (
        <p className="text-xs text-slate-400">
          Ajoutez au moins une compétence.
        </p>
      )}
    </div>
  );
}
