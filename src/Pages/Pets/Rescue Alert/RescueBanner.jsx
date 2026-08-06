import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import RescueAlertBanner from "./../../../images/RescueAlertBanner.png";

const RescueBanner = () => {
  return (
    <Box className="myContainer">
      <Box
        sx={{
          backgroundColor: "rgba(122, 178, 89, 0.15)",
          padding: 4,
          margin: "1rem 0",
          display: "flex",
          justifyContent: "space-between",
          gap: 3,
          flexDirection: { xs: "column", md: "row" },
          alignItems: { md: "center" },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            p: { xs: 2, md: 4 },
            textAlign: { xs: "center", md: "left" },
            alignItems: { xs: "center", md: "flex-start" },
            flex: 1.1,
          }}
        >
          <Typography
            variant="h3"
            color="primary.headline"
            sx={{ lineHeight: 1.2, fontWeight: 900 }}
          >
            Be Their Voice When Every Minute Matters
          </Typography>

          <Typography variant="body1" sx={{ maxWidth: 620, color: "text.secondary" }}>
            If you see an injured, abandoned, or distressed animal, let Happy Paws
            BD know as quickly as possible. Timely reports can help us guide rescue
            action, connect local support, and increase the chance of a safe recovery.
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, color: "primary.para" }}
          >
            Work with us. Report concerns early. Help rescue efforts move faster.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              component={RouterLink}
              to="/contact_us"
              variant="contained"
              color="success"
              size="large"
            >
              Contact Rescue Support
            </Button>
            <Button
              component="a"
              href="tel:+8801983794542"
              variant="outlined"
              color="success"
              size="large"
            >
              Call Emergency Line
            </Button>
          </Stack>
        </Stack>

        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "block" },
            textAlign: "right",
          }}
        >
          <Box
            component="img"
            src={RescueAlertBanner}
            alt="Rescue support illustration"
            sx={{ width: "100%", maxWidth: "460px" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default RescueBanner;
