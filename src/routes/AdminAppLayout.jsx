import { Suspense } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router";

import AppErrorBoundary from "../Components/Common/AppErrorBoundary";
import RouteLoader from "../Components/Common/RouteLoader";

const AdminAppLayout = () => {
  return (
    <Box
      component="main"
      id="main-content"
      tabIndex={-1}
      sx={{ outline: "none" }}
    >
      <AppErrorBoundary>
        <Suspense fallback={<RouteLoader />}>
          <Outlet />
        </Suspense>
      </AppErrorBoundary>
    </Box>
  );
};

export default AdminAppLayout;
