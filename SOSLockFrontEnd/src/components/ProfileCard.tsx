
import { Avatar } from "./AvatarTemp";
import { Badge } from "./Badge";
import { InfoRow } from "./InfoRow";
import { SkillList } from "./SkillList";

interface ProfileCardProps {
  name: string;
  role: string;
  avatarSrc: string;
  available?: boolean;
  infos: { label: string; value: string }[];
  skills: { label: string; color?: "blue" | "green" | "red" | "yellow" }[];
}

export function ProfileCard({
  name,
  role,
  avatarSrc,
  available,
  infos,
  skills,
}: ProfileCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-sm flex flex-col gap-4 items-start">
      <div className="flex items-start gap-4">
        <Avatar src={avatarSrc} size={64} />
        <div>
          <h2 className="font-semibold text-lg">{name}</h2>
          <p className="text-sm text-gray-500">{role}</p>

          {available ? (
            <Badge label="Disponible" color="green" />
          ) : (
            <Badge label="Indisponible" color="red" />
          )}
        </div>
      </div>

      <div className="border-t pt-3 flex flex-col gap-1">
        {infos.map((t) => (
          <InfoRow key={t.label} label={t.label} value={t.value} />
        ))}
      </div>

      <div className="border-t pt-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
          Compétences :
        </p>
        <SkillList skills={skills} />
      </div>
    </div>
  );
}
