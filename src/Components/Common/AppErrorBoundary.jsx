import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

const ErrorFallback = () => {
  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
      }}
    >
      <Stack spacing={2} sx={{ maxWidth: 520, textAlign: "center" }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Something went wrong
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          We hit an unexpected problem while loading this page. You can try the
          home page or reload and continue from there.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button component={RouterLink} to="/" variant="contained" color="success">
            Back to Home
          </Button>
          <Button variant="outlined" color="success" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

class RouteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Route render error", error, errorInfo);
  }

  componentDidUpdate(previousProps) {
    if (
      this.state.hasError &&
      previousProps.resetKey !== this.props.resetKey
    ) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

const AppErrorBoundary = ({ children }) => {
  const location = useLocation();

  return (
    <RouteErrorBoundary resetKey={location.pathname + location.search}>
      {children}
    </RouteErrorBoundary>
  );
};

export default AppErrorBoundary;
