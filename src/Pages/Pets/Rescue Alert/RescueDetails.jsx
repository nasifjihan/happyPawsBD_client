import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

const rescueSteps = [
  {
    title: "Report Quickly",
    description:
      "Share what happened, where the animal is located, and any visible injuries or urgent risks.",
  },
  {
    title: "Stay Safe",
    description:
      "Keep yourself safe first. If possible, remain nearby from a safe distance until help or guidance arrives.",
  },
  {
    title: "Help Us Coordinate",
    description:
      "Photos, landmarks, and short notes about the animal's condition can make rescue follow-up much faster.",
  },
];

const supportCards = [
  {
    title: "Emergency Contact",
    description:
      "For immediate assistance with an animal in urgent distress, call our emergency line right away.",
    actionLabel: "Call +880 1983794542",
    href: "tel:+8801983794542",
  },
  {
    title: "Coordinate with Our Team",
    description:
      "Need help explaining the situation or sending details? Reach our support team through the contact page.",
    actionLabel: "Contact Us",
    to: "/contact_us",
  },
  {
    title: "Check Lost & Found",
    description:
      "If the animal may be someone's missing pet, reviewing current lost and found listings can help reconnect families.",
    actionLabel: "View Lost & Found",
    to: "/lost_found",
  },
];

const RescueDetails = () => {
  return (
    <Box className="myContainer" sx={{ my: 5 }}>
      <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
        <Stack spacing={2} textAlign="center" alignItems="center" mb={4}>
          <Typography variant="h4" color="primary.headline" fontWeight={900}>
            Make a Difference for Animals in Need
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
            Happy Paws BD believes rescue works best when communities act early,
            share accurate information, and stay connected. Your report can help
            start the right response sooner.
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          {rescueSteps.map((item) => (
            <Grid item xs={12} md={4} key={item.title}>
              <Paper
                variant="outlined"
                sx={{ p: 3, borderRadius: 3, height: "100%" }}
              >
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {supportCards.map((item) => (
            <Grid item xs={12} md={4} key={item.title}>
              <Paper
                variant="outlined"
                sx={{ p: 3, borderRadius: 3, height: "100%" }}
              >
                <Stack spacing={2} height="100%">
                  <Typography variant="h6" fontWeight={700}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                    {item.description}
                  </Typography>
                  <Button
                    component={item.to ? RouterLink : "a"}
                    to={item.to}
                    href={item.href}
                    variant="contained"
                    color="success"
                  >
                    {item.actionLabel}
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Stack spacing={1.5} alignItems="center" textAlign="center" sx={{ mt: 4 }}>
          <Typography variant="h5" color="primary.headline" fontWeight={800}>
            Together, We Can Respond Faster
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
            Thank you for being part of a more compassionate rescue network. The
            earlier a report reaches the right people, the better the chances of
            safety, treatment, and reunification.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default RescueDetails;
