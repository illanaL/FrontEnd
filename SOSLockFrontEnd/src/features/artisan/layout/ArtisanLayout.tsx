import { Outlet } from "react-router-dom";
import { ArtisanSidebar } from "../components/ArtisanSidebar";
import { ArtisanMenu } from "../components/ArtisanMenu";


export const ArtisanLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ArtisanSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-end px-6 shrink-0">
          <ArtisanMenu />
        </header>

        {/* Contenu de la route active */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};