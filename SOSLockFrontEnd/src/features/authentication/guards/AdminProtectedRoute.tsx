import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../hooks/useAdminAuth";

type Props = {
  children: React.ReactNode;
};

export const AdminProtectedRoute = ({
  children,
}: Props) => {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/signIn"
        replace
      />
    );
  }

  return <>{children}</>;
};