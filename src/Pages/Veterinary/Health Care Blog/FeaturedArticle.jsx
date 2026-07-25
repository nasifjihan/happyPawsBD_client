import React from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

const FeaturedArticle = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        p: { xs: 3, md: 4 },
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <img
            src="https://smb.ibsrv.net/imageresizer/image/article_manager/1200x1200/24863/1124967/heroimage0.951364001709243835.jpg"
            alt="The Ultimate Guide to Pet Vaccinations"
            style={{
              width: "100%",
              borderRadius: "16px",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography
              variant="overline"
              color="success.main"
              sx={{ fontWeight: 700, letterSpacing: 1 }}
            >
              Featured Article
            </Typography>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 800,
                color: "primary.headline",
                mb: 0,
              }}
            >
              The Ultimate Guide to Pet Vaccinations: What You Need to Know
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", lineHeight: 1.7 }}
            >
              Vaccinations are one of the most important ways to protect your pet
              from life-threatening diseases. Learn more about the essential
              vaccines your pets need, why they matter, and when to schedule them.
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="success"
                size="large"
                href="https://www.glastonburyanimalhospital.com/blog/1124967-decoding-pet-vaccinations-a-pet-owners-essential-guide"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ px: 4, fontWeight: 700 }}
              >
                View Article
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturedArticle;
