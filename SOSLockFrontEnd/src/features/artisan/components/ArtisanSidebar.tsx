import { NavLink } from "react-router-dom";
import { ClipboardList, User } from "lucide-react";

const NAV_ITEMS = [
  {
    to: "/artisans/mon-espace",
    label: "Mes demandes",
    icon: ClipboardList,
    end: true,
  },
  {
    to: "/artisans/mon-espace/profil",
    label: "Mon profil",
    icon: User,
  },
];

export const ArtisanSidebar = () => {
  return (
    <aside className="w-60 min-h-screen bg-white border-r border-gray-200 flex flex-col py-6 px-3">
      <div className="mb-8 px-2">
        <span className="text-xl font-bold text-amber-700">SOSLock</span>
        <p className="text-xs text-gray-400 mt-1">Espace artisan</p>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-amber-50 text-amber-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};