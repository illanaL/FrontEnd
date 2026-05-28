import { FaPencilAlt } from "react-icons/fa";
import { Tooltip } from "../../../components/Tooltip";
import type { AdminArtisanResponse } from "../type/adminUser.type";
import { BadgeArtisan } from "./BadgeArtisan";

export function ArtisanRow({
  artisan: a,
  isDeleted = false,
}: {
  artisan: AdminArtisanResponse;
  isDeleted?: boolean;
}) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td>
        {!isDeleted && (
          <Tooltip variant="info" position="right" content="Modifier l'artisan">
            <button className="p-2 text-blue-500">
              <FaPencilAlt />
            </button>
          </Tooltip>
        )}
      </td>

      <td className="px-2 py-2 font-medium text-gray-900 w-50">
        {a.firstName} {a.lastName}
      </td>

      <td className="px-2 py-3 text-gray-600 truncate w-20">{a.email}</td>
      <td className="px-2 py-3 text-gray-600">{a.phone}</td>

      <td className="px-2 py-3">
        <div className="flex flex-wrap gap-1">
          {(a.departments ?? []).map((dep) => (
            <Tooltip
              key={dep}
              variant="info"
              position="top"
              content={dep.split(":")[1]}
            >
              <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                {dep.split(":")[0]}
              </span>
            </Tooltip>
          ))}
        </div>
      </td>

      <td className="px-2 py-3">
        <BadgeArtisan
          value={a.isProfileComplete}
          labelTrue="Complet"
          labelFalse="Incomplet"
          colorTrue="green"
          colorFalse="yellow"
        />
      </td>

      <td className="px-2 py-3">
        <BadgeArtisan
          value={a.isActive}
          labelTrue="Actif"
          labelFalse="Inactif"
          colorTrue="green"
          colorFalse="red"
        />
      </td>

      <td className="px-2 py-3 text-gray-500">
        {a.createdAt
          ? new Date(a.createdAt).toLocaleDateString("fr-FR")
          : "—"}
      </td>
    </tr>
  );
}
