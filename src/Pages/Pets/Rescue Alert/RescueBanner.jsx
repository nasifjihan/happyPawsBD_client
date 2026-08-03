import styled from "@emotion/styled";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import RescueAlertBanner from "./../../../images/RescueAlertBanner.png";

const BrandingWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(122, 178, 89, 0.15)",
  padding: theme.spacing(4),
  margin: "1rem 0",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  gap: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    alignItems: "center",
  },
}));

const RescueBanner = () => {
  return (
    <Box className="myContainer">
      <BrandingWrapper>
        <Stack
          spacing={3}
          sx={{
            p: { xs: 2, md: 4 },
            textAlign: { xs: "center", md: "left" },
            alignItems: { xs: "center", md: "flex-start" },
          }}
          flex={1.1}
        >
          <Typography
            variant="h3"
            color="primary.headline"
            sx={{ lineHeight: 1.2, fontWeight: 900 }}
          >
            Be Their Voice When Every Minute Matters
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 620 }}>
            If you see an injured, abandoned, or distressed animal, let Happy Paws
            BD know as quickly as possible. Timely reports can help us guide rescue
            action, connect local support, and increase the chance of a safe recovery.
          </Typography>

          <Typography
            variant="subtitle1"
            color="primary.para"
            sx={{ fontWeight: 700 }}
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
          flex={1}
          sx={{
            display: { xs: "none", md: "block" },
            textAlign: "right",
          }}
        >
          <img
            src={RescueAlertBanner}
            alt="Rescue support illustration"
            style={{ width: "100%", maxWidth: "460px" }}
          />
        </Box>
      </BrandingWrapper>
    </Box>
  );
};

export default RescueBanner;
