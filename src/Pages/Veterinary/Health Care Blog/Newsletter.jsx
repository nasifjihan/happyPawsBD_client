import React from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const Newsletter = () => {
  return (
    <Box textAlign="center">
      <Stack spacing={1} alignItems="center" sx={{ mb: 3 }}>
        <Typography
          variant="overline"
          color="success.main"
          sx={{ fontWeight: 700, letterSpacing: 1 }}
        >
          Stay Updated
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 800, color: "primary.headline", mb: 0 }}
        >
          Subscribe to Our Pet Health Newsletter
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", maxWidth: 680 }}
        >
          Stay updated with practical pet health tips, expert advice, and useful
          care updates from the Happy Paws BD content team.
        </Typography>
      </Stack>
      <form
        noValidate
        autoComplete="off"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <TextField
          label="Your Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
          }}
        />
        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{
            marginTop: 2,
            paddingX: 5,
            paddingY: 1.5,
            fontWeight: 700,
          }}
        >
          Subscribe
        </Button>
      </form>
    </Box>
  );
};

export default Newsletter;
