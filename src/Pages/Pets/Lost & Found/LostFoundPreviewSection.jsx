import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import { Link } from "react-router-dom";
import ContentState from "../../../Components/Common/ContentState";
import fallbackPetImage from "../../../images/LostPet.png";
import { sanitizeImageUrl } from "../../../lib/media";

const listingMeta = {
  lost: {
    chipLabel: "Recently Lost",
    actionLabel: "View All Lost Pets",
    imageHeight: 210,
    fallbackName: "Lost pet listing",
    summary: (pet) => [
      { label: "Type", value: pet.animalType },
      { label: "Age", value: pet.age },
      { label: "Color", value: pet.colors },
      { label: "Last Seen", value: pet.lastSeenLocation },
      { label: "Date", value: pet.lostDate },
      { label: "Contact", value: pet.contactPhone },
    ],
    title: (pet) => pet.petName || "Lost pet listing",
    personLabel: (pet) => `Owner: ${pet.ownerName || "Not provided"}`,
  },
  found: {
    chipLabel: "Recently Found",
    actionLabel: "View All Found Pets",
    imageHeight: 210,
    fallbackName: "Found pet listing",
    summary: (pet) => [
      { label: "Type", value: pet.animalType },
      { label: "Breed", value: pet.breed },
      { label: "Color", value: pet.colors },
      { label: "Location", value: pet.foundLocation },
      { label: "Date", value: pet.foundDate },
      { label: "Contact", value: pet.contactPhone },
    ],
    title: (pet) => pet.breed || pet.petName || "Found pet listing",
    personLabel: (pet) => `Reporter: ${pet.founderName || "Not provided"}`,
  },
};

const LostFoundPreviewSection = ({
  variant,
  eyebrow,
  title,
  description,
  listings = [],
  actionTo,
}) => {
  const meta = listingMeta[variant];
  const previewListings = listings.slice(0, 2);

  return (
    <Box
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: 5,
        border: "1px solid",
        borderColor: "rgba(122, 178, 89, 0.14)",
        backgroundColor: "#fff",
        boxShadow: "0 18px 38px rgba(15, 23, 42, 0.06)",
        height: "100%",
      }}
    >
      <Stack spacing={1.25} sx={{ mb: 3 }}>
        <Chip
          icon={<PetsOutlinedIcon />}
          label={eyebrow || meta.chipLabel}
          variant="outlined"
          sx={{
            alignSelf: "flex-start",
            borderRadius: 2,
            color: "#4d7337",
            borderColor: "rgba(122, 178, 89, 0.28)",
            backgroundColor: "rgba(122, 178, 89, 0.08)",
          }}
        />
        <Typography variant="h4" fontWeight={800} color="#333332">
          {title}
        </Typography>
        <Typography color="text.secondary">{description}</Typography>
      </Stack>

      {previewListings.length ? (
        <Grid container spacing={2}>
          {previewListings.map((pet) => (
            <Grid key={pet._id} size={{ xs: 12 }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "rgba(122, 178, 89, 0.14)",
                  boxShadow: "none",
                  backgroundColor: "rgba(122, 178, 89, 0.04)",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={sanitizeImageUrl(pet.petPicture) || fallbackPetImage}
                  alt={meta.title(pet)}
                  sx={{
                    width: { xs: "100%", sm: 200 },
                    height: { xs: meta.imageHeight, sm: "auto" },
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />

                <CardContent sx={{ flex: 1, p: 2.25 }}>
                  <Stack spacing={1.25}>
                    <Box>
                      <Typography variant="h6" fontWeight={800} color="#333332">
                        {meta.title(pet)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {meta.personLabel(pet)}
                      </Typography>
                    </Box>

                    <Divider />

                    <Grid container spacing={1}>
                      {meta.summary(pet).map((item) => (
                        <Grid
                          key={`${pet._id}-${item.label}`}
                          size={{ xs: 12, sm: 6 }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            <Box component="span" sx={{ fontWeight: 700, color: "#333332" }}>
                              {item.label}:
                            </Box>{" "}
                            {item.value || "Not provided"}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <ContentState
          title={`No ${variant} pet listings right now`}
          description={`There are no ${variant} pet updates to show at the moment. You can still submit a report below.`}
          severity="info"
        />
      )}

      <Button
        component={Link}
        to={actionTo}
        variant="contained"
        color="success"
        fullWidth
        endIcon={<ArrowOutwardOutlinedIcon />}
        sx={{
          mt: 3,
          minHeight: 48,
          borderRadius: 3,
          fontWeight: 700,
          textTransform: "none",
        }}
      >
        {meta.actionLabel}
      </Button>
    </Box>
  );
};

export default LostFoundPreviewSection;
