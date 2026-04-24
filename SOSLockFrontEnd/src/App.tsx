import { Routes, Route } from "react-router-dom";
import { ArtisanPage } from "./pages/ArtisanPage";
import { PublicPage } from "./pages/PublicPage";
import { AdminPage } from "./pages/AdminPage";
import { ExoPage } from "./pages/ExoPage";
import { Erreur } from "./pages/Erreur";
import { LoginPage } from "./pages/LoginPage";
import { AuthProvider } from "./features/authentication/context/AuthContext";

function App() {
  return (

    <Routes>
      <Route path="/" element={<PublicPage />} />
      <Route path="/artisans/signIn" element={
        <AuthProvider>
          <LoginPage />
        </AuthProvider>} />
      <Route path="/artisans" element={
        <AuthProvider>
          <ArtisanPage />
        </AuthProvider>} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/exo" element={<ExoPage />} />
      <Route path="*" element={<Erreur />} />
    </Routes>
  );
}

export default App;
