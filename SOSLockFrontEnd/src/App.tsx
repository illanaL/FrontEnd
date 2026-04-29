import { Routes, Route } from "react-router-dom";
import { ArtisanPage } from "./pages/ArtisanPage";
import { PublicPage } from "./pages/PublicPage";
import { AdminPage } from "./pages/AdminPage";
import { ExoPage } from "./pages/ExoPage";
import { Erreur } from "./pages/Erreur";
import { LoginPage } from "./pages/LoginPage";
import { AuthProvider } from "./features/authentication/context/AuthContext";
import { AppErrorBoundary } from "./components/ErrorBoundary";
import { AskClientRequest } from "./pages/AskClientRequest";
import { SignupArtisanForm } from "./features/signupArtisan/components/SignupArtisanForm";
import { Layout } from "./components/Layout";

function App() {
  return (
    <Layout>
    <Routes>
      <Route path="/" element={<PublicPage />} />

      <Route
        path="/artisans/signIn"
        element={
          <AppErrorBoundary>
            <AuthProvider>
              <LoginPage />
            </AuthProvider>
          </AppErrorBoundary>
        }
      />

      <Route
        path="/artisans"
        element={
          <AppErrorBoundary>
            <AuthProvider>
              <ArtisanPage />
            </AuthProvider>
          </AppErrorBoundary>
        }
      />

      <Route path="/admin" element={<AdminPage />} />
      <Route path="/exo" element={<ExoPage />} />
      <Route path="*" element={<Erreur />} />
      <Route path="/demande" element={<AskClientRequest />} />
      <Route path="/signup-artisan" element={<SignupArtisanForm />} />
    </Routes>
    </Layout>
  );
}

export default App;
