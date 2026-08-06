import { Box, CircularProgress, Typography } from "@mui/material";

const RouteLoader = ({ message = "Loading page..." }) => {
  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CircularProgress color="success" />
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {message}
      </Typography>
    </Box>
  );
};

export default RouteLoader;
