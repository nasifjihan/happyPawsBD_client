import { Navigate, useLocation } from "react-router";

import { useAdminAuth } from "../context/AdminAuthContext";

const AdminProtectedRoute = ({ children }) => {
  const auth = useAdminAuth();
  const location = useLocation();

  if (!auth?.isAuthenticated) {
    return (
      <Navigate
        to={`/admin/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}
        replace
      />
    );
  }

  return children;
};

export default AdminProtectedRoute;

