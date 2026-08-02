import { Suspense } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import AppErrorBoundary from "../Components/Common/AppErrorBoundary";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import RouteLoader from "../Components/Common/RouteLoader";
import ScrollToTop from "../context/ScrollToTop";

const PublicAppLayout = () => {
  return (
    <>
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: "absolute",
          top: -48,
          left: 16,
          zIndex: 2000,
          px: 2,
          py: 1,
          borderRadius: 1,
          backgroundColor: "success.main",
          color: "common.white",
          textDecoration: "none",
          fontWeight: 600,
          "&:focus": {
            top: 16,
          },
        }}
      >
        Skip to main content
      </Box>

      <Header />
      <ScrollToTop />

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

      <Footer />
    </>
  );
};

export default PublicAppLayout;
