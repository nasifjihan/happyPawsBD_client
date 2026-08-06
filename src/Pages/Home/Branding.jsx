import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Banner from "./../../images/optimized/banner2.webp";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import OptimizedImage from "../../Components/Common/OptimizedImage";
import { getSiteSettings } from "../../API/api";
import { sanitizeImageUrl } from "../../lib/media";

const Branding = () => {
  const { data: siteSettings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSiteSettings,
    staleTime: 300_000,
  });

  const heroBadge = siteSettings?.homeHeroBadge || "Trusted Pet Care Platform";
  const heroTitle =
    siteSettings?.homeHeroTitle ||
    "Better care, adoption support, and trusted guidance for every pet family";
  const heroSubtitle =
    siteSettings?.homeHeroSubtitle ||
    "Happy Paws BD brings together pet care services, adoption pathways, rescue support, and veterinary discovery so families can find the right next step without jumping between disconnected resources.";
  const heroImageUrl = sanitizeImageUrl(siteSettings?.homeHeroImageUrl);
  const heroImageAlt = siteSettings?.homeHeroImageAlt || "Happy Paws BD hero banner";

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
        <Stack
          spacing={4}
          sx={{
            p: { xs: 2, sm: 4 },
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            flex: 1.2,
          }}
        >
          <Chip
            label={heroBadge}
            color="success"
            variant="outlined"
            sx={{ fontWeight: 700 }}
          />

          <Typography
            variant="h4"
            color="primary.headline"
            sx={{ lineHeight: 1.2, fontWeight: "900" }}
          >
            {heroTitle}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.5, maxWidth: 620 }}
          >
            {heroSubtitle}
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
          sx={{
            flex: 1,
            width: { xs: "100%", sm: "auto" },
            mt: { xs: 2, sm: 0 },
            textAlign: { xs: "center", sm: "right" },
          }}
        >
          <Box sx={{ width: "100%" }}>
            <OptimizedImage
              src={heroImageUrl || Banner}
              alt={heroImageAlt}
              loading="eager"
              fetchPriority="high"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Branding;
