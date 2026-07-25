import styled from "@emotion/styled";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import Banner from "./../../images/optimized/banner2.webp";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import OptimizedImage from "../../Components/Common/OptimizedImage";

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
          spacing={4}
          sx={{ p: { xs: 2, sm: 4 } }}
          flex={1.2}
          alignItems={{ xs: "center", md: "flex-start" }}
          textAlign={{ xs: "center", md: "left" }}
        >
          <Chip
            label="Trusted Pet Care Platform"
            color="success"
            variant="outlined"
            sx={{ fontWeight: 700 }}
          />

          <Typography
            variant="h4"
            color="primary.headline"
            sx={{ lineHeight: 1.2, fontWeight: "900" }}
          >
            Better care, adoption support, and trusted guidance for every pet family
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.5, maxWidth: 620 }}
          >
            Happy Paws BD brings together pet care services, adoption pathways,
            rescue support, and veterinary discovery so families can find the right
            next step without jumping between disconnected resources.
          </Typography>

          

          <ButtonGroup
            variant="contained"
            color="success"
            size="large"
            aria-label="large button group"
            sx={{ width: { xs: "100%", sm: "80%" } }}
          >
            <Button
              component={RouterLink}
              to="/adoption/adoptable_pets"
              sx={{ flex: "1", fontWeight: "700" }}
            >
              Adopt
            </Button>
            <Button
              component={RouterLink}
              to="/petcare"
              sx={{ flex: "1", fontWeight: "700" }}
            >
                  Pet Care
            </Button>
            <Button
              component={RouterLink}
              to="/vet_finder"
              sx={{ flex: "1", fontWeight: "700" }}
            >
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
          <OptimizedImage
            src={Banner}
            alt="Happy Paws BD hero banner"
            loading="eager"
            fetchPriority="high"
            style={{ width: "100%" }}
          />
        </Box>
      </BrandingWrapper>
    </Box>
  );
};

export default Branding;
