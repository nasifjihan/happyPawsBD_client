import RouteLoader from "../Common/RouteLoader";
import { Navigate, useLocation } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useUserAuth();
  const location = useLocation();

  if (authLoading) {
    return <RouteLoader message="Checking your session..." />;
  }

  if (!user) {
    const redirectPath = `${location.pathname}${location.search}`;
    return (
      <Navigate
        to={`/sign_in?redirect=${encodeURIComponent(redirectPath)}`}
        state={{
          authMessage: "Please sign in to continue.",
        }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
