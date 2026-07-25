import styled from "@emotion/styled";
import { Box, Button, Stack, Typography } from "@mui/material";
import AdoptHeader from "./../../../images/optimized/adopt-header.webp";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import OptimizedImage from "../../../Components/Common/OptimizedImage";

const BrandingWrapper = styled(Box)(({ theme }) => ({
  // height: "60vh",
  backgroundColor: "rgba(122, 178, 89, 0.15)",
  padding: theme.spacing(4),
  margin: "1rem 0",
  // clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
  },
}));

const AdoptionBanner = () => {
  return (
    <Box className="myContainer">
      {/* <img src={AdoptHeader} alt="" /> */}
      <BrandingWrapper>
        <Stack spacing={6} sx={{ p: 4 }} flex={1.5}>
          <Typography
            variant="h4"
            color="primary.headline"
            sx={{ lineHeight: 1.5, fontWeight: "900" }}
          >
            When you’re ready to show love, they’re ready to give it.
          </Typography>

          <Box>
            <Typography
              variant="h6"
              pb={2}
              color="primary.para"
              sx={{ fontWeight: "700" }}
            >
              Looking for a Pet? Start your search here!
            </Typography>

            <Button
              variant="contained"
              color="success"
              size="large"
              component={RouterLink}
              to="/adoption/adoptable_pets"
              sx={{ width: { sm: "80%", md: "60%", lg: "40%" } }}
            >
              Explore Adoptable Pets
            </Button>
          </Box>
        </Stack>

        <Box
          flex={1}
          sx={{
            display: { xs: "none", md: "block" }, // Hide the image on small screens
          }}
        >
          <OptimizedImage
            src={AdoptHeader}
            alt="Adoption banner"
            style={{ width: "100%" }}
          />
        </Box>
      </BrandingWrapper>
    </Box>
  );
};

export default AdoptionBanner;
