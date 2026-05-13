import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./features/authentication/context/AuthContext";
import { AppErrorBoundary } from "./components/ErrorBoundary";
import { AskClientRequest } from "./pages/AskClientRequest";
import { SignupArtisanForm } from "./features/artisan/components/SignupArtisanForm";
import { Layout } from "./components/Layout";
import { lazy, Suspense } from "react";
import { Spinner } from "./components/Spinner";

const ExoPage = lazy(() => import("./pages/ExoPage"));
const ArtisanPage = lazy(() => import("./pages/ArtisanPage"));
const PublicPage = lazy(() => import("./pages/PublicPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const ErreurPage = lazy(() => import("./pages/Erreur"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

function App() {
  return (
    <Layout>
      <Suspense fallback={<Spinner variant="pulse" size="xl" label="Chargement . . ." />}>
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
          <Route path="*" element={<ErreurPage />} />
          <Route path="/demande" element={<AskClientRequest />} />
          <Route path="/signup-artisan" element={<SignupArtisanForm />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
