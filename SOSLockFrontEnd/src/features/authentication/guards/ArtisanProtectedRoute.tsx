import { Navigate } from "react-router-dom";
import { useArtisanAuth } from "../hooks/useArtisanAuth";

type Props = {
  children: React.ReactNode;
};

export const ArtisanProtectedRoute = ({
  children,
}: Props) => {
  const { isAuthenticated } = useArtisanAuth();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/artisans/signIn"
        replace
      />
    );
  }

  return <>{children}</>;
};