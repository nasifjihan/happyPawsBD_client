import { Box, Button, Stack, Typography } from "@mui/material";
import AdoptHeader from "./../../../images/optimized/adopt-header.webp";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import OptimizedImage from "../../../Components/Common/OptimizedImage";

const AdoptionBanner = () => {
  return (
    <Box className="myContainer">
      <Box
        sx={{
          backgroundColor: "rgba(122, 178, 89, 0.15)",
          padding: 4,
          margin: "1rem 0",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          clipPath: { md: "polygon(0 0, 100% 0, 100% 85%, 0 100%)" },
        }}
      >
        <Stack spacing={6} sx={{ p: 4, flex: 1.5 }}>
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
              color="primary.para"
              sx={{ pb: 2, fontWeight: "700" }}
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
          sx={{
            flex: 1,
            display: { xs: "none", md: "block" },
          }}
        >
          <Box sx={{ width: "100%" }}>
            <OptimizedImage
              src={AdoptHeader}
              alt="Adoption banner"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdoptionBanner;
