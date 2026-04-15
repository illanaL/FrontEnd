import { Badge, type BadgeProps } from "./Badge";

interface SkillListProps {
  skills: BadgeProps[];
}

export function SkillList({ skills }: SkillListProps) {
  if (skills.length === 0) {
    return <p className="text-sm text-gray-400">Aucune compétence ajoutée.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {skills.map((t) => (
        <div key={t.label}>
          - <Badge label={t.label} color={t.color} />
          <br />
        </div>
      ))}
    </div>
  );
}
