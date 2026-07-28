import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const houseCallBenefits = [
  {
    title: "Lower Stress for Pets",
    description:
      "House calls can be helpful for anxious pets who struggle with travel, noisy waiting rooms, or unfamiliar places.",
  },
  {
    title: "Support for Limited Mobility",
    description:
      "Older pets and post-surgery recovery cases may benefit from checkups at home when traveling is difficult.",
  },
  {
    title: "Convenient Follow-Ups",
    description:
      "When your pet already has a treatment plan, a home visit can be a practical way to monitor progress and adjust care.",
  },
];

const preparationChecklist = [
  "Keep your pet in a calm, safe room before the visit",
  "Bring previous prescriptions and vaccination records if available",
  "Write down symptoms, timing, appetite changes, and behavior notes",
  "Prepare a clean surface, good lighting, and a quiet space",
];

const House_Calls = () => {
  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
          <Stack spacing={2} textAlign="center" alignItems="center" mb={4}>
            <Typography variant="h3" fontWeight={800}>
              House Calls
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 760 }}
            >
              When traveling is hard for your pet, a home visit can provide
              practical guidance and basic care support. For emergencies or
              severe symptoms, an in-person clinic visit is usually the safest
              choice.
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            {houseCallBenefits.map((item) => (
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

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mt: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h5" fontWeight={700}>
                How to prepare
              </Typography>
              <Grid container spacing={1.5}>
                {preparationChecklist.map((item) => (
                  <Grid item xs={12} sm={6} key={item}>
                    <Typography variant="body2" color="text.secondary">
                      {item}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  component={RouterLink}
                  to="/contact_us"
                  variant="contained"
                  color="success"
                >
                  Request a House Call
                </Button>
                <Button
                  component={RouterLink}
                  to="/vet_finder"
                  variant="outlined"
                  color="success"
                >
                  Find a Clinic
                </Button>
                <Button
                  component={RouterLink}
                  to="/in_person_consultation"
                  variant="outlined"
                  color="success"
                >
                  In-Person Consultation
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Paper>
      </Container>
    </Box>
  );
};

export default House_Calls;
