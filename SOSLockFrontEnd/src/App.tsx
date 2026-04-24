import { Routes, Route } from "react-router-dom";
import { ArtisanPage } from "./pages/ArtisanPage";
import { PublicPage } from "./pages/PublicPage";
import { AdminPage } from "./pages/AdminPage";
import { ExoPage } from "./pages/ExoPage";
import { Erreur } from "./pages/Erreur";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicPage />} />
      <Route path="/artisan/signIn" element={<LoginPage />} />
      <Route path="/artisan" element={<ArtisanPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/exo" element={<ExoPage />} />
      <Route path="*" element={<Erreur />} />
    </Routes>
  );
}

export default App;
