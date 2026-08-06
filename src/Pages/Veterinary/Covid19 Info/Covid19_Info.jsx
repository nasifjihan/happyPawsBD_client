import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const keyPoints = [
  {
    title: "Focus on hygiene",
    description:
      "Wash hands before and after handling pets, food bowls, leashes, litter, and medication. Keep shared surfaces clean.",
  },
  {
    title: "Plan for care routines",
    description:
      "Keep a small supply of food, medications, and vaccination records. Ask a trusted friend or family member to be a backup caregiver if needed.",
  },
  {
    title: "Contact a vet when unsure",
    description:
      "If your pet has concerning symptoms, get guidance from a veterinary professional. Online support can help you decide the next step.",
  },
];

const safetyTips = [
  "Keep your pet’s vaccinations and parasite prevention up to date",
  "Avoid crowded areas if you are sick and ask someone else to walk your pet",
  "Use a mask and limit close face-to-face contact with your pet if you are unwell",
  "Do not use human medication for pets unless a veterinarian instructs you",
];

const Covid19_Info = () => {
  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
          <Stack
            spacing={2}
            sx={{ mb: 4, textAlign: "center", alignItems: "center" }}
          >
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              COVID-19 & Pet Care
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 760 }}
            >
              This page shares general safety reminders for pet families. For
              medical decisions, always follow advice from a qualified
              veterinarian.
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            {keyPoints.map((item) => (
              <Grid key={item.title} size={{ xs: 12, md: 4 }}>
                <Paper
                  variant="outlined"
                  sx={{ p: 3, borderRadius: 3, height: "100%" }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mt: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Quick safety checklist
              </Typography>
              <Grid container spacing={1.5}>
                {safetyTips.map((item) => (
                  <Grid key={item} size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {item}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  component={RouterLink}
                  to="/online_consultation"
                  variant="contained"
                  color="success"
                >
                  Online Consultation
                </Button>
                <Button
                  component={RouterLink}
                  to="/in_person_consultation"
                  variant="outlined"
                  color="success"
                >
                  In-Person Consultation
                </Button>
                <Button
                  component={RouterLink}
                  to="/contact_us"
                  variant="outlined"
                  color="success"
                >
                  Contact Us
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Paper>
      </Container>
    </Box>
  );
};

export default Covid19_Info;
