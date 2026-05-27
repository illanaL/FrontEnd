import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">

      <aside className="w-64 border-r bg-white">
        <nav className="p-4 space-y-2">
          <NavLink to="/admin">
            Tableau de bord
          </NavLink>

          <NavLink to="/admin/artisans">
            Artisans
          </NavLink>

          <NavLink to="/admin/client-requests">
            Demandes clients
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}