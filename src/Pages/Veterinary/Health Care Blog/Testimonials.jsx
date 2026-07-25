import React from "react";
import { Grid, Paper, Stack, Typography } from "@mui/material";

const testimonials = [
  {
    name: "Sarah",
    content:
      "Thanks to the advice I found here, my dog’s energy has improved, and he’s healthier than ever!",
  },
  {
    name: "Mark",
    content:
      "I had no idea about dental care for pets until I read the blog. Now, my cat’s teeth are in great shape!",
  },
];

const Testimonials = () => {
  return (
    <Stack spacing={3}>
      <Stack spacing={1} textAlign="center" alignItems="center">
        <Typography
          variant="overline"
          color="success.main"
          sx={{ fontWeight: 700, letterSpacing: 1 }}
        >
          Reader Feedback
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
          What Our Readers Say
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
          A few examples of how clear, practical pet health guidance can make day
          to day care feel more manageable for families.
        </Typography>
      </Stack>
      <Grid container spacing={3}>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper
              variant="outlined"
              sx={{
                padding: "1.5rem",
                borderRadius: 3,
                backgroundColor: "#ffffff",
                boxShadow: "none",
                height: "100%",
                "&:hover": {
                  boxShadow: "0px 12px 24px rgba(82,82,82,0.12)",
                },
              }}
            >
              <Typography
                variant="body1"
                paragraph
                sx={{ fontStyle: "italic", color: "text.primary", lineHeight: 1.7 }}
              >
                "{testimonial.content}"
              </Typography>
              <Typography
                variant="subtitle1"
                align="right"
                sx={{ fontWeight: 700, color: "success.main" }}
              >
                - {testimonial.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Testimonials;
