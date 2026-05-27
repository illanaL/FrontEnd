import type { AdminArtisanResponse } from "../type/adminUser.type";
import { BadgeArtisan } from "./BadgeArtisan";

export function ArtisanRow({ artisan: a }: { artisan: AdminArtisanResponse }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 font-medium text-gray-900">
        {a.firstName} {a.lastName}
      </td>
      <td className="px-4 py-3 text-gray-600">{a.email}</td>
      <td className="px-4 py-3 text-gray-600">{a.phone}</td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {(a.departments ?? []).map((dep) => (
            <span
              key={dep}
              className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full"
            >
              {dep}
            </span>
          ))}
        </div>
      </td>
      <td className="px-4 py-3">
        <BadgeArtisan
          value={a.isProfileComplete}
          labelTrue="Complet"
          labelFalse="Incomplet"
          colorTrue="green"
          colorFalse="yellow"
        />
      </td>
      <td className="px-4 py-3">
        <BadgeArtisan
          value={a.isActive}
          labelTrue="Actif"
          labelFalse="Inactif"
          colorTrue="green"
          colorFalse="red"
        />
      </td>
      <td className="px-4 py-3">
        <BadgeArtisan
          value={a.emailVerified}
          labelTrue="Vérifié"
          labelFalse="Non vérifié"
          colorTrue="green"
          colorFalse="gray"
        />
      </td>
      <td className="px-4 py-3 text-gray-500">
        {a.createdAt
          ? new Date(a.createdAt).toLocaleDateString("fr-FR")
          : "—"}
      </td>
    </tr>
  );
}