import React from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

const tips = [
  {
    title: "Emergency Care for Pets",
    description: "What to do in case of an emergency,  choking to poisoning.",
  },
  {
    title: "Dental Health for Pets",
    description:
      "5 signs of dental problems and how to maintain  pet’s hygiene.",
  },
  {
    title: "Health Exercise Tips",
    description: "How much exercise does your pet need daily?",
  },
  {
    title: "Seasonal Health Care",
    description: "How to protect your pet from seasonal allergies and bugs.",
  },
];

const HealthTips = () => {
  return (
    <Box sx={{ py: 1 }}>
      <Stack
        spacing={1}
        sx={{ mb: 4, textAlign: "center", alignItems: "center" }}
      >
        <Typography
          variant="overline"
          color="success.main"
          sx={{ fontWeight: 700, letterSpacing: 1 }}
        >
          Quick Reference
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: 800,
            color: "primary.headline",
            marginBottom: 0,
          }}
        >
          Health Tips & Quick Guides
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
          Browse a few practical care topics that can help you respond faster to
          common health questions and everyday pet needs.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {tips.map((tip, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              variant="outlined"
              sx={{
                padding: 3,
                textAlign: "left",
                backgroundColor: "#ffffff",
                borderRadius: 3,
                boxShadow: "none",
                height: "100%",
                "&:hover": {
                  boxShadow: "0px 12px 24px rgba(82,82,82,0.12)",
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "primary.headline",
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                {tip.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.7 }}
              >
                {tip.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HealthTips;
