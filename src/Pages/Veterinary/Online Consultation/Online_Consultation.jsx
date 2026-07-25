import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const supportPoints = [
  {
    title: "Fast First Guidance",
    description:
      "Online consultation can help you decide whether your pet needs home care, a clinic visit, or urgent attention.",
  },
  {
    title: "Good for Follow-Ups",
    description:
      "Remote conversations are useful when you need to review progress, routine concerns, or ongoing care questions.",
  },
  {
    title: "Prepared Conversations",
    description:
      "Photos, symptom timelines, and behavior notes can make an online consultation much more useful.",
  },
];

const Online_Consultation = () => {
  return (
    <Box sx={{ backgroundColor: "#f9f9f9", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
          <Stack spacing={2} textAlign="center" alignItems="center" mb={4}>
            <Typography variant="h3" fontWeight={800}>
              Online Consultation
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
              Get practical veterinary guidance when you need quick direction,
              follow-up advice, or help deciding the right next step for your pet.
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            {supportPoints.map((item) => (
              <Grid item xs={12} md={4} key={item.title}>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: "100%" }}>
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

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mt: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h5" fontWeight={700}>
                Before You Reach Out
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Keep your pet’s age, symptoms, recent changes, medications, and
                photos or short videos ready. That context helps the consultation
                become more specific and actionable.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button component={RouterLink} to="/vet_finder" variant="contained" color="success">
                  Find a Vet
                </Button>
                <Button component={RouterLink} to="/contact_us" variant="outlined" color="success">
                  Contact Support
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Paper>
      </Container>
    </Box>
  );
};

export default Online_Consultation;
