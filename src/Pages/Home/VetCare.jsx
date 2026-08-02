import styled from "@emotion/styled";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import VetCareImage from "./../../images/optimized/vet-care.webp";
import React from "react";
import { Link as RouterLink } from "react-router";
import OptimizedImage from "../../Components/Common/OptimizedImage";

const BrandingWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(122, 178, 89, 0.15)",
  padding: theme.spacing(4),
  display: "flex",
  justifyContent: "space-between",
  borderRadius: ".6rem",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

const VetCare = () => {
  return (
    <Box className="myContainer" my={6}>
      <BrandingWrapper>
        <Stack
          spacing={3}
          sx={{ p: 4 }}
          flex={1.4}
          alignItems={{ xs: "center", md: "flex-start" }}
          textAlign={{ xs: "center", md: "left" }}
        >
          <Chip
            label="Daily Pet Care Support"
            color="success"
            variant="outlined"
            sx={{ fontWeight: 700 }}
          />

          <Typography
            variant="h4"
            color="primary.headline"
            sx={{ lineHeight: 1.2, fontWeight: "900" }}
          >
            Practical pet care help when routines, health, and comfort matter most
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.5, maxWidth: 580 }}
          >
            Explore grooming, boarding, and pet support services designed to make
            day-to-day care easier. Whether your pet needs routine maintenance or
            extra attention, we help you move from browsing to booking with clarity.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            justifyContent={{ xs: "center", md: "flex-start" }}
          >
            <Typography variant="body2" color="text.secondary">
              Grooming
            </Typography>
            <Typography variant="body2" color="success.main">
              |
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Boarding
            </Typography>
            <Typography variant="body2" color="success.main">
              |
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Trusted care guidance
            </Typography>
          </Stack>

          <Button
            variant="contained"
            color="success"
            size="large"
            component={RouterLink}
            to="/petcare"
            sx={{ width: { xs: "100%", sm: "auto" }, px: 4, fontWeight: 700 }}
          >
            Explore Pet Care
          </Button>
        </Stack>

        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <OptimizedImage
            src={VetCareImage}
            alt="Pet care illustration"
            style={{ width: "80%" }}
          />
        </Box>
      </BrandingWrapper>
    </Box>
  );
};

export default VetCare;
