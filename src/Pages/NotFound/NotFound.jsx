import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
        }}
      >
        <Stack spacing={2.5} sx={{ textAlign: "center", maxWidth: 560 }}>
          <Typography variant="overline" sx={{ color: "success.main" }}>
            404
          </Typography>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
            Page not found
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            The page you are looking for does not exist or may have moved.
            Let&apos;s get you back to a working route.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ justifyContent: "center" }}
          >
            <Button component={RouterLink} to="/" variant="contained" color="success">
              Go Home
            </Button>
            <Button
              component={RouterLink}
              to="/adoption"
              variant="outlined"
              color="success"
            >
              Browse Adoption
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default NotFound;
