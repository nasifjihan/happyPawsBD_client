import { Box, CircularProgress } from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useUserAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (!user) {
    const redirectPath = `${location.pathname}${location.search}`;
    return (
      <Navigate
        to={`/sign_in?redirect=${encodeURIComponent(redirectPath)}`}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
