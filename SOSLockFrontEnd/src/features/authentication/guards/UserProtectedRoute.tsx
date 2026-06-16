import { Navigate } from "react-router-dom";
import { useUserAuth } from "../hooks/useUserAuthMutations";

type Props = {
  children: React.ReactNode;
};

export const UserProtectedRoute = ({
  children,
}: Props) => {
  const { isAuthenticated } = useUserAuth();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/connexion"
        replace
      />
    );
  }

  return <>{children}</>;
};