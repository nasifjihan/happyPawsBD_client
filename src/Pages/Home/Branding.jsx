import styled from "@emotion/styled";
import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import Banner from "./../../images/banner2.png";
import React from "react";

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

const Branding = () => {
  return (
    <Box className="myContainer">
      <BrandingWrapper>
        <Stack
          spacing={6}
          sx={{ p: { xs: 2, sm: 4 } }}
          flex={1.2}
          alignItems={{ xs: "center", md: "flex-start" }}
          textAlign={{ xs: "center", md: "left" }}
        >
          <Typography
            variant="h3"
            color="primary.headline"
            sx={{ lineHeight: 1.2, fontWeight: "900" }}
          >
            100% Committed to Your Pet's Health
          </Typography>

          <Typography
            variant="body1"
            color="primary.para"
            sx={{ lineHeight: 1.5 }}
          >
            With vet-backed petcare products, guidance, and Rewards – <br />
            we’re here to support your pet’s health in every way we can
          </Typography>

          <ButtonGroup
            variant="contained"
            color="success"
            size="large"
            aria-label="large button group"
            // sx={{ width: "80%" }}
            sx={{ width: { xs: "100%", sm: "80%" } }}
          >
            <Button
              href="/adoption/adoptable_pets"
              sx={{ flex: "1", fontWeight: "700" }}
            >
              Adopt
            </Button>
            <Button href="/petcare" sx={{ flex: "1", fontWeight: "700" }}>
              Service
            </Button>
            <Button href="/vet_finder" sx={{ flex: "1", fontWeight: "700" }}>
              Vet Finder
            </Button>
          </ButtonGroup>
        </Stack>

        <Box
          flex={1}
          sx={{
            width: { xs: "100%", sm: "auto" },
            mt: { xs: 2, sm: 0 },
            textAlign: { xs: "center", sm: "right" },
          }}
        >
          <img src={Banner} alt="" style={{ width: "100%" }} />
        </Box>
      </BrandingWrapper>
    </Box>
  );
};

export default Branding;
