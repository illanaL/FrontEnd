import { Routes, Route, Outlet } from "react-router-dom";
import { AppErrorBoundary } from "./components/ErrorBoundary";
import { SignupArtisanForm } from "./features/artisan/components/SignupArtisanForm";
import { Layout } from "./components/Layout";
import { lazy, Suspense } from "react";
import { Spinner } from "./components/Spinner";
import { ArtisanLayout } from "./features/artisan/layout/ArtisanLayout";
import { ArtisanProtectedRoute } from "./features/authentication/guards/ArtisanProtectedRoute";
import { UserProtectedRoute } from "./features/authentication/guards/UserProtectedRoute";
// ------Auth --------
const OAuthSuccessPage = lazy(() => import("./features/authentication/pages/OAuthSuccessPage"));
// -------Users-------
const DashboardUserPage = lazy(
  () => import("./features/user/pages/DashboardUserPage"),
);
const LoginUserPage = lazy(() => import("./pages/LoginUserPage"));

// -------Artisans-------
const ExoPage = lazy(() => import("./pages/ExoPage"));
const ArtisanPage = lazy(
  () => import("./features/adminUser/pages/AdminDashbaordClientRequestPage"),
);
//-----PublicPage ------
const ZonesInterventionPage = lazy(
  () => import("./features/public/page/ZonesInterventionPage"),
);
const TarifsPage = lazy(() => import("./features/public/page/TarifsPage"));
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

//-----AdminPage ------
const AdminArtisansPage = lazy(
  () => import("./features/adminUser/pages/AdminArtisansPage"),
);
const AdminDashbaordClientRequestPage = lazy(
  () => import("./features/adminUser/pages/AdminDashbaordClientRequestPage"),
);
const AdminDashboardPage = lazy(
  () => import("./features/adminUser/pages/AdminDashboardPage"),
);
const HomePage = lazy(() => import("./features/public/page/HomePage"));
const ServicePage = lazy(() => import("./features/public/page/ServicesPage"));

const AskClientRequest = lazy(
  () => import("./features/clientRequests/pages/AskClientRequest"),
);

const WelcomePage = lazy(() => import("./features/public/page/WelcomePage"));

function App() {
  return (
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
            <Route path="/" element={<HomePage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/ask-client-request" element={<AskClientRequest />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/tarifs" element={<TarifsPage />} />
            <Route path="/zones" element={<ZonesInterventionPage />} />
            <Route path="/oauth-success" element={<OAuthSuccessPage />} />
             <Route
              path="/users/signIn"
              element={
                <AppErrorBoundary>
                  <LoginUserPage />
                </AppErrorBoundary>
              }
            />
            <Route
              path="/user/dashboard"
              element={
                <AppErrorBoundary>
                  <UserProtectedRoute>
                    <DashboardUserPage />
                  </UserProtectedRoute>
                </AppErrorBoundary>
              }
            />

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
                  <ArtisanProtectedRoute>
                    <ArtisanPage />
                  </ArtisanProtectedRoute>
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
            path="/artisan/dashboard"
            element={
              <AppErrorBoundary>
                <ArtisanProtectedRoute>
                  <ArtisanLayout />
                </ArtisanProtectedRoute>
              </AppErrorBoundary>
            }
          >
            <Route index element={<AssignedRequestsPage />} />

            <Route path="profil" element={<MyProfilePage />} />
          </Route>
        </Routes>
      </Suspense>
 );
}

export default App;
