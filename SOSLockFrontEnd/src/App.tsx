import { Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./features/authentication/context/AuthContext";
import { AppErrorBoundary } from "./components/ErrorBoundary";
import { AskClientRequest } from "./pages/AskClientRequest";
import { SignupArtisanForm } from "./features/artisan/components/SignupArtisanForm";
import { Layout } from "./components/Layout";
import { lazy, Suspense } from "react";
import { Spinner } from "./components/Spinner";
import { ProtectedRoute } from "./features/authentication/components/ProtectedRoute";
import { ArtisanLayout } from "./features/artisan/layout/ArtisanLayout";
import AdminDashbaordClientRequestPage from "./features/adminUser/pages/AdminDashbaordClientRequestPage";

const ExoPage = lazy(() => import("./pages/ExoPage"));
const ArtisanPage = lazy(
  () => import("./features/adminUser/pages/AdminDashbaordClientRequestPage"),
);
const PublicPage = lazy(() => import("./pages/PublicPage"));
const AdminLayout = lazy(
  () => import("./features/adminUser/layout/AdminLayout"),
);
const ErreurPage = lazy(() => import("./pages/Erreur"));
const LoginArtisanPage = lazy(() => import("./pages/LoginArtisanPage"));
const AssignedRequestsPage = lazy(
  () => import("./features/artisan/pages/AssignedRequestsPage"),
);
const MyProfilePage = lazy(
  () => import("./features/artisan/pages/MyProfilPage"),
);
const AdminArtisansPage = lazy(
  () => import("./features/adminUser/pages/AdminArtisansPage"),
);
const AdminDashboardPage = lazy(
  () => import("./features/adminUser/pages/AdminDashboardPage"),
);

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <Spinner variant="pulse" size="xl" label="Chargement . . ." />
        }
      >
        <Routes>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
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
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="artisans" element={<AdminArtisansPage />} />
              <Route
                path="client-requests"
                element={<AdminDashbaordClientRequestPage />}
              />
            </Route>

            <Route path="/exo" element={<ExoPage />} />
            <Route path="/demande" element={<AskClientRequest />} />
            <Route path="/signup-artisan" element={<SignupArtisanForm />} />
            <Route path="*" element={<ErreurPage />} />
          </Route>

          {/* ── Espace artisan : son propre layout avec sidebar ── */}
          <Route
            path="/artisans/mon-espace"
            element={
              <AppErrorBoundary>
                <ProtectedRoute>
                  <ArtisanLayout />
                </ProtectedRoute>
              </AppErrorBoundary>
            }
          >
            <Route index element={<AssignedRequestsPage />} />

            <Route path="profil" element={<MyProfilePage />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
