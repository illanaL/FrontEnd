import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./features/authentication/context/AuthContext";
import { AppErrorBoundary } from "./components/ErrorBoundary";
import { AskClientRequest } from "./pages/AskClientRequest";
import { SignupArtisanForm } from "./features/artisan/components/SignupArtisanForm";
import { Layout } from "./components/Layout";
import { lazy, Suspense } from "react";
import { Spinner } from "./components/Spinner";
import { ProtectedRoute } from "./features/authentication/components/ProtectedRoute";

const ExoPage = lazy(() => import("./pages/ExoPage"));
const ArtisanPage = lazy(() => import("./pages/ArtisanPage"));
const PublicPage = lazy(() => import("./pages/PublicPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const ErreurPage = lazy(() => import("./pages/Erreur"));
const LoginArtisanPage = lazy(() => import("./pages/LoginArtisanPage"));

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Suspense
          fallback={
            <Spinner variant="pulse" size="xl" label="Chargement . . ." />
          }
        >
          <Routes>
            <Route path="/" element={<PublicPage />} />

            <Route
              path="/artisans/signIn"
              element={
                <AppErrorBoundary>
                  <LoginArtisanPage />
                </AppErrorBoundary>
              }
            />

            <Route
              path="/artisans"
              element={
                <AppErrorBoundary>
                  <ProtectedRoute>
                    <ArtisanPage />
                  </ProtectedRoute>
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
    </AuthProvider>
  );
}

export default App;
