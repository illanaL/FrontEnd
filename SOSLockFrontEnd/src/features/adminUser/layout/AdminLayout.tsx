import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Admin
          </h1>

          <p className="text-sm text-gray-500">
            SOS Lock
          </p>
        </div>

        <nav className="space-y-2">

          <NavItem
            to="/admin"
            label="Dashboard"
          />

          <NavItem
            to="/admin/artisans"
            label="Artisans"
          />

          <NavItem
            to="/admin/client-requests"
            label="Demandes clients"
          />

        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

type NavItemProps = {
  to: string;
  label: string;
};

function NavItem({
  to,
  label,
}: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={to === "/admin"}
      className={({ isActive }) =>
        `
        block rounded-lg px-3 py-2 text-sm font-medium transition-colors
        ${
          isActive
            ? "bg-blue-100 text-blue-700"
            : "text-gray-600 hover:bg-gray-100"
        }
        `
      }
    >
      {label}
    </NavLink>
  );
}