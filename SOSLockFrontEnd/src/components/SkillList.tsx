import { Badge, type BadgeProps } from "./Badge";

interface SkillListProps {
  skills: BadgeProps[];
}

export function SkillList({ skills }: SkillListProps) {
  if (skills.length === 0) {
    return <p className="text-sm text-gray-400">Aucune compétence ajoutée.</p>;
  }

  return (
    <div className="">
      <ul className="list-none flex">
        {skills.map((t, i) => (
          <li key={i}><Badge label={t.label} color={t.color} /></li>
        ))}
      </ul>
    </div>
  );
}
